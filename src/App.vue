<template>
  <ModalDialog
    :show="showModal"
    title="Bilgilendirme"
    @close="handleClose"
    @save="submit"
    saveTitle="Submit"
  >
    <div v-if="step === 1">
      <FeedbackStep :form="form" @submit="submit" />
    </div>
    <div v-if="step === 2">
      <ThankYouStep />
    </div>
  </ModalDialog>
  <Banner />
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { useField, useForm } from "vee-validate";
  import cn from "classnames";
  import { TextareaField, InputField, ModalDialog } from "./components/index";
  import { FeedbackStep, ThankYouStep, Banner } from "./section";

  export interface FormType {
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
      ThankYouStep,
      FeedbackStep,
      Banner,
    },

    setup() {
      const showModal = ref<boolean>(false);
      const step = ref<number>(1);

      const handleClose = () => {
        handleReset();
        showModal.value = false;
      };

      onMounted(() => {
        setTimeout(() => {
          showModal.value = true;
        }, 3000);
      });

      const { handleSubmit, handleReset } = useForm<FormType>({
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

      const submit = handleSubmit((values: FormType) => {
        console.log(values, "values");
        if (step.value === 1) {
          step.value = 2;
        } else {
          handleClose();
        }
      });

      return {
        form: {
          name: useField<string>("name"),
          email: useField<string>("email"),
          feedback: useField<string>("feedback"),
        },
        submit,
        handleReset,
        cn,
        showModal,
        handleClose,
        step,
      };
    },
  });
</script>
