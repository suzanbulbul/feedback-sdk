<template>
  <div
    v-if="!isMinimized"
    class="fixed bottom-4 left-4 sm:w-1/2 w-11/12 bg-gray-300 p-6 rounded-lg shadow-md"
  >
    <h1 class="text-lg font-semibold text-gray-800 mb-2">
      Görüşleriniz bizim çok kıymetli
    </h1>
    <p class="text-gray-600 mb-4">
      Sizlerin görüşleri bizim için çok önemli! Ürün ve hizmetlerimizi daha iyi
      hale getirebilmemiz için düşüncelerinizi paylaşırsanız çok seviniriz.
    </p>

    <div class="flex space-x-2">
      <button
        @click="minimize"
        class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Küçült
      </button>
      <button
        @click="handleSave"
        class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Görüş Bildir
      </button>
    </div>
  </div>

  <div
    v-else
    class="fixed bottom-4 left-4 bg-gray-300 rounded-full shadow-md p-1"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/4658/4658825.png"
      alt="Minimized Icon"
      class="w-12 h-12 cursor-pointer"
      @click="maximize"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "CookieArea",
    setup() {
      const isMinimized = ref(false);

      const minimize = () => {
        isMinimized.value = true;
      };

      const maximize = () => {
        isMinimized.value = false;
      };

      const handleSave = () => {};

      return {
        isMinimized,
        minimize,
        maximize,
        handleSave,
      };
    },
  });
</script>
