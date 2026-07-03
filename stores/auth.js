import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: null,
    loading: true,
    authInitialized: false
  }),

  actions: {
    // 인증 상태 초기화
    async init() {
      const { $auth, $db } = useNuxtApp()
      
      return new Promise((resolve) => {
        onAuthStateChanged($auth, async (user) => {
          if (user) {
            try {
              const userDoc = await getDoc(doc($db, 'users', user.uid))
              if (userDoc.exists()) {
                const userData = userDoc.data()
                this.setUser(user, userData.name, userData.role)
              } else {
                console.log('신규 회원가입 처리 중입니다.')
                this.setUser(null)
              }
            } catch (error) {
              console.error('사용자 정보 로드 실패:', error)
              this.setUser(null)
            }
          } else {
            this.setUser(null)
          }
          resolve()
        })
      })
    },

    // 사용자 정보 설정
    setUser(user, name = null, role = null) {
      if (user) {
        this.user = {
          uid: user.uid,
          email: user.email,
          displayName: name || user.displayName,
          role: role || 'user'
        }
        this.authenticated = true
      } else {
        this.user = null
        this.authenticated = false
      }
      this.loading = false
      this.authInitialized = true
    },

    // 로그인 처리
    async handleLogin(email, password) {
      const { $auth, $db } = useNuxtApp()
      try {
        const userCredential = await signInWithEmailAndPassword($auth, email, password)
        const userDoc = await getDoc(doc($db, 'users', userCredential.user.uid))
        
        if (!userDoc.exists()) {
          throw new Error('사용자 정보를 찾을 수 없습니다.')
        }
        
        const userData = userDoc.data()
        this.setUser(userCredential.user, userData.name, userData.role)
        return userCredential.user
      } catch (error) {
        console.error('로그인 실패:', error)
        throw error
      }
    },

    // 회원가입 처리
    async handleSignup(email, password, name) {
      const { $auth, $db } = useNuxtApp()
      try {
        // 1. Firebase Authentication으로 사용자 생성
        const userCredential = await createUserWithEmailAndPassword($auth, email, password)
        const user = userCredential.user
        
        // 2. Firebase Authentication 프로필 업데이트
        await updateProfile(user, { displayName: name })
        
        // 3. Firestore에 사용자 정보 저장
        const userData = {
          uid: user.uid,
          email: email,
          name: name,
          role: 'user',
          createdAt: new Date().toISOString()
        }
        
        await setDoc(doc($db, 'users', user.uid), userData)
        
        // 4. 회원가입 완료 후 로그아웃 처리
        await signOut($auth)
        this.setUser(null)
        
        return user
      } catch (error) {
        // 에러 발생 시 생성된 계정 삭제 시도
        try {
          if ($auth.currentUser) {
            await $auth.currentUser.delete()
          }
        } catch (deleteError) {
          console.error('사용자 계정 삭제 실패:', deleteError)
        }
        
        console.error('회원가입 실패:', error)
        throw error
      }
    },

    // 로그아웃 처리
    async logout() {
      const { $auth } = useNuxtApp()
      try {
        await signOut($auth)
        this.setUser(null)
      } catch (error) {
        console.error('로그아웃 실패:', error)
        throw error
      }
    },

    // 비밀번호 재설정
    async resetPassword(email) {
      const { $auth } = useNuxtApp()
      try {
        await sendPasswordResetEmail($auth, email)
      } catch (error) {
        console.error('비밀번호 재설정 이메일 발송 실패:', error)
        throw error
      }
    },

    // 아이디 찾기
    async findUserId(name) {
      const { $db } = useNuxtApp()
      try {
        const usersRef = collection($db, 'users')
        const q = query(usersRef, where('name', '==', name))
        const querySnapshot = await getDocs(q)
        
        if (querySnapshot.empty) {
          throw new Error('일치하는 사용자 정보를 찾을 수 없습니다.')
        }

        const userDoc = querySnapshot.docs[0]
        const userData = userDoc.data()
        return userData.email
      } catch (error) {
        console.error('아이디 찾기 실패:', error)
        throw error
      }
    },

    // 이메일 중복 체크
    async checkEmailExists(email) {
      const { $db } = useNuxtApp()
      try {
        // Firestore에서 이메일 중복 체크
        const usersRef = collection($db, 'users')
        const q = query(usersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)
        
        return !querySnapshot.empty
      } catch (error) {
        console.error('이메일 중복 체크 실패:', error)
        throw error
      }
    }
  },
  
  getters: {
    isAuthenticated: (state) => state.authenticated,
    currentUser: (state) => state.user,
    currentUserRole: (state) => state.user?.role,
    isLoading: (state) => state.loading
  }
})