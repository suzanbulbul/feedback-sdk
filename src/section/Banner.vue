<template>
  <div class="banner bg-gray-100 py-12">
    <div class="container mx-auto">
      <div class="product">
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2 p-4">
            <div class="w-4/5 mx-auto">
              <h1 class="text-3xl font-bold mb-4">
                Smarten up your work look or throw on a blazer with jeans for
                the weekend
              </h1>
              <button
                :class="[
                  shortcuts.borderRounded,
                  shortcuts.subtitleBold,
                  shortcuts.btn.primary,
                ]"
              >
                Shop Now
                <i class="icon-arrow"></i>
              </button>
            </div>
            <div class="hidden md:block">
              <img
                src="https://suzanbulbul.github.io/product-landing-page/_nuxt/img/woman_example.f44c750.png"
                alt="Woman Example"
                class="w-full h-auto"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 p-4">
            <div class="relative hidden md:block">
              <img
                src="https://suzanbulbul.github.io/product-landing-page/_nuxt/img/product_example.42ee252.png"
                alt="Product Example"
                class="w-full h-auto"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-4"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <h2 class="text-xl font-semibold">
                      Saffiano leather bag 2005
                    </h2>
                    <p class="text-lg text-gray-800">€199.95</p>
                  </div>
                  <img
                    src="https://suzanbulbul.github.io/product-landing-page/_nuxt/img/bag-example.c74de23.png"
                    alt="Bag Example"
                    class="w-16 h-16"
                  />
                </div>
              </div>
            </div>
            <div class="block md:hidden">
              <div class="relative">
                <img
                  src="https://suzanbulbul.github.io/product-landing-page/_nuxt/img/product_example.42ee252.png"
                  alt="Product Example"
                  class="w-full h-auto"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-4"
                >
                  <div class="flex justify-between items-center">
                    <img
                      src="https://suzanbulbul.github.io/product-landing-page/_nuxt/img/bag-example.c74de23.png"
                      alt="Bag Example"
                      class="w-16 h-16"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-4/5 mx-auto">
              <p class="text-gray-700 mb-4">
                At suspendisse augue lectus arcu, accumsan ut sit posuere vitae
                sit tincidunt semper eu proin leo gravida cursus.
              </p>
              <a class="text-teal-700 underline" href="/">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { shortcuts } from "../until/style/shortcuts";

  export default defineComponent({
    name: "banner",

    data() {
      return {
        shortcuts,
      };
    },
  });
</script>
