<template>
  <form :class="shortcuts.gridCol" class="gap-4" @submit.prevent="handleSubmit">
    <input-field
      id="name"
      label="Name"
      v-model="form.name.value.value"
      placeholder="Enter Name"
      :errorMessage="form.name.errorMessage.value"
    />
    <input-field
      id="email"
      type="email"
      label="Email"
      v-model="form.email.value.value"
      placeholder="Enter Email"
      :errorMessage="form.email.errorMessage.value"
    />
    <textarea-field
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
  import { InputField, TextareaField } from "../../../components";
  import { shortcuts } from "../../../until/style/shortcuts";

  export default defineComponent({
    name: "form-step",
    components: {
      InputField,
      TextareaField,
    },
    data() {
      return {
        shortcuts,
      };
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
