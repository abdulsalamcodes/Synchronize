<script setup lang="ts">
// IMPORTS
import BackButton from "../components/BackButton.vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { uuid } from "vue-uuid";

// @ts-ignore
import BubbleHeader from "../components/BubbleHeader.vue";

type Note = {
  id: string;
  title: string;
  content: string;
};

// STATES
const currentNote = ref<Note | null>(null);
const notes = ref<Note[] | null>(null);
const selectedNoteIndex = ref<number | null>(null);
const loading = ref<boolean>(false);
const showForm = ref<boolean>(false);

const title = ref("");
const content = ref("");

// SETUPS
const client = useSupabaseClient();
const contentEditor = useEditor({
  content: currentNote.value?.content || "",
  extensions: [StarterKit],
  onUpdate: () => {
    if (currentNote.value?.content) {
      currentNote.value.content = contentEditor.value
        ? contentEditor.value.getHTML()
        : "";
      console.log(currentNote.value);
      setTimeout(() => {
        updateNote(currentNote.value as Note);
      }, 100);
    }
  },
});

const titleEditor = useEditor({
  content: currentNote.value?.title || "",
  extensions: [StarterKit],
  onUpdate: () => {
    if (currentNote.value && currentNote.value?.title) {
      currentNote.value.title = titleEditor.value
        ? titleEditor.value.getHTML()
        : "";
      setTimeout(() => {
        updateNote(currentNote.value as Note);
      }, 100);
    }
  },
});
async function initializeRefs() {
  fetchNotes();
}
onMounted(initializeRefs);

watch(
  () => currentNote.value as Note,
  (value: Note) => {
    const isContentSame = contentEditor.value?.getHTML() === value.content;
    const isTitleSame = titleEditor.value?.getHTML() === value.title;
    if (!isContentSame) {
      contentEditor.value?.commands.setContent(value.content, false);
    }
    if (!isTitleSame) {
      titleEditor.value?.commands.setContent(value.title, false);
    }
  }
);

// METHODS

function extractContent(input: string) {
  var span = document.createElement("span");
  span.innerHTML = input;
  return span.textContent || span.innerText;
}

function selectNote(index: number) {
  selectedNoteIndex.value = index;
  if (notes.value) {
    currentNote.value = notes.value[index];
  }
}

async function fetchNotes() {
  const { data, error } = await client.from("Note").select("*");
  console.log(data);
  notes.value = data as Note[];
}

async function addNewNote(newTask: never) {
  await client.from("Note").insert([newTask]);
  fetchNotes();
}

function submitForm() {
  if (title && content) {
    const newNote: Note = {
      id: uuid.v4(),
      title: title.value,
      content: content.value,
    };

    // @ts-ignore
    addNewNote(newNote);
    showForm.value = false;
    title.value = "";
    content.value = "";
  }
}

async function updateNote(note: Note) {
  await client
    .from("Note")
    // @ts-ignore
    .update({
      title: note.title,
      content: note.content,
    })
    .eq("id", note.id);
}
</script>

<template>
  <main class="mainWrapper">
    <BackButton />
    <section class="flex flex-row min-h-screen bg-gray-100 rounded-md">
      <aside class="w-1/4 border-r border-gray-300 bg-gray-800">
        <header class="px-4 py-2 font-bold text-lg text-gray-50">Notes</header>

        <!-- NOTE LIST SIDEBAR -->

        <div class="overflow-y-auto" v-if="notes">
          <!-- NOTE CARD  -->
          <article
            v-for="(note, index) in notes"
            :key="note.id"
            class="note px-4 py-2 m-3 bg-gray-50 rounded-md hover:bg-gray-600 hover:text-gray-800 shadow-lg cursor-pointer"
            :class="{
              'bg-gray-600 active': index === selectedNoteIndex,
            }"
            @click="selectNote(index)"
          >
            <div
              class="truncate text-gray-800 title"
              :class="{ 'text-gray-100': index === selectedNoteIndex }"
            >
              {{ extractContent(note.title) }}
            </div>
            <div class="text-xs truncate text-gray-400 content">
              {{ extractContent(note.content) }}
            </div>
          </article>
          <!-- NOTE CARD END -->

          <form
            v-show="showForm"
            class="note p-2 m-3 bg-gray-50 rounded-md shadow-lg cursor-pointer"
            @submit.prevent="submitForm"
          >
            <div class="mb-2">
              <label for="title">
                <input
                  id="title"
                  type="text"
                  class="w-full p-2 border-0 rounded bg-gray-100 focus:outline-none focus:bg-gray-100"
                  v-model="title"
                  @keyup.enter="submitForm"
                  placeholder="Enter title here"
                />
              </label>
            </div>
            <div>
              <label for="content">
                <input
                  id="content"
                  type="text"
                  @keyup.enter="submitForm"
                  class="w-full p-2 border-0 rounded bg-gray-100 focus:outline-none focus:bg-gray-100"
                  v-model="content"
                  placeholder="Enter content here"
                />
              </label>
            </div>
          </form>

          <!-- ADD NOTE BUTTON  -->
          <div class="flex align-center justify-center">
            <button
              @click="showForm = !showForm"
              class="px-4 py-2 bg-white text-gray-800 flex rounded-md items-center justify-center gap-2 text-center"
            >
              <Icon :name="`${showForm ? 'iconoir:cancel' : 'fe:plus'}`" />

              {{ showForm ? "Cancel" : "Add Note" }}
            </button>
          </div>
        </div>
        <div v-else>
          <loader />
        </div>
      </aside>

      <!-- EDITOR AREA -->
      <main class="flex-1 px-4 p-6">
        <div v-if="currentNote" class="flex flex-col h-full">
          <client-only placeholder="Loading...">
            <bubble-header :editor="titleEditor" />
            <editor-content
              :editor="titleEditor"
              v-model="currentNote.title"
              aria-placeholder="Enter Note title here"
            />
            <hr class="my-6 border-gray-300 border-opacity-50 h-2" />
            <bubble-header :editor="contentEditor" />
            <editor-content
              :editor="contentEditor"
              v-model="currentNote.content"
              aria-placeholder="Enter Note content here"
            />
          </client-only>
        </div>

        <div v-else class="flex items-center justify-center h-full">
          <div class="text-gray-500">Select a note to view</div>
        </div>
      </main>
    </section>
  </main>
</template>

<style>
.note-taking-app {
  font-family: "Inter", sans-serif;
}

.note:hover .title,
.note.active .title {
  @apply text-gray-100;
}

.ProseMirror > * + * {
  margin-top: 0.75em;
}

.ProseMirror {
  font-family: "Roboto", sans-serif;
  outline: none;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
  list-style-type: disc;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
}

h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.5rem;
}
h3 {
  font-size: 1rem;
}

.ProseMirror code {
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
}

.ProseMirror pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, 0.1);
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}
</style>
