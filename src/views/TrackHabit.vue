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
      <section>
        <table class="table-auto w-full text-gray-600 mt-5">
          <thead>
            <tr class="bg-gray-800 text-white">
              <th class="px-4 py-2">Days of the Week</th>
              <th class="px-4 py-2">Habit 1</th>
              <th class="px-4 py-2">Habit 2</th>
              <th class="px-4 py-2">Habit 3</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-gray-700">
              <td class="px-4 py-2">Monday</td>
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  class="form-checkbox h-6 w-6 text-indigo-600"
                  id="mon-habit1"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  class="form-checkbox h-6 w-6 text-indigo-600"
                  id="mon-habit2"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  class="form-checkbox h-6 w-6 text-indigo-600"
                  id="mon-habit3"
                />
              </td>
            </tr>
            <tr class="border-t border-gray-700">
              <td class="px-4 py-2">Tuesday</td>
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  class="form-checkbox h-6 w-6 text-indigo-600"
                  id="tue-habit1"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  class="form-checkbox h-6 w-6 text-indigo-600"
                  id="tue-habit2"
                />
              </td>
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  class="form-checkbox h-6 w-6 text-indigo-600"
                  id="tue-habit3"
                />
              </td>
            </tr>
            <!-- and so on -->
          </tbody>
        </table>
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
  @apply bg-gray-200 flex justify-between py-3 px-5 rounded-full flex-1;
}
.tabItem.active {
  @apply bg-white py-3 px-10 rounded-full;
}

.tabItem {
  @apply text-gray-600;
}
</style>
