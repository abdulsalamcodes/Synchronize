<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
const client = useSupabaseClient();
interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
}

interface Column {
  title: string;
  id: string;
}

let tasks = ref<Task[]>([]);

const TODO_ID = "to-do";
const INPROGRESS_ID = "in-progress";
const DONE_ID = "done";

const columns = ref<Column[]>([
  {
    title: "To Do",
    id: TODO_ID,
  },
  {
    title: "In Progress",
    id: INPROGRESS_ID,
  },
  {
    title: "Done",
    id: DONE_ID,
  },
]);

const inProgressColumnEl = ref<HTMLElement | null>(null);
const doneColumnEl = ref<HTMLElement | null>(null);
const dragedOver = ref("");
const showModal = ref(false);

watch(tasks, (newValues) => {
  tasks.value = newValues;
});

const fetchTasks = async () => {
  const { data: fetchedTasks, error: taskFetchError } =
    await useSupabaseClient()?.from("Task").select("*");

  if (fetchedTasks) {
    tasks.value = fetchedTasks;
  }
};

async function initializeRefs() {
  fetchTasks();
  inProgressColumnEl.value = document.getElementById(INPROGRESS_ID);
  doneColumnEl.value = document.getElementById(DONE_ID);
}

onMounted(initializeRefs);

const getTargetThreshold = (id: string) => {
  const progressPosition = inProgressColumnEl.value?.getBoundingClientRect();
  const donePosition = doneColumnEl.value?.getBoundingClientRect();
  let el = document.getElementById(id);
  const elementMidWidth = (el?.clientWidth || 0) / 2;
  const progressThreshold = progressPosition?.left ?? 0;
  const doneThreshold = donePosition?.left ?? 0;

  return { done: doneThreshold, progress: progressThreshold };
};

async function updateTaskStatus(event: DragEvent, id: string) {
  const currentTask = tasks.value.find((task) => task.id === id);
  let newStatus: string = TODO_ID;

  if (event.clientX >= getTargetThreshold(id).done) {
    newStatus = DONE_ID;
  } else if (event.clientX >= getTargetThreshold(id).progress) {
    newStatus = INPROGRESS_ID;
  } else {
    newStatus = TODO_ID;
  }

  if (currentTask) {
    currentTask.status = newStatus;
    // @ts-ignore
    await client.from("Task").update({ status: newStatus }).eq("id", id);
  }
}

function onDrag(event: DragEvent, id: string) {
  if (event.clientX >= getTargetThreshold(id).done) {
    dragedOver.value = DONE_ID;
  } else if (event.clientX >= getTargetThreshold(id).progress) {
    dragedOver.value = INPROGRESS_ID;
  } else {
    dragedOver.value = TODO_ID;
  }
}

function onDragEnd(event: DragEvent, id: string) {
  updateTaskStatus(event, id);
  dragedOver.value = "";
}

async function deleteTask(id: string) {
  await client.from("Task").delete().eq("id", id);
  await fetchTasks();
}

const onAddTask = () => {
  fetchTasks();
  handleCloseModal();
};

const handleShowModal = () => {
  showModal.value = true;
};
const handleCloseModal = () => {
  showModal.value = false;
};
</script>

<template>
  <vue-modal :title="title" :visible="showModal" @close="handleCloseModal">
    <create-task-form :onAddTask="onAddTask" />
  </vue-modal>
  <main class="flex flex-col min-h-screen bg-gray-100 p-7">
    <div class="max-w-5xl w-full m-auto min-h-screen">
      <BackButton />
      <section class="bg-gray-700 rounded-lg shadow-xl contentWrapper p-6">
        <header class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold text-gray-50">Task Manager</h1>
          <button
            class="bg-gray-100 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            @click="handleShowModal('My Modal Title')"
          >
            Add Task
          </button>
        </header>
        <section class="flex overflow-x-auto overflow-y-hidden columnsWrapper">
          <div
            :class="`w-80 border-4 border-gray-200 bg-gray-200 h-full rounded-lg shadow p-4 pb-10 mr-4 ${
              dragedOver === column.id ? 'border-red-500' : 'bg-gray-200'
            }`"
            v-for="(column, index) in columns"
            :id="column.id"
            :key="index"
            @dragover="
              (ev) => {
                ev.preventDefault();
              }
            "
          >
            <h2
              class="text-lg font-bold text-gray-800 mb-4"
              :aria-label="`${column.title} column`"
            >
              {{ column.title }}
            </h2>
            <section class="overflow-auto relative h-full">
              <div
                class="mb-4"
                v-for="task in tasks.filter((t) => t.status === column.id)"
                :key="task.id"
              >
                <div
                  class="bg-white rounded-lg shadow p-4 cursor-move"
                  draggable="true"
                  :id="task.id"
                  @drag="(ev) => onDrag(ev, id)"
                  @dragend="(e) => onDragEnd(e, task.id)"
                  :aria-label="`${task.title} task, ${column.title} column`"
                >
                  <h3 class="text-md font-bold text-gray-800 mb-2">
                    {{ task.title }}
                  </h3>
                  <p class="text-gray-600">{{ task.description }}</p>
                  <div class="flex items-center justify-between mt-4">
                    <span class="text-sm text-gray-500">{{
                      task.assignee
                    }}</span>
                    <div class="flex items-center">
                      <button
                        class="bg-gray-700 hover:bg-gray-200 text-white hover:text-gray-700 font-medium py-1 px-2 rounded mr-2"
                        @click="onEditTask(task)"
                        :aria-label="`Edit ${task.title} task`"
                      >
                        Edit
                      </button>
                      <button
                        class="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                        @click="() => deleteTask(task.id)"
                        :aria-label="`Delete ${task.title} task`"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<style scoped>
.contentWrapper {
  height: 85vh;
}
.columnsWrapper {
  height: 90%;
}
</style>
