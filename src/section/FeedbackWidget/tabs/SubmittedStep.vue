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
          "Thank you! Your feedback is very valuable to us. We will continue to work to provide a better experience with your feedback.",
      };
    },
  };
</script>
