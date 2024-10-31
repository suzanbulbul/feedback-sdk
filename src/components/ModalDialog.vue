<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
  >
    <div
      class="relative max-w-full p-4 bg-white rounded-lg shadow-lg w-[500px]"
    >
      <div class="flex items-center justify-between pb-3 border-b">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="handleClose" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div class="py-4">
        <slot></slot>
      </div>
      <div class="flex space-x-2">
        <button
          @click="handleClose"
          class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ closeTitle }}
        </button>
        <button
          @click="handleSave"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ saveTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";

  interface ModalDialogType {
    title: string;
    show: boolean;
    closeTitle?: string;
    saveTitle?: string;
  }

  export default defineComponent({
    name: "ModalDialog",
    props: {
      title: {
        type: String as PropType<ModalDialogType["title"]>,
        required: true,
      },
      show: {
        type: Boolean as PropType<ModalDialogType["show"]>,
        default: false,
      },
      closeTitle: {
        type: String as PropType<ModalDialogType["closeTitle"]>,
        required: false,
        default: "Kapat",
      },
      saveTitle: {
        type: String as PropType<ModalDialogType["saveTitle"]>,
        required: false,
        default: "Kaydet",
      },
    },
    emits: ["close", "save"],
    methods: {
      handleClose() {
        this.$emit("close");
      },
      handleSave() {
        this.$emit("save");
      },
    },
  });
</script>
