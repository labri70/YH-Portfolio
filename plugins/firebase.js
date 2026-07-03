import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const PLACEHOLDER_KEYS = [
  'your_firebase_api_key',
  'your-project-id',
  '000000000000',
]

function isFirebaseConfigured(config) {
  const apiKey = config.public.firebaseApiKey
  const projectId = config.public.firebaseProjectId

  if (!apiKey || !projectId) return false

  return !PLACEHOLDER_KEYS.some((placeholder) =>
    String(apiKey).includes(placeholder) || String(projectId).includes(placeholder),
  )
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!isFirebaseConfigured(config)) {
    return {
      provide: {
        auth: null,
        db: null,
        storage: null,
      },
    }
  }

  try {
    const firebaseConfig = {
      apiKey: config.public.firebaseApiKey,
      authDomain: config.public.firebaseAuthDomain,
      projectId: config.public.firebaseProjectId,
      storageBucket: config.public.firebaseStorageBucket,
      messagingSenderId: config.public.firebaseMessagingSenderId,
      appId: config.public.firebaseAppId,
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app)

    return {
      provide: {
        auth,
        db,
        storage,
      },
    }
  } catch (error) {
    console.warn('[Firebase] Initialization skipped:', error?.message)

    return {
      provide: {
        auth: null,
        db: null,
        storage: null,
      },
    }
  }
})
