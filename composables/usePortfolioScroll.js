export const VALID_SECTIONS = [
  'about',
  'expertise',
  'services',
  'projects',
  'process',
  'contact',
]

const SCROLL_DURATION = 1200
const HEADER_OFFSET = 64

export function usePortfolioScroll() {
  const route = useRoute()
  const router = useRouter()

  let scrollAnimationId = null
  let isProgrammaticNav = false

  const getSectionParam = () => {
    const { section } = route.params
    if (Array.isArray(section)) return section[0]
    return section || null
  }

  const pathToSection = (path) => {
    if (!path || path === '/') return null
    return path.replace(/^\//, '')
  }

  const cancelScrollAnimation = () => {
    if (scrollAnimationId !== null) {
      cancelAnimationFrame(scrollAnimationId)
      scrollAnimationId = null
    }
  }

  const smoothScrollTo = (targetY, duration = SCROLL_DURATION) => {
    cancelScrollAnimation()

    const startY = window.scrollY
    const distance = targetY - startY

    if (Math.abs(distance) < 2) return

    const startTime = performance.now()

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      window.scrollTo(0, startY + distance * easeInOutCubic(progress))

      if (progress < 1) {
        scrollAnimationId = requestAnimationFrame(step)
      } else {
        scrollAnimationId = null
      }
    }

    scrollAnimationId = requestAnimationFrame(step)
  }

  const scrollToSection = (section, { smooth = true } = {}) => {
    if (!import.meta.client) return

    nextTick(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!section) {
            if (smooth) smoothScrollTo(0)
            else window.scrollTo(0, 0)
            return
          }

          const el = document.getElementById(section)
          if (!el) return

          const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

          if (smooth) smoothScrollTo(top)
          else window.scrollTo(0, top)
        })
      })
    })
  }

  const navigateToSection = async (path) => {
    if (!import.meta.client) return

    const section = pathToSection(path)
    isProgrammaticNav = true

    try {
      if (route.path !== path) {
        await router.push(path)
      }

      scrollToSection(section, { smooth: true })
    } finally {
      window.setTimeout(() => {
        isProgrammaticNav = false
      }, SCROLL_DURATION + 100)
    }
  }

  onMounted(() => {
    scrollToSection(getSectionParam(), { smooth: false })
  })

  watch(
    () => route.path,
    (_newPath, oldPath) => {
      if (!import.meta.client || !oldPath || isProgrammaticNav) return
      scrollToSection(getSectionParam(), { smooth: true })
    },
  )

  onBeforeUnmount(() => {
    cancelScrollAnimation()
  })

  return { scrollToSection, navigateToSection }
}
