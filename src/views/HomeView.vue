<script setup lang="ts"></script>

<template>
  <main>
    <div class="boxWrapper">
      <RouterLink to="habit-tracker" class="box">Habit Tracking App</RouterLink>
      <router-link to="/to-do" class="box">To-Do App</router-link>
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
