<template>
  <bubble-menu
    class="relative bg-white rounded-lg shadow-xl"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{
        'bg-gray-500 text-white': editor.isActive('bold'),
      }"
      class="py-1 px-1 rounded-l-lg focus:outline-none"
    >
      <Icon name="fe:bold" />
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{
        'bg-gray-500 text-white': editor.isActive('italic'),
      }"
      class="py-1 px-1 focus:outline-none"
    >
      <Icon name="fe:italic" />
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{
        'bg-gray-500 text-white': editor.isActive('strike'),
      }"
      class="py-1 px-1 rounded-r-lg focus:outline-none"
    >
      <Icon name="ri:strikethrough" />
    </button>

    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{
        'bg-gray-500 text-white': editor.isActive('heading', { level: 1 }),
      }"
      class="py-1 px-1 rounded-r-lg focus:outline-none"
    >
      <Icon name="ci:heading-h1" />
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{
        'bg-gray-500 text-white': editor.isActive('heading', { level: 2 }),
      }"
      class="py-1 px-1 rounded-r-lg focus:outline-none"
    >
      <Icon name="ci:heading-h2" />
    </button>

    <button
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{
        'bg-gray-500 text-white': editor.isActive('heading', { level: 3 }),
      }"
      class="py-1 px-1 rounded-r-lg focus:outline-none"
    >
      <Icon name="ci:heading-h3" />
    </button>
  </bubble-menu>
</template>

<script setup lang="ts">
import { BubbleMenu } from "@tiptap/vue-3";

const props = defineProps({
  editor: {
    type: Object,
    default: () => {},
  },
});
</script>

<style></style>
