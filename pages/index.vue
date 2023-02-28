<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

</script>

<template>

  <main class="mainWrapper">
    <header>
      <div class="wrapper">
        <nav class="flex mb-4 gap-5 justify-between">
          <NuxtLink to="/" class="btn text-lg text-grat-800 hover:text-gray-700"
            >Synchronize</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="btn text-lg text-gray-800 hover:text-gray-700"
            >About
          </NuxtLink>
        </nav>
      </div>
    </header>
    <HomeView />
  </main>
</template>

<style>
body {
  font-family: "Raleway", sans-serif;
}
.mainWrapper {
  @apply max-w-screen-lg mx-auto my-5;
}
.btn {
  @apply font-semibold rounded-lg;
}
</style>
