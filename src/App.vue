<template>
  <feedback-widget />
</template>

<script lang="ts">
  import "../build.css";
  import { defineComponent } from "vue";
  import { FeedbackWidget } from "./section";

  export default defineComponent({
    name: "app",
    components: {
      FeedbackWidget,
    },
  });
</script>
