<template>
  <section class="flex gap-5">
    <main class="flex-1">
      <header class="header">
        <h1 class="heading">Good Afternoon, {{ username }}</h1>
        <button class="bedtime">Add Your BedTime</button>
      </header>
      <section class="flex gap-5 items-center mt-8">
        <div class="headerTab">
          <button class="tabItem active">Week</button>
          <button class="tabItem">Month</button>
          <button class="tabItem">Year</button>
          <button class="tabItem">All Time</button>
        </div>
        <button class="rounded-full border-gray-900 border-2 px-10 py-4 h-max">
          Add Habit
        </button>
      </section>
    </main>
    <aside class="w-1/3">
      <h2 class="text-2xl mb-5">Friday, 23</h2>
      <div class="bg-gray-100 p-5">Hello From Aside</div>
    </aside>
  </section>
</template>

<script setup>
const username = "Abdulsalam";
</script>

<style>
.bedtime {
  @apply text-lg text-gray-500 mt-3;
}
.heading {
  @apply text-3xl text-gray-700;
}
.headerTab {
  @apply bg-gray-200 flex justify-around py-3 rounded-full flex-1;
}
.tabItem.active {
  @apply bg-white py-3 px-10 rounded-full;
}

.tabItem {
  @apply text-gray-600;
}
</style>
