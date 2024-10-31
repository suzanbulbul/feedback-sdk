<template>
  <form class="grid grid-col gap-4" @submit.prevent="submit">
    <legend class="text-2xl font-bold mb-6">Register Form</legend>
    <InputField
      id="name"
      label="Name"
      v-model="name.value.value"
      placeholder="Enter Name"
      :errorMessage="name.errorMessage.value"
    />
    <InputField
      id="email"
      type="email"
      label="Email"
      v-model="email.value.value"
      placeholder="Enter Email"
      :errorMessage="email.errorMessage.value"
    />

    <TextareaField
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
  import { TextareaField, InputField } from "./components/index";

  interface PopupFormType {
    name?: string;
    email?: string;
    feedback: string;
  }

  export default defineComponent({
    name: "App",
    components: {
      TextareaField,
      InputField,
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
