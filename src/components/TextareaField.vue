<template>
  <div :class="shortcuts.gridCol" class="gap-1">
    <label :class="shortcuts.subtitleBold">
      {{ label.includes("*") ? label.split("*")[0] : label }}
      <span v-if="label.includes('*')" :class="shortcuts.errorMessage">*</span>
    </label>
    <textarea
      v-model="modelValue"
      :id="id"
      :rows="rows"
      :class="computedClass"
      @input="updateValue"
      :placeholder="placeholder"
    ></textarea>
    <p v-if="errorMessage" class="mt-1" :class="shortcuts.errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import cn from "classnames";
  import { shortcuts } from "../untils";

  interface TextAreaType {
    id: string;
    label: string;
    placeholder: string;
    rows?: number;
    errorMessage?: string;
    modelValue: string;
  }

  export default defineComponent({
    name: "textarea-field",
    props: {
      id: {
        type: String as PropType<TextAreaType["id"]>,
        required: true,
      },
      label: {
        type: String as PropType<TextAreaType["label"]>,
        required: true,
      },
      placeholder: {
        type: String as PropType<TextAreaType["placeholder"]>,
        required: true,
      },
      rows: {
        type: Number as PropType<TextAreaType["rows"]>,
        required: false,
        default: 4,
      },
      errorMessage: {
        type: String as PropType<TextAreaType["errorMessage"]>,
        required: false,
        default: "",
      },
      modelValue: {
        type: String as PropType<TextAreaType["modelValue"]>,
        required: true,
      },
    },
    data() {
      return {
        shortcuts,
      };
    },
    computed: {
      computedClass() {
        return cn(
          shortcuts.borderRounded,
          "block w-full appearance-none p-2",
          {
            "placeholder-gray-500": !this.errorMessage,
            "placeholder-red-300": this.errorMessage,
          },
          shortcuts.subtitle
        );
      },
    },
    emits: ["update:modelValue"],
    methods: {
      updateValue(event: Event) {
        const value = (event.target as HTMLTextAreaElement).value;
        this.$emit("update:modelValue", value);
      },
    },
  });
</script>
