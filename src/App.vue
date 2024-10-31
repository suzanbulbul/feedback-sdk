<template>
  <div class="relative h-screen">
    <Banner />
    <feedback-widget />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Banner, FeedbackWidget } from "./section";

  export default defineComponent({
    name: "app",
    components: {
      Banner,
      FeedbackWidget,
    },
  });
</script>
