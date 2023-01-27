<script setup lang="ts"></script>

<template>
  <main>
    <div class="boxWrapper">
      <div class="box">To-Do App</div>
      <div class="box">Habit Tracking App</div>
    </div>
  </main>
</template>

<style scoped>
.boxWrapper {
  @apply flex gap-2 w-full;
}
.box {
  @apply rounded-md bg-slate-800 p-2
   shadow text-yellow-50 h-24 w-full max-w-sm flex-1;
}
</style>
