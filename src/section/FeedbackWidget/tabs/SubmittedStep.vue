<template>
  <h1 :class="shortcuts.subtitle">
    Thank you! Your feedback is very valuable to us. We will continue to work to
    provide a better experience with your feedback.
  </h1>
</template>

<script lang="ts">
  import { shortcuts } from "../../../until/style/shortcuts";

  export default {
    data() {
      return {
        shortcuts,
      };
    },
  };
</script>
