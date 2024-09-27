<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="h-8 w-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                to="/coaches"
                active-class=" bg-gray-900"
                class="rounded-md px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
                >Coaches</router-link
              >

              <router-link
                v-if="isLoggedIn && !isCoach"
                to="/register"
                active-class=" bg-gray-900"
                class="rounded-md px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
                >Register as Coach</router-link
              >
              <router-link
                to="/requests"
                v-if="isLoggedIn"
                active-class=" bg-gray-900"
                class="rounded-md px-3 py-2 text-sm font-medium text-white"
                aria-current="page"
                >My Requests</router-link
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <base-button
              link
              v-if="!isLoggedIn"
              to="/auth"
              class="rounded-md px-3 mx-2 py-2 text-sm font-medium text-white"
              aria-current="page"
              >Login</base-button
            >

            <base-button
              v-if="isLoggedIn"
              @click="logout"
              class="rounded-md px-3 mx-2 py-2 text-sm font-medium text-white"
              aria-current="page"
              >Logout</base-button
            >
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            @click="toggleMenu"
            aria-controls="mobile-menu"
            :aria-expanded="isMenuOpen.toString()"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg
              class="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              v-if="isMenuOpen"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="md:hidden" id="mobile-menu" v-show="isMenuOpen">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <router-link
          to="/coaches"
          active-class="bg-gray-900 text-white"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Coaches</router-link
        >

        <router-link
          v-if="!isCoach && isLoggedIn"
          to="/register"
          active-class="bg-gray-900 text-white"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Register as Coach</router-link
        >

        <router-link
          to="/requests"
          v-if="isLoggedIn"
          active-class="bg-gray-900 text-white"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >My Requests</router-link
        >

        <router-link
          v-else
          to="/auth"
          active-class="bg-gray-900 text-white"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Login</router-link
        >

        <li
          v-if="isLoggedIn"
          @click="logout"
          class="block rounded-md px-3 py-2 my-3 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Logout
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false, // menu state
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["isAuthenticated"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/coaches");
    },
  },
};
</script>
