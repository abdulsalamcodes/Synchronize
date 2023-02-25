<script setup lang="ts"></script>

<template>
  <main>
    <div class="boxWrapper">
      <NuxtLink to="/habit-tracker" class="box">
        <div class="iconWrapper">
          <Icon name="fe:activity" />
        </div>
        <p class="bold mb-4 text-lg font-medium">Habit Tracking App</p>
        <p class="text-sm">
          Transform your daily routine with our habit tracking app. Set your
          goals, track your progress, and stay motivated with personalized
          reminders and insights. Say goodbye to old habits and hello to a new,
          more productive you
        </p>
      </NuxtLink>
      <NuxtLink to="/to-do" class="box">
        <div class="iconWrapper">
          <Icon name="fe:list-bullet" />
        </div>
        <p class="bold mb-4 text-lg font-medium">To-Do App</p>
        <p class="text-sm">
          Stay organized and on top of your tasks with our to-do list app.
          Easily add, prioritize, and track your tasks, and enjoy peace of mind
          knowing nothing will slip through the cracks.
        </p>
      </NuxtLink>
      <NuxtLink to="/note-app" class="box">
        <div class="iconWrapper">
          <Icon name="fe:book" />
        </div>
        <p class="bold mb-4 text-lg font-medium">Note Taking App</p>
        <p class="text-sm">
          Capture your thoughts and ideas with ease using our note-taking app.
          Enjoy a clean, intuitive interface for taking notes, organizing them
          into notebooks, and finding what you need quickly and easily.
        </p>
      </NuxtLink>

      <NuxtLink to="/task-manager" class="box">
        <div class="iconWrapper">
          <Icon name="fe:shopping-bag" />
        </div>
        <p class="bold mb-4 text-lg font-medium">Task Management App</p>
        <p class="text-sm">
          Collaborate with your team and stay on track with our task management
          board app. Assign tasks, set deadlines, and track progress in
          real-time, all in one centralized location
        </p>
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.iconWrapper {
  @apply bg-white h-12 w-12 rounded-lg mb-5 text-gray-800 items-center justify-center flex;
}
.boxWrapper {
  @apply grid grid-cols-2 gap-10 mt-10;
}
.box {
  @apply rounded-md bg-gray-800 p-4
   shadow text-gray-50 h-56 hover:scale-105 transition-all;
}
</style>
