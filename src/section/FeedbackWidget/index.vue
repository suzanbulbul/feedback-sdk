<template>
  <div
    v-if="!isMinimized"
    :class="[
      shortcuts.borderRounded,
      'fixed bottom-4 left-4 sm:w-1/2 w-11/12 bg-teal-50 p-6',
    ]"
  >
    <div :class="[shortcuts.gridCol, 'gap-2.5']">
      <h1 :class="shortcuts.title">{{ title }}</h1>
      <p :class="shortcuts.subtitle">
        {{ desc }}
      </p>
      <div class="flex space-x-2">
        <button
          :class="[
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.secondary,
            'w-full',
          ]"
          @click="isMinimized = true"
        >
          {{ minimizeTitle }}
        </button>
        <button
          :class="[
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.primary,
            'w-full',
          ]"
          @click="showModal = true"
        >
          {{ submitTitle }}
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
      @click="isMinimized = false"
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
    props: {
      title: {
        type: String,
        required: false,
        default: "Your Feedback is Valuable",
      },
      desc: {
        type: String,
        required: false,
        default:
          "We truly appreciate your feedback! Your thoughts help us improve our products and services. We would be grateful if you could share your insights with us.",
      },
      minimizeTitle: {
        type: String,
        required: false,
        default: "Minimize",
      },
      submitTitle: {
        type: String,
        required: false,
        default: "Submit Feedback ",
      },
    },
    setup() {
      const showModal = ref<boolean>(false);
      const step = ref<number>(1);
      const isMinimized = ref<boolean>(false);

      const handleClose = () => {
        handleReset();
        showModal.value = false;
        step.value === 2 && ((isMinimized.value = true), (step.value = 1));
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
        shortcuts,
      };
    },
  });
</script>
