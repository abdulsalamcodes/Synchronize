<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-8">Create a New Task</h1>
    <form class="w-full max-w-lg" @submit.prevent="handleSubmit">
      <div class="flex flex-wrap mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="title">
          Title
        </label>
        <input
          v-model="newTask.title"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter the task title"
          required
        />
      </div>
      <div class="flex flex-wrap mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="description">
          Description
        </label>
        <textarea
          v-model="newTask.description"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Enter a description of the task"
          required
        ></textarea>
      </div>
      <div class="flex flex-wrap mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="assignee">
          Assignee
        </label>
        <input
          v-model="newTask.assignee"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="assignee"
          type="text"
          placeholder="Enter the task assignee"
          required
        />
      </div>
      <div class="flex flex-wrap mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="status">
          Status
        </label>
        <select
          v-model="newTask.status"
          class="block appearance-none w-full border border-gray-700 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          required
        >
          <option value="" disabled selected>Select a status</option>
          <option value="to-do">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Task
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { uuid } from "vue-uuid";

const props = defineProps({
  onAddTask: {
    type: Object,
    default: () => {},
  },
});
const client = useSupabaseClient();
const insertTask = async (newTask) => {
  const { data, error } = await client.from("Task").insert([newTask]);
  console.log("Task ", data, error);
};

const newTask = {
  id: uuid.v4(),
  title: "",
  description: "",
  assignee: "",
  status: "",
};

async function handleSubmit() {
  await insertTask(newTask);
  props.onAddTask();
  console.log(newTask);
}
</script>
