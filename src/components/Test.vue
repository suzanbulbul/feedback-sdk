<template>
    <div class="relative h-screen">
      <img
        :src="data.bgImg"
        alt="Test Background"
        class="absolute inset-0 z-0 object-cover w-full h-full"
      />
      <section class="flex items-center justify-center h-full">
        <div class="bg-black bg-opacity-50 backdrop-blur-md text-center p-8 rounded-lg">
          <h1 class="text-4xl text-white font-bold mb-4">{{ data.title }}</h1>
          <p class="text-lg text-gray-200">{{ data.desc }}</p>
        </div>
      </section>
      <slot />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface TestType {
    data: { title: string; desc: string; bgImg: string };
  }
  
  export default defineComponent({
    name: 'Test',
    props: {
      data: {
        type: Object as () => TestType['data'],
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  </style>
  