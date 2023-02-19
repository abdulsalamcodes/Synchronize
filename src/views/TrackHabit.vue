<script setup>
const habits = [
  {
    name: "Exercise daily",
    id: "1",
    daysCompleted: 3,
    repeat: true,
  },
  {
    name: "Meditate for 10 minutes",
    id: "2",
    daysCompleted: 5,
    repeat: true,
  },
  {
    name: "Read for 30 minutes",
    id: "3",
    daysCompleted: 2,
    repeat: true,
  },
  {
    name: "Drink 8 glasses of water",
    id: "4",
    daysCompleted: 6,
    repeat: true,
  },
  {
    name: "Go to bed before 10pm",
    id: "5",
    daysCompleted: 4,
    repeat: true,
  },
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<template>
  <section class="flex mt-10 gap-5 items-start h-screen">
    <main class="flex-1">
      <header class="header flex items-center gap-3">
        <RouterLink to="/" class="mt-2">
          <vue-feather type="arrow-left"></vue-feather>
        </RouterLink>
        <h1 class="text-3xl text-gray-700">Good Afternoon, {{ username }}</h1>
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
              <th class="px-4 py-6">Days of the Week</th>
              <td class="px-4 py-6" v-for="day in days" :key="day">
                {{ day }}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-t border-gray-700"
              v-for="habit in habits"
              :key="habit.id"
            >
              <th class="px-4 text-left py-5 text-md">{{ habit.name }}</th>
              <td class="px-4 py-5" v-for="day in days" :key="day">
                <input
                  type="checkbox"
                  class="form-checkbox h-7 w-7 accent-green-600"
                  id="mon-habit1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
    <aside class="w-1/3 h-3/4">
      <h2 class="text-2xl mb-5">Friday, 23</h2>
      <div class="bg-white border-gray-300 border-2 rounded-lg p-5 h-full">
        <ul>
          <li
            class="border-l-3 border-green-700 shadow-md rounded bg-gray-800 text-white p-4 mb-3"
            v-for="item in habits"
            :key="item"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </aside>
  </section>
</template>

<style>
.bedtime {
  @apply text-lg text-gray-500 mt-3;
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
