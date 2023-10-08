<template>
  <!-- Navbar Dropdown 2 rows -->
  <section>
    <div class="w-screen h-auto bg-cyan-950 text-white font-bold text-lg">
      <!-- NAVBAR -->
      <nav
        class="w-full h-auto max-w-[1600px] mx-auto font-inter lg:relative lg:top-0"
      >
        <!-- CONTAINER -->
        <div
          class="flex flex-col py-6 lg:py-4 px-6 lg:flex-row lg:px-10 lg:items-center lg:justify-between xl:px-20"
        >
          <!-- SVG LOGO - YOU CAN REPLACE THIS -->
          <NuxtLink class="text-4xl" to="/"> Nucleotide </NuxtLink>
          <!-- MENU CONTENT 1 -->
          <div
            class="flex flex-col lg:flex lg:flex-row mt-14 lg:mt-0 space-y-8 lg:space-y-0 lg:space-x-1"
            :class="{ show: openMenu, hidden: !openMenu }"
          >
            <NuxtLink
              class="lg:hover:bg-gray-50 font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800"
            >
              Project Finder
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="lg:hover:bg-gray-50 font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800"
            >
              About
            </NuxtLink>
          </div>
          <!-- MENU CONTENT 2 -->
          <div
            class="flex flex-col lg:flex lg:flex-row space-y-8 lg:space-y-0 lg:space-x-3 hover:bg-white hover:text-black p-2 rounded-md mr-2"
            :class="{ show: openMenu, hidden: !openMenu }"
          >
            <PrimaryButton
              class="!px-8 !py-4"
              to="/signin"
              :class="{ show: !authenticated, hidden: authenticated }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-user-square-rounded inline-block"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
                <path
                  d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
                />
                <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
              </svg>
              Login / Sign Up
            </PrimaryButton>

            <!-- dropdown for avatar-->
            <hr class="lg:hidden" />
            <div class="flex flex-col relative">
              <div class="flex cursor-pointer" @click="toggleProfile">
                <div class="mr-10">
                  <img
                    :class="{ show: authenticated, hidden: !authenticated }"
                    class="w-16 h-16 rounded-xl"
                    :src="session?.user?.image ?? ''"
                  />
                </div>
                <div class="flex items-center pl-2">
                  <p>{{ session?.user?.name }}</p>
                </div>
              </div>
              <!-- DROP DOWN MENU ONE -->
              <div
                class="w-full flex flex-col bg-cyan-950 z-50 lg:flex-row lg:flex-wrap lg:absolute lg:top-20 px-5 lg:px-75 lg:py-7 lg:shadow-[0_16px_64px_-15px_rgba(45,96,173,0.15)] py-5 lg:w-[230px] lg:h-[170px] rounded-b-md"
                :class="{ show: showUser, 'lg:hidden': !showUser }"
              >
                <!-- link to profile page with icon to left -->
                <NuxtLink
                  to="/profile"
                  class="flex text-white font-bold text-lg mb-5 lg:mb-0 h-[40px]"
                >
                  <div><User /></div>
                  <div class="ml-6 hover:underline">My Profile</div>
                </NuxtLink>
                <NuxtLink
                  to="/projects"
                  class="flex text-white font-bold text-lg mb-5 lg:mb-0 h-[40px]"
                >
                  <div><Projects /></div>
                  <div class="ml-6 hover:underline">My Projects</div>
                </NuxtLink>
                <div
                  @click="signOut()"
                  class="flex text-white font-bold text-lg mb-5 lg:mb-0 h-[40px]"
                >
                  <div><Signout /></div>
                  <div class="ml-6 hover:underline">Sign Out</div>
                </div>
              </div>
            </div>
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
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 6H20.25"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 18H20.25"
                stroke="#ffffff"
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

const showUser = ref(false);

const toggleProfile = () => {
  showUser.value = !showUser.value;
};
const { data: session, status, signOut } = useAuth();
const authenticated = computed(() => status.value === "authenticated");
</script>
