<template>
  <div class="text-left grid grid-gol gap-1">
    <label class="text-sm font-medium text-gray-700">
      {{ label.includes("*") ? label.split("*")[0] : label }}
      <span v-if="label.includes('*')" class="text-red-400">*</span>
    </label>
    <input
      v-model="modelValue"
      :type="type"
      :id="id"
      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      :class="computedClass"
      :placeholder="placeholder"
      @input="updateValue"
    />
    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import cn from "classnames";

  interface InputProps {
    id: string;
    label: string;
    placeholder: string;
    errorMessage?: string;
    modelValue: string;
    type?: "text" | "email";
  }

  export default defineComponent({
    name: "InputField",
    props: {
      id: {
        type: String as PropType<InputProps["id"]>,
        required: true,
      },
      label: {
        type: String as PropType<InputProps["label"]>,
        required: true,
      },
      placeholder: {
        type: String as PropType<InputProps["placeholder"]>,
        required: true,
      },
      errorMessage: {
        type: String as PropType<InputProps["errorMessage"]>,
        required: false,
        default: "",
      },
      modelValue: {
        type: String as PropType<InputProps["modelValue"]>,
        required: true,
      },
      type: {
        type: String as PropType<InputProps["type"]>,
        required: false,
        default: "text",
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
        const value = (event.target as HTMLInputElement).value;
        this.$emit("update:modelValue", value);
      },
    },
  });
</script>
