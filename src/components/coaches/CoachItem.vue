<template>
  <div class="p-4 rounded-lg shadow-sm bg-white flex flex-col space-y-4">
    <!-- Header Section with Coach Name -->
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800">
        <router-link :to="coachDetailsLink" class="hover:text-indigo-600">
          {{ fullName }}
        </router-link>
      </h2>
    </div>

    <!-- Areas and Description Section -->
    <div class="space-y-2">
      <!-- Areas/Tags -->
      <div class="flex flex-wrap gap-2">
        <base-badge v-for="(area, index) in areas" :key="index" :text="area" />
      </div>

      <!-- Coach Description -->
      <p class="text-sm text-gray-600 leading-relaxed">
        {{ description }}
      </p>

      <!-- Hourly Rate -->
      <p class="text-lg font-bold text-indigo-600">
        ${{ hourlyRate }}
        <span class="text-sm font-normal text-gray-500">/hour</span>
      </p>
    </div>

    <!-- Action Buttons Section -->
    <div class="flex space-x-2">
      <base-button
        link
        class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center space-x-2"
        :to="coachContactLink"
      >
        <i class="fas fa-envelope"></i>
        <span>Contact</span>
      </base-button>

      <base-button
        link
        :to="coachDetailsLink"
        class="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center space-x-2"
      >
        <i class="fas fa-external-link-alt"></i>
        <span>View Details</span>
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    areas: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      default: "",
    },
    hourlyRate: {
      type: [Number, String],
      default: 0,
    },
    id: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    coachDetailsLink() {
      return this.$route.path + "/" + this.id;
    },

    coachContactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
  },
};
</script>

