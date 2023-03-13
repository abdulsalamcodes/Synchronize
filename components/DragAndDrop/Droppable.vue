<template>
  <div @drop="handleDrop" @dragover.prevent>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleDrop(event) {
      event.preventDefault();
      const data = event.dataTransfer.getData("text/plain");
      this.$emit("dropped", data);
    },
  },
};
</script>
