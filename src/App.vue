<template>
  <form @submit.prevent="onSubmit" class="grid grid-col gap-3 bg-white p-5">
    <Input
      v-model="fields.name.value"
      label="Name"
      placeholder="Enter your name"
    />
    <Input
      v-model="fields.email.value"
      label="Email"
      placeholder="Enter your email"
      type="email"
    />
    <Input
      v-model="fields.feedback.value"
      label="Feedback *"
      placeholder="Enter your feedback"
      :hasError="feedbackError"
      :errorMessage="feedbackErrorMessage"
    />
    <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Submit
    </button>
  </form>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useForm, useField } from "vee-validate";
  import * as yup from "yup";
  import Input from "./components/Input.vue";

  export default defineComponent({
    name: "FeedbackForm",
    components: {
      Input,
    },
    setup() {
      const schema = yup.object({
        feedback: yup.string().required("Feedback is required"),
      });

      const { handleSubmit, errors } = useForm({
        validationSchema: schema,
        validateOnMount: false,
      });

      const fields = {
        name: useField("name"),
        email: useField("email"),
        feedback: useField("feedback"),
      };

      const feedbackError = computed(() => !!errors.value.feedback);
      const feedbackErrorMessage = computed(() =>
        errors.value.feedback ? errors.value.feedback : ""
      );

      const onSubmit = async (values: any) => {
        console.log("Form submitted", values);
        fields.name.setValue("");
        fields.email.setValue("");
        fields.feedback.setValue("");
      };

      return {
        fields,
        handleSubmit,
        onSubmit,
        feedbackError,
        feedbackErrorMessage,
      };
    },
  });
</script>
