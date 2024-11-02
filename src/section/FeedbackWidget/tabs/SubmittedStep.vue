<template>
  <h1 :class="shortcuts.subtitle">
    {{ thanksMessage }}
  </h1>
</template>

<script lang="ts">
  import { shortcuts } from "../../../untils";

  export default {
    data() {
      return {
        shortcuts,
        thanksMessage:
          window.feedbackConfig?.modal?.thanksMessage ||
          "Teşekkür ederiz! Görüşleriniz bizim için çok değerli. Sunduğunuz geri bildirimle daha iyi bir deneyim sunmak için çalışmaya devam edeceğiz.",
      };
    },
  };
</script>
