<template>
  <ModalDialog
    :show="showModal"
    title="Bilgilendirme"
    @close="handleClose"
    @save="submit"
    saveTitle="Submit"
  >
    <form class="grid grid-col gap-4" @submit.prevent="submit">
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
    </form>
  </ModalDialog>
  suzan
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { useField, useForm } from "vee-validate";
  import cn from "classnames";
  import { TextareaField, InputField, ModalDialog } from "./components/index";

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
      ModalDialog,
    },

    setup() {
      const showModal = ref(false);

      const handleClose = () => {
        handleReset();
        showModal.value = false;
      };

      onMounted(() => {
        setTimeout(() => {
          showModal.value = true;
        }, 3000);
      });

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
        handleReset();
      });

      return {
        email,
        name,
        feedback,
        submit,
        handleReset,
        cn,
        showModal,
        handleClose,
      };
    },
  });
</script>
