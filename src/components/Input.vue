<template>
  <div class="text-left grid grid-gol gap-1">
    <label class="text-sm font-medium text-gray-700">
      {{ label.includes("*") ? label.split("*")[0] : label }}
      <span v-if="label.includes('*')" class="text-red-400">*</span>
    </label>
    <input
      :type="type"
      autoComplete="off"
      name="description"
      :placeholder="placeholder"
      :class="
        cn(
          'border block w-full flex-1 appearance-none p-2 text-sm outline-none focus:ring-0',
          {
            'placeholder-gray-500': !hasError,
            'placeholder-red-300': hasError,
          }
        )
      "
      v-bind="restProps"
    />
    <p v-if="hasError" class="mt-1 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import cn from "classnames";

  export default defineComponent({
    name: "Input",
    props: {
      label: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        required: true,
      },
      hasError: {
        type: Boolean,
        required: false,
      },
      errorMessage: {
        type: String,
        required: false,
      },
      type: {
        type: String as () => "text" | "email",
        required: false,
        default: "text",
      },
    },
    setup(props) {
      const { label, placeholder, hasError, errorMessage, type, ...restProps } =
        props;

      return {
        cn,
        restProps,
      };
    },
  });
</script>
