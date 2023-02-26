<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";

interface Task {
  title: string;
  description: string;
  assignee: string;
  status: string;
}

interface Column {
  title: string;
  id: string;
}

const tasks = reactive<Task[]>([
  {
    title: "Task 1",
    description: "This is the description for Task 1",
    assignee: "John Doe",
    status: "to-do",
  },
]);


const columns = ref<Column[]>([
  {
    title: "To Do",
    id: "to-do",
  },
  {
    title: "In Progress",
    id: "in-progress",
  },
  {
    title: "Done",
    id: "done",
  },
]);


const progressColumnEl = ref(null);
const doneColumnEl = ref(null);

function initializeRefs() {
  progressColumnEl.value = document.getElementById("column-in-progress");
  doneColumnEl.value = document.getElementById("column-done");
}

onMounted(initializeRefs);

function updateTaskStatus(event, taskIndex) {
  const progressSectionPos = progressColumnEl.value.getBoundingClientRect();
  const doneSectionPos = doneColumnEl.value.getBoundingClientRect();

  if (event.screenX >= doneSectionPos.left) {
    tasks[taskIndex].status = "done";
  } else if (event.screenX >= progressSectionPos.left) {
    tasks[taskIndex].status = "in-progress";
  } else {
    tasks[taskIndex].status = "to-do";
  }
}

function onDragging(event, taskIndex) {
  updateTaskStatus(event, taskIndex);
}
</script>


<template>
  <main class="flex flex-col min-h-screen bg-gray-100 p-7">
    <div class="max-w-5xl w-full m-auto min-h-screen">
      <BackButton />
      <section class="bg-gray-700 rounded-lg shadow-xl p-6">
        <header class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold text-gray-50">Task Manager</h1>
          <button
            class="bg-gray-100 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            @click="onAddTask()"
          >
            Add Task
          </button>
        </header>
        <section class="flex overflow-x-auto">
          <div
            class="w-80 bg-gray-200 rounded-lg shadow p-4 mr-4"
            v-for="(column, index) in columns"
            :id="`column-${column.id}`"
            :key="index"
          >
            <h2 class="text-lg font-bold text-gray-800 mb-4" :aria-label="`${column.title} column`">
              {{ column.title }}
            </h2>
            <div
              class="mb-4"
              v-for="(task, taskIndex) in tasks.filter(
                (t) => t.status === column.id
              )"
              :key="taskIndex"
            >
              <div
                class="bg-white rounded-lg shadow p-4 cursor-move"
                draggable="true"
                @dragend="(e) => onDragging(e, taskIndex)"
                :aria-label="`${task.title} task, ${column.title} column`"
              >
                <h3 class="text-md font-bold text-gray-800 mb-2">{{ task.title }}</h3>
                <p class="text-gray-600">{{ task.description }}</p>
                <div class="flex items-center justify-between mt-4">
                  <span class="text-sm text-gray-500">{{ task.assignee }}</span>
                  <div class="flex items-center">
                    <button
                      class="bg-gray-700 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                      @click="onEditTask(task)"
                      :aria-label="`Edit ${task.title} task`"
                    >
                      Edit
                    </button>
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      @click="onDeleteTask(column, task)"
                      :aria-label="`Delete ${task.title} task`"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>
