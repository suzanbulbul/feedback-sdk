<template>
  <form class="grid grid-col gap-4" @submit.prevent="handleSubmit">
    <InputField
      id="name"
      label="Name"
      v-model="form.name.value.value"
      placeholder="Enter Name"
      :errorMessage="form.name.errorMessage.value"
    />
    <InputField
      id="email"
      type="email"
      label="Email"
      v-model="form.email.value.value"
      placeholder="Enter Email"
      :errorMessage="form.email.errorMessage.value"
    />
    <TextareaField
      id="feedback"
      label="Feedback*"
      v-model="form.feedback.value.value"
      placeholder="Enter Feedback"
      :errorMessage="form.feedback.errorMessage.value"
    />
  </form>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { InputField, TextareaField } from "../components";

  export default defineComponent({
    name: "FeedbackStep",
    components: {
      InputField,
      TextareaField,
    },
    props: {
      form: {
        type: Object,
        required: true,
      },
      submit: {
        type: Function,
        required: true,
      },
    },
    emits: ["submit"],
    setup(props, { emit }) {
      const handleSubmit = (event: Event) => {
        event.preventDefault();
        emit("submit", props.form);
      };

      return {
        handleSubmit,
      };
    },
  });
</script>
