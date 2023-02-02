<script setup lang="ts"></script>

<template>
  <main>
    <div class="boxWrapper">
      <RouterLink to="habit-tracker" class="box">Habit Tracking App</RouterLink>
      <router-link to="/to-do" class="box">To-Do App</router-link>
      <RouterLink to="habit-tracker" class="box">Note Taking App</RouterLink>
      <RouterLink to="habit-tracker" class="box"
        >Product Management App</RouterLink
      >
    </div>
  </main>
</template>

<style scoped>
.boxWrapper {
  @apply flex gap-2 w-full flex-wrap;
}
.box {
  @apply rounded-md bg-slate-800 p-4
   shadow text-yellow-50 h-24 w-full max-w-sm flex-1;
}
</style>
