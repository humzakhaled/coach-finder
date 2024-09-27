<template>
  <li
    class="p-4 sm:p-6 bg-white hover:bg-gray-50 transition duration-200 rounded-lg shadow-sm flex flex-col sm:flex-row justify-start items-start sm:items-center"
  >
    <!-- Large request number on the left -->
    <div class="text-4xl font-bold text-gray-300 sm:mr-6">
      #{{ requestIndex }}
    </div>

    <!-- Request details (email and message) -->
    <div class="flex-1">
      <p class="text-lg font-semibold text-gray-900">
        <a :href="emailTo">
          {{ request.email }}
        </a>
      </p>
      <p class="mt-1 text-sm text-gray-700">{{ request.message }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    request: {
      type: Object,
      required: true,
      default() {
        return {
          id: null,
          email: "no-email@example.com",
          message: "No message available",
        };
      },
    },
    requestIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    emailTo() {
      return `mailto:${this.request.email}`;
    },
  },
};
</script>
