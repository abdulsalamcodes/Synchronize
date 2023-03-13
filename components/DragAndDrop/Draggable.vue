<template>
  <div draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
    {{ label }}
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleDragStart(event) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.label);
      this.$emit("dragStart");
    },
    handleDragEnd() {
      this.$emit("dragEnd");
    },
  },
};
</script>
