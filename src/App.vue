<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Test } from './components';

export default defineComponent({
  components: {
    Test,
  },
  setup() {
    const TestData = ref({
      title: 'Hoş Geldiniz',
      desc: 'Vue.js ile oluşturulan Test bileşeni ile hoş bir karşılama!',
      bgImg: 'https://example.com/path/to/your/image.jpg',
    });

    return {
      TestData,
    };
  },
});
</script>

<template>
  <div>
    <Test :data="TestData">
      <p>Bu içerik Test bileşeninin içinde görüntülenecek.</p>
    </Test>
  </div>
</template>
