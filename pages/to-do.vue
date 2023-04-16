<script setup lang="ts">
import { uuid } from "vue-uuid";

// types
interface TodoItem {
  id: string;
  title: string;
  createdAt: Date;
  status: string;
  repeat: boolean;
}
// state variables.
const client = useSupabaseClient();
const task = ref("");
const todoItems = ref<TodoItem[]>([]);
const todoLoading = ref(false);

// functions.
const fetchTodoItems = async () => {
  todoLoading.value = true;
  const { data: fetchedTodoItems, error: taskFetchError } = await client
    ?.from("Todo")
    .select("*");

  if (fetchedTodoItems) {
    todoItems.value = fetchedTodoItems;
    todoLoading.value = false;
  }
};

const addTodoItem = async () => {
  const newTodoItem = {
    id: uuid.v4(),
    title: task.value,
    createdAt: new Date(),
    status: "todo",
    repeat: false,
  };
  // @ts-ignore
  const { data, error } = await client?.from("Todo").insert(newTodoItem);
  if (!error) {
    todoItems.value.push(newTodoItem);
    fetchTodoItems();
  }
};

async function initializeRefs() {
  fetchTodoItems();
}
function addTask(e: any) {
  task.value = e?.target?.value;
}

function onEnter() {
  addTodoItem();
  task.value = "";
}

onMounted(initializeRefs);
</script>

<template>
  <div class="mt-10 mainWrapper">
    <BackButton />
    <main class="grid grid-cols-1 md:grid-cols-5 rounded-md min-h-screen">
      <section
        class="col-start-1 text-white col-end-2 md:col-start-1 md:col-end-2 bg-gray-800 rounded p-5 h-5/6"
      >
        <!-- Content for first column goes here -->
        <div class="sidebarItem">
          <vue-feather type="sunrise" />
          <p>My Day</p>
        </div>
        <div class="sidebarItem">
          <vue-feather type="aperture" />
          Repeated Daily
        </div>
        <div class="sidebarItem">
          <vue-feather type="aperture" />
          Every Monday
        </div>
      </section>
      <section
        class="col-start-2 col-end-6 md:col-start-2 md:col-end-6 p-7 bg-gray-50 h-5/6"
      >
        <div class="relative w-3/4 m-auto">
          <input
            v-model="search"
            class="px-4 py-2 w-full rounded-full text-gray-700 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
          />
          <div class="absolute top-0 right-0 mt-2 mr-4">
            <svg class="text-gray-600 h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path
                d="M20.8 19.3l-4.7-4.7c1-1.3 1.6-3 1.6-4.7 0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.7 0 3.4-0.5 4.7-1.6l4.7 4.7c0.2 0.2 0.5 0.3 0.8 0.3s0.6-0.1 0.8-0.3c0.4-0.4 0.4-1.2 0-1.6zM4 10c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z"
              ></path>
            </svg>
          </div>
        </div>

        <div class="mt-10">
          <div class="flex gap-3 mb-5 font-bold text-lg">
            <vue-feather type="list" class="mt-1" />
            <h2>My Day</h2>
            {{ task }}
          </div>
          <div
            class="w-full py-2 px-5 gap-5 items-center flex bg-white rounded-md"
          >
            <vue-feather type="plus" />
            <input
              class="py-2 w-full text-gray-700 focus:outline-none focus:shadow-outline"
              type="text"
              :value="task"
              @input="addTask"
              @keyup.enter="onEnter"
            />
          </div>
        </div>

        <div class="mt-10">
          <h3 class="text-lg mb-3">Tasks</h3>
          <div class="overflow-y-scroll h-full">
            <div
              class="w-full mb-5 p-5 gap-3 flex bg-white rounded-md"
              v-for="todo in todoItems"
              :key="todo.id"
            >
              <vue-feather type="circle" />
              <p>{{ todo.title }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
input[type="text"] {
  background-color: #ffffff;
}
.to-do {
  @apply text-center;
}
.sidebarItem {
  @apply py-5 flex items-center gap-4;
}
</style>
