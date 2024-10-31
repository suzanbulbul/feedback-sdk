<template>
  <div
    v-if="!isMinimized"
    class="fixed bottom-4 left-4 sm:w-1/2 w-11/12 bg-teal-50 p-6 rounded-lg shadow-md"
  >
    <h1 class="text-md font-semibold text-teal-700 mb-2">
      Your Feedback is Valuable
    </h1>
    <p class="text-sm text-gray-600 mb-4">
      We truly appreciate your feedback! Your thoughts help us improve our
      products and services. We would be grateful if you could share your
      insights with us.
    </p>

    <div class="flex space-x-2">
      <button
        @click="minimize"
        class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Minimize
      </button>
      <button
        @click="handleSave"
        class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Feedback
      </button>
    </div>
  </div>
  <div
    v-else
    class="fixed bottom-4 left-4 bg-teal-50 rounded-full shadow-md p-1"
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

    setup() {
      const showModal = ref<boolean>(false);
      const step = ref<number>(1);
      const isMinimized = ref(false);

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
        isMinimized,
        minimize,
        maximize,
        handleSave,
      };
    },
  });
</script>
