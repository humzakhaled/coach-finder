<template>
  <the-layout>
    <template #header>Coach Details</template>

    <base-card
      class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10"
    >
      <div
        v-if="selectedCoach"
        class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"
      >
        <!-- Coach Profile Image -->
        <!-- <div class="flex-shrink-0">
          <img
            :src="selectedCoach.imageUrl"
            alt="Coach Image"
            class="w-20 h-20 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          />
        </div> -->

        <!-- Coach Information -->
        <div class="flex flex-col flex-grow">
          <div class="flex flex-col space-y-4">
            <!-- Coach Name and Badges -->
            <div class="flex flex-col md:flex-row items-center justify-between">
              <h2 class="text-2xl font-semibold text-gray-800">
                {{ fullName }}
              </h2>
              <div class="flex flex-wrap space-x-2 mt-2 md:mt-0">
                <base-badge
                  v-for="(area, index) in selectedCoach.areas"
                  :key="index"
                  :text="area"
                />
              </div>
            </div>

            <p class="text-lg font-bold text-indigo-600">
              ${{ selectedCoach.hourlyRate }}
              <span class="text-sm font-normal text-gray-500">/hour</span>
            </p>

            <!-- Coach Description -->
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ selectedCoach.description }}
            </p>
          </div>

          <router-view></router-view>

          <!-- Action Buttons -->
          <div class="flex justify-between mt-6 space-x-4">
            <base-button
              link
              :to="coachContactLink"
              class="bg-indigo-600 text-white py-2.5 hover:bg-indigo-700"
              icon="fas fa-envelope"
            >
              Contact Coach
            </base-button>
            <!-- <base-button
              link
              to="/coaches"
              class="bg-gray-200 text-gray-700 py-2.5 hover:bg-gray-300"
              icon="fas fa-arrow-left"
            >
              Go to coaches
            </base-button> -->
          </div>
        </div>
      </div>

      <div v-else>
        <p class="text-red-600 font-medium">
          Data is lost on page refresh because coaches are not saved in storage.
        </p>

        <br />Please go back to
        <base-button link to="/coaches">Coaches</base-button>
      </div>

      <!-- Router View -->
    </base-card>
  </the-layout>
</template>

<style scoped>
.base-button {
  transition: background-color 0.3s, color 0.3s;
}

.base-button:hover {
  background-color: #e2e2e2;
  color: #333;
}
</style>


<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
      showContactButton: true,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },

    coachContactLink() {
      return { name: "ContactCoach", params: { id: this.$route.params.id } };
    },
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/coaches"].find(
      (coach) => coach.id == this.id
    );
  },
};
</script>
