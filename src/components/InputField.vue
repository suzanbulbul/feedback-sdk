<template>
  <div :class="shortcuts.gridCol" class="gap-1">
    <label :class="shortcuts.subtitleBold">
      {{ label.includes("*") ? label.split("*")[0] : label }}
      <span v-if="label.includes('*')" :class="shortcuts.errorMessage">*</span>
    </label>
    <input
      v-model="modelValue"
      :type="type"
      :id="id"
      :class="computedClass"
      :placeholder="placeholder"
      @input="updateValue"
    />
    <p v-if="errorMessage" class="mt-1" :class="shortcuts.errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import cn from "classnames";
  import { shortcuts } from "../untils";

  interface InputType {
    id: string;
    label: string;
    placeholder: string;
    errorMessage?: string;
    modelValue: string;
    type?: "text" | "email";
  }

  export default defineComponent({
    name: "input-field",
    props: {
      id: {
        type: String as PropType<InputType["id"]>,
        required: true,
      },
      label: {
        type: String as PropType<InputType["label"]>,
        required: true,
      },
      placeholder: {
        type: String as PropType<InputType["placeholder"]>,
        required: true,
      },
      errorMessage: {
        type: String as PropType<InputType["errorMessage"]>,
        required: false,
        default: "",
      },
      modelValue: {
        type: String as PropType<InputType["modelValue"]>,
        required: true,
      },
      type: {
        type: String as PropType<InputType["type"]>,
        required: false,
        default: "text",
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
        const value = (event.target as HTMLInputElement).value;
        this.$emit("update:modelValue", value);
      },
    },
  });
</script>
