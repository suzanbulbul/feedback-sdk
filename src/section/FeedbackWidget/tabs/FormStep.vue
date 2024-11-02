<template>
  <form :class="shortcuts.gridCol" class="gap-4" @submit.prevent="handleSubmit">
    <input-field
      id="name"
      label="Ad-Soyad"
      v-model="form.name.value.value"
      placeholder="Ad-Soyad Girin"
      :errorMessage="form.name.errorMessage.value"
    />
    <input-field
      id="email"
      type="email"
      label="E-posta"
      v-model="form.email.value.value"
      placeholder="E-postanızı Girin"
      :errorMessage="form.email.errorMessage.value"
    />
    <textarea-field
      id="feedback"
      label="Geri Bildirim*"
      v-model="form.feedback.value.value"
      placeholder="Lütfen geri bildiriminizi girin"
      :errorMessage="form.feedback.errorMessage.value"
    />
  </form>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { InputField, TextareaField } from "../../../components";
  import { shortcuts } from "../../../untils";

  export default defineComponent({
    name: "form-step",
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
        shortcuts,
        handleSubmit,
      };
    },
  });
</script>
