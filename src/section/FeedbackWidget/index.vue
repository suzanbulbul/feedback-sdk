<template>
  <div
    v-if="!isMinimized"
    :class="[
      shortcuts.borderRounded,
      'fixed bottom-4 left-4 sm:w-1/2 w-11/12 bg-teal-50 p-6',
    ]"
  >
    <div :class="[shortcuts.gridCol, 'gap-2.5']">
      <h1 :class="shortcuts.title">Your Feedback is Valuable</h1>
      <p :class="shortcuts.subtitle">
        We truly appreciate your feedback! Your thoughts help us improve our
        products and services. We would be grateful if you could share your
        insights with us.
      </p>
      <div class="flex space-x-2">
        <button
          :class="[
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.secondary,
            'w-full',
          ]"
          @click="minimize"
        >
          Minimize
        </button>
        <button
          :class="[
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.primary,
            'w-full',
          ]"
          @click="handleSave"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  </div>
  <div
    v-else
    :class="[shortcuts.borderRounded, 'fixed bottom-4 left-4 bg-teal-50 p-1']"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/4658/4658825.png"
      alt="Minimized Icon"
      class="w-12 h-12 cursor-pointer"
      @click="maximize"
    />
  </div>
  <modal-dialog
    :show="showModal"
    title="FeedBack Modal"
    @close="handleClose"
    @save="submit"
    saveTitle="Submit"
    :hiddenSaveButton="step === 2"
  >
    <div v-if="step === 1">
      <form-step :form="form" :submit="submit" />
    </div>
    <div v-if="step === 2">
      <submitted-step />
    </div>
  </modal-dialog>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { useField, useForm } from "vee-validate";
  import cn from "classnames";
  import { ModalDialog } from "../../components";
  import { SubmittedStep, FormStep } from "./tabs";
  import { shortcuts } from "../../until/style/shortcuts";
  import { useLocalStorage } from "../../until/helper/useLocalStorage";

  export interface FormType {
    name?: string;
    email?: string;
    feedback: string;
  }

  export default defineComponent({
    name: "feedback-widget",
    components: {
      ModalDialog,
      SubmittedStep,
      FormStep,
    },
    data() {
      return {
        shortcuts,
      };
    },
    setup() {
      const showModal = ref<boolean>(false);
      const step = ref<number>(1);
      const isMinimized = ref<boolean>(false);

      const minimize = () => {
        isMinimized.value = true;
      };
      const maximize = () => {
        isMinimized.value = false;
      };
      const handleSave = () => {
        showModal.value = true;
      };

      const handleClose = () => {
        handleReset();
        showModal.value = false;
        step.value === 2 && (minimize(), (step.value = 1));
      };

      onMounted(() => {
        setTimeout(() => {
          showModal.value = true;
        }, 1000);
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
        useLocalStorage({ name: "feedback-form", value: values });

        step.value === 1 ? (step.value = 2) : handleClose();
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
        isMinimized,
        minimize,
        maximize,
        handleSave,
      };
    },
  });
</script>
