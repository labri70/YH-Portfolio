<template>
  <div class="default-layout">
    <div class="border-b border-gray-200 header">
      <Header />
    </div>
    <main class="container mx-auto py-10">
      <slot />
    </main>
    <div class="fixed bottom-0 w-full footer bg-gray-50">
      <Footer />
    </div>

    <!-- 사이드바 -->
    <div
      class="fixed top-0 left-0 z-50 w-64 h-full transition-transform duration-300 ease-in-out transform bg-white shadow-lg lg:hidden"
      :class="{ '-translate-x-full': !isOpen }"
    >
      <div class="p-6 sidebar">
        <div class="text-right close-button lg:hidden">
          <button class="flex-none mobile-button" @click="closeSidebar" aria-label="메뉴 닫기">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h1 class="mb-6 text-xl font-bold">GSEED</h1>
        <nav class="flex flex-col gap-4 lnb">
          <ul>
            <li><NuxtLink to="/" @click="closeSidebar">Home</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- 오버레이 -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-0"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup>
const isOpen = useSidebar()

const closeSidebar = () => {
  isOpen.value = false
}
</script>
