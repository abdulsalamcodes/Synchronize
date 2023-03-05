<template>
  <div
    v-if="visible"
    class="fixed z-10 inset-0 overflow-y-auto"
    @keydown.esc="$emit('close')"
  >
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="$emit('close')"
      />
      <div
        class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full"
      >
        <!-- <div class="px-4 py-2 bg-gray-100 border-b border-gray-200">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
        </div> -->
        <div class="p-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
