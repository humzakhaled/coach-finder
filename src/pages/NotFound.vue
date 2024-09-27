<template>
  <the-layout>
    <template #header>
      <h1>Not Found</h1>
    </template>

    <div class="flex items-center justify-center bg-gray-100">
      <div class="text-center p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <p class="mb-4 text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <base-button
          class="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5"
          to="/coaches"
          link
        >
          Go Back
        </base-button>
      </div>
    </div>
  </the-layout>
</template>


<script>
export default {
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push("/coaches");
      }
    },
  },
};
</script>