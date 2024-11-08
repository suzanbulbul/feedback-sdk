<template>
  <div
    v-if="!isMinimized"
    :class="[
      shortcuts.borderRounded,
      feedback.theme.bg,
      'fixed bottom-4 left-4 sm:w-1/2 w-11/12 p-6',
    ]"
  >
    <div :class="[shortcuts.gridCol, 'gap-2.5']">
      <h1 :class="[feedback.theme.color, shortcuts.title]">
        {{ feedback.title }}
      </h1>
      <p :class="shortcuts.subtitle">
        {{ feedback.desc }}
      </p>
      <div class="flex space-x-2">
        <button
          :class="[
            'w-full',
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.secondary,
          ]"
          @click="isMinimized = true"
        >
          {{ feedback.minimizeTitle }}
        </button>
        <button
          :class="[
            feedback.theme.btnColor,
            shortcuts.borderRounded,
            shortcuts.subtitleBold,
            shortcuts.btn.primary,
            'w-full',
          ]"
          @click="showModal = true"
        >
          {{ feedback.submitTitle }}
        </button>
      </div>
    </div>
  </div>
  <div
    v-else
    :class="[
      shortcuts.borderRounded,
      feedback.theme.bg,
      'fixed bottom-4 left-4 p-1',
    ]"
  >
    <img
      :src="feedback.minimizeIconURL"
      alt="Minimized Icon"
      class="w-12 h-12 cursor-pointer"
      @click="isMinimized = false"
    />
  </div>
  <modal-dialog
    :show="showModal"
    :title="feedback.modal.title"
    @close="handleClose"
    @save="submit"
    :saveTitle="feedback.modal.saveTitle"
    :closeTitle="feedback.modal.closeTitle"
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
  import { defineComponent, ref } from "vue";
  import { useField, useForm } from "vee-validate";
  import { ModalDialog } from "../../components";
  import { SubmittedStep, FormStep } from "./tabs";
  import { shortcuts, useLocalStorage, VARIANT } from "../../untils";
  // import { FeedbackApi } from "../../api/feebackApi";

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
      const isMinimized = ref<boolean>(false);

      const handleClose = () => {
        handleReset();
        showModal.value = false;
        step.value === 2 && ((isMinimized.value = true), (step.value = 1));
      };

      const { handleSubmit, handleReset } = useForm<FormType>({
        initialValues: {
          name: "",
          email: "",
          feedback: "",
        },
        validationSchema: {
          email(value: string) {
            if (value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
              return "Geçerli bir e-posta adresi girin.";
            }
            return true;
          },
          feedback(value: string) {
            if (!value) return "Geri bildirim alanı zorunludur.";
            return true;
          },
        },
      });

      const submit = handleSubmit(async (form: FormType) => {
        useLocalStorage({ name: "feedback-form", value: form });
        if (step.value === 1) {
          // await FeedbackApi.createFeedback(form).then((res: any) => {
          //   if (!res?.error) {
          //     step.value = 2;
          //   }
          // });
          step.value = 2;
          console.log(form);
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
        showModal,
        handleClose,
        step,
        isMinimized,
        shortcuts,
        feedback: {
          title:
            window.feedbackConfig?.title ||
            "Geri Bildiriminiz Bizim için Çok Değerli",
          desc:
            window.feedbackConfig?.desc ||
            "Sizlerin görüşleri bizim için çok önemli! Ürün ve hizmetlerimizi daha iyi hale getirebilmemiz için düşüncelerinizi paylaşırsanız çok seviniriz.",
          minimizeTitle: window.feedbackConfig?.minimizeTitle || "Şimdi Değil",
          submitTitle: window.feedbackConfig?.submitTitle || "Görüş Bildir",
          theme: VARIANT[window.feedbackConfig?.theme || "TEAL"],
          minimizeIconURL:
            window.feedbackConfig?.minimizeIconURL ||
            "https://cdn-icons-png.flaticon.com/512/4658/4658825.png",
          modal: {
            title:
              window.feedbackConfig?.modal?.title || "Görüş Bildirme Formu",
            saveTitle: window.feedbackConfig?.modal?.saveTitle,
            closeTitle: window.feedbackConfig?.modal?.closeTitle,
          },
        },
      };
    },
  });
</script>
