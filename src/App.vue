<template>
  <main class="mainWrapper">
    <header>
      <div class="wrapper">
        <nav class="flex mb-4 gap-5 justify-between">
          <RouterLink to="/" class="btn btn-green"
            >Synchronize</RouterLink
          >
          <RouterLink to="/about" class="btn btn-green">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
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
.btn-green {
  @apply text-slate-500 hover:text-slate-700;
}
</style>
