<template>
  <div class="text-left grid grid-cols gap-1">
    <label class="text-sm font-medium text-gray-700">
      {{ label.includes("*") ? label.split("*")[0] : label }}
      <span v-if="label.includes('*')" class="text-red-400">*</span>
    </label>
    <textarea
      v-model="modelValue"
      :id="id"
      :rows="rows"
      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      :class="computedClass"
      @input="updateValue"
      :placeholder="placeholder"
    ></textarea>
    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import cn from "classnames";

  interface TextAreaProps {
    id: string;
    label: string;
    placeholder: string;
    rows?: number;
    errorMessage?: string;
    modelValue: string;
  }

  export default defineComponent({
    name: "TextareaField",
    props: {
      id: {
        type: String as PropType<TextAreaProps["id"]>,
        required: true,
      },
      label: {
        type: String as PropType<TextAreaProps["label"]>,
        required: true,
      },
      placeholder: {
        type: String as PropType<TextAreaProps["placeholder"]>,
        required: true,
      },
      rows: {
        type: Number as PropType<TextAreaProps["rows"]>,
        required: false,
        default: 4,
      },
      errorMessage: {
        type: String as PropType<TextAreaProps["errorMessage"]>,
        required: false,
        default: "",
      },
      modelValue: {
        type: String as PropType<TextAreaProps["modelValue"]>,
        required: true,
      },
    },
    computed: {
      computedClass() {
        return cn(
          "rounded-md border block w-full flex-1 appearance-none p-2 text-sm outline-none focus:ring-0",
          {
            "placeholder-gray-500": !this.errorMessage,
            "placeholder-red-300": this.errorMessage,
          }
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
