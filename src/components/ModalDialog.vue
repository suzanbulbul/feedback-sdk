<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75"
    :class="theme.bg"
  >
    <div
      :class="[
        'relative max-w-full p-4 bg-white w-[500px]',
        shortcuts.borderRounded,
      ]"
    >
      <div class="flex items-center justify-between">
        <h3 :class="[theme.color, shortcuts.title]">
          {{ title }}
        </h3>
        <button :class="[shortcuts.subtitleBold, 'p-0']" @click="handleClose">
          ✕
        </button>
      </div>
      <div class="py-4">
        <slot></slot>
      </div>
      <div class="flex space-x-2">
        <button
          @click="handleClose"
          :class="[
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.secondary,
            'w-full',
          ]"
        >
          {{ closeTitle }}
        </button>
        <button
          v-if="!hiddenSaveButton"
          @click="handleSave"
          :class="[
            theme.btnColor,
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.primary,
            'w-full',
          ]"
        >
          {{ saveTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { shortcuts, VARIANT } from "../untils";

  interface ModalDialogType {
    title: string;
    show: boolean;
    closeTitle?: string;
    saveTitle?: string;
    hiddenSaveButton?: boolean;
  }

  export default defineComponent({
    name: "modal-dialog",
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
        default: "Close",
      },
      saveTitle: {
        type: String as PropType<ModalDialogType["saveTitle"]>,
        required: false,
        default: "Save",
      },
      hiddenSaveButton: {
        type: Boolean as PropType<ModalDialogType["hiddenSaveButton"]>,
        default: false,
      },
    },
    data() {
      return {
        shortcuts,
        theme: VARIANT[window.feedbackConfig?.theme || "TEAL"],
      };
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
