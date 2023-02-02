<template>
  <main class="to-do">
    Helo {{ user.name }} From To Do App of Age: {{ user.age }}
  </main>
</template>

<script setup>
const user = {
  name: "abdulsalam",
  age: 18,
};
</script>

<style>
.to-do {
  @apply text-center;
}
</style>
