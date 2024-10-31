<template>
  <form class="grid grid-col gap-4" @submit.prevent="submit">
    <legend class="text-2xl font-bold mb-6">Register Form</legend>

    <div class="text-left grid grid-gol gap-1">
      <label for="name" class="text-sm font-medium text-gray-700"> Name </label>
      <input
        v-model="name.value.value"
        type="name"
        id="name"
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        :class="
          cn(
            'rounded-md border block w-full flex-1 appearance-none p-2 text-sm outline-none focus:ring-0',
            {
              'placeholder-gray-500': !name.errorMessage.value,
              'placeholder-red-300': name.errorMessage.value,
            }
          )
        "
        placeholder="Enter Name"
      />
      <p v-if="name.errorMessage.value" class="mt-1 text-sm text-red-600">
        {{ name.errorMessage.value }}
      </p>
    </div>

    <div class="text-left grid grid-gol gap-1">
      <label for="email" class="text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        v-model="email.value.value"
        type="email"
        id="email"
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        :class="
          cn(
            'rounded-md border block w-full flex-1 appearance-none p-2 text-sm outline-none focus:ring-0',
            {
              'placeholder-gray-500': !email.errorMessage.value,
              'placeholder-red-300': email.errorMessage.value,
            }
          )
        "
        placeholder="you@example.com"
      />
      <p v-if="email.errorMessage.value" class="mt-1 text-sm text-red-600">
        {{ email.errorMessage.value }}
      </p>
    </div>

    <TextArea
      id="feedback"
      label="Feedback*"
      v-model="feedback.value.value"
      placeholder="Enter Feedback"
      :errorMessage="feedback.errorMessage.value"
    />

    <div class="flex space-x-2">
      <button
        type="button"
        @click="handleReset"
        class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Clear
      </button>
      <button
        type="submit"
        class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useField, useForm } from "vee-validate";
  import cn from "classnames";
  import { TextArea } from "./components/index";

  interface PopupFormType {
    name?: string;
    email?: string;
    feedback: string;
  }

  export default defineComponent({
    name: "App",
    components: {
      TextArea,
    },

    setup() {
      const { handleSubmit, handleReset } = useForm({
        initialValues: {
          name: "",
          email: "",
          feedback: "",
        },
        validationSchema: {
          feedback(value: string) {
            if (!value) return "Feedback is required.";
            return true;
          },
        },
      });
      const email = useField<string>("email");
      const name = useField<string>("name");
      const feedback = useField<string>("feedback");

      const submit = handleSubmit((values: PopupFormType) => {
        console.log(values, "values");
      });

      return { email, name, feedback, submit, handleReset, cn };
    },
  });
</script>
