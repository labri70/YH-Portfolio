<!-- error.vue -->
<template>
  <div class="error-page">
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 class="mb-4 text-4xl font-bold text-gray-900">{{ error?.statusCode }}</h1>
        <p class="mb-6 text-lg text-gray-700">{{ error?.message }}</p>

        <button
          @click="handleNavigation"
          class="mb-4 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const error = useError()

const handleNavigation = async () => {
  try {
    await clearError()
    await navigateTo('/', {
      replace: true,
      immediate: true
    })
  } catch (e) {
    console.error('Navigation error:', e)
  }
}

useHead({
  title: `Error ${error.value?.statusCode || '404'} | GSEED`,
  meta: [
    { name: 'description', content: error.value?.message || 'Error page' }
  ]
})
</script>
