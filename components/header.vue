<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <div class="flex-shrink-0">
        <NuxtLink to="/" class="font-bold text-xl">GSEED</NuxtLink>
      </div>

      <button
        class="flex-none lg:hidden"
        @click="toggleSidebar"
        aria-label="메뉴 열기"
      >
        <i class="fa fa-bars"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const isOpen = useSidebar()

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>
