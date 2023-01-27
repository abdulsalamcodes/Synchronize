<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <main class="mainWrapper">
    <header>
      <div class="wrapper">
        <nav class="flex mb-4 gap-5">
          <RouterLink to="/" class="btn btn-green">Home</RouterLink>
          <RouterLink to="/about" class="btn btn-green">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </main>
</template>

<style>
.mainWrapper {
  @apply max-w-screen-lg mx-auto my-5;
}
.btn {
  @apply py-2 px-4 font-semibold rounded-lg shadow-md;
}
.btn-green {
  @apply text-slate-500 hover:text-slate-700;
}
</style>
