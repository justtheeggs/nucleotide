<template>
  <!-- Navbar Dropdown 2 rows -->
  <section>
    <div class="w-screen h-auto">
      <!-- NAVBAR -->
      <nav
        class="w-full h-auto max-w-[1600px] mx-auto font-inter lg:relative lg:top-0"
      >
        <!-- CONTAINER -->
        <div
          class="flex flex-col py-6 lg:py-4 px-6 lg:flex-row lg:px-10 lg:items-center lg:justify-between xl:px-20"
        >
          <!-- SVG LOGO - YOU CAN REPLACE THIS -->
          <a href="#"> Nucleotide </a>
          <!-- MENU CONTENT 1 -->
          <div
            class="flex flex-col lg:flex lg:flex-row mt-14 lg:mt-0 space-y-8 lg:space-y-0 lg:space-x-1"
            :class="{ show: openMenu, hidden: !openMenu }"
          >
            <!-- DROPDOWN -->
            <div class="flex flex-col relative">
              <a
                x-on:click.prevent="menuOne = !menuOne"
                href="#"
                class="lg:hover:bg-gray-50 rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800 flex flex-row"
                x-bind:class="menuOne ? 'text-gray-800 lg:border lg:border-gray-600 lg:bg-gray-50' : 'text-black lg:border lg:border-white' "
                >Component
                <svg
                  x-bind:class="menuOne ? 'rotate-180' : 'rotate-0' "
                  class="fill-current transition"
                  style="width: 24px; height: 24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
                  />
                </svg>
              </a>
              <!-- DROP DOWN MENU ONE -->
            </div>
            <a
              href="#"
              class="lg:hover:bg-gray-50 font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800"
              >Templates</a
            >
            <a
              href="#"
              class="lg:hover:bg-gray-50 font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800"
              >Pricing</a
            >
            <a
              href="#"
              class="lg:hover:bg-gray-50 font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800 pb-8 lg:pb-0"
              >FAQs</a
            >
          </div>
          <!-- MENU CONTENT 2 -->
          <div
            class="flex flex-col lg:flex lg:flex-row space-y-8 lg:space-y-0 lg:space-x-3"
            :class="{ show: openMenu, hidden: !openMenu }"
          >
            <a
              href="#"
              class="lg:hover:bg-gray-50 font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800"
              >Sign Up</a
            >
            <a
              class="px-8 py-4 font-inter text-center bg-black text-white rounded-lg hover:bg-gray-800"
              href="#"
              >Login</a
            >
          </div>
          <!-- BURGER MENU -->
          <a href="#" class="absolute right-5 lg:hidden" @click="toggleMenu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 12H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 6H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 18H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  </section>
</template>
<script setup lang="ts">
const openMenu = ref(false);

const toggleMenu = () => {
  openMenu.value = !openMenu.value;
};
</script>
