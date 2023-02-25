<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
const columns = [
  {
    title: "To Do",
    tasks: [
      {
        title: "Task 1",
        description: "This is the description for Task 1",
        assignee: "John Doe",
      },
      {
        title: "Task 2",
        description: "This is the description for Task 2",
        assignee: "Jane Smith",
      },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      {
        title: "Task 3",
        description: "This is the description for Task 3",
        assignee: "Bob Johnson",
      },
    ],
  },
  {
    title: "Done",
    tasks: [
      {
        title: "Task 4",
        description: "This is the description for Task 4",
        assignee: "Alice Williams",
      },
    ],
  },
];

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
</script>

<template>
  <!-- <div ref="el" :style="style" style="position: fixed">
    Drag me! I am at {{x}}, {{y}} -->
  

    <div class="flex justify-center items-center min-h-screen bg-gray-100" >
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-5xl w-full">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Task Manager</h1>
        <button
        ref="el" :style="style" style="position: fixed"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          @click="onAddTask()"
        >
          Add Task
        </button>
      </div>
      <div class="flex overflow-x-auto">
        <div
          class="w-80 bg-gray-200 rounded-lg shadow p-4 mr-4"
          v-for="(column, index) in columns"
          :key="index"
        >
          <h2 class="text-lg font-bold text-gray-800 mb-4">
            {{ column.title }}
          </h2>
          <!-- <draggable
            v-model="column.tasks"
            v-bind="dragOptions"
            :move="onMove"
            group="tasks"
            @start="isDragging.value= true"
            @end="isDragging.value = false"
          > -->
            <!-- <transition-group> -->
              <div
                
                class="mb-4"
                v-for="(task, taskIndex) in column.tasks"
                :key="taskIndex"
              >
                <div class="bg-white rounded-lg shadow p-4">
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
                        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                        @click="onEditTask(task)"
                      >
                        Edit
                      </button>
                      <button
                        class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                        @click="onDeleteTask(column, task)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                <!-- </div> -->
              </div>
              </div>
            <!-- </transition-group> -->
          <!-- </draggable> -->
        </div>
      </div>
    </div>
  </div>
</template>
