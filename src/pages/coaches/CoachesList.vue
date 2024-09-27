<template>
  <the-layout>
    <template #header>
      <h1>Find a Coach</h1>
    </template>

    <coach-filter
      @refresh-click="refreshCoaches"
      @set-filter="updateFilteredCoaches"
    ></coach-filter>

    <div class="float-right my-3"></div>

    <base-modal v-if="!isLoading && error" @okay="error = null">
      <template #header> Error Occured! </template>
      <p>{{ error }}</p>
    </base-modal>

    <base-spinner v-if="isLoading"></base-spinner>

    <div v-else>
      <section
        v-if="hasCoaches"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1"
      >
        <base-card v-for="coach in filteredCoaches" :key="coach.id">
          <coach-item
            :imageUrl="coach.imageUrl"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :description="coach.description"
            :hourlyRate="coach.hourlyRate"
            :id="coach.id"
          ></coach-item>
        </base-card>
      </section>

      <div v-else class="text-center py-10">
        <p class="text-gray-600 text-sm text-muted">
          No coaches available at the moment. Please check back later!
        </p>
      </div>
    </div>
  </the-layout>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },

  data() {
    return {
      filters: {
        name: "",
        areas: "",
        minHourlyRate: 0,
        maxHourlyRate: 0,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    filteredCoaches() {
      let coaches = this.$store.getters["coaches/coaches"];

      return coaches.filter((coach) => {
        const matchesName = this.filters.name
          ? (
              coach.firstName.toLowerCase() +
              " " +
              coach.lastName.toLowerCase()
            ).includes(this.filters.name.toLowerCase())
          : true;

        const matchesArea = this.filters.areas
          ? coach.areas
              .map((area) => area.toLowerCase())
              .includes(this.filters.areas.toLowerCase())
          : true;

        const matchesMinRate = this.filters.minHourlyRate
          ? coach.hourlyRate >= this.filters.minHourlyRate
          : true;

        const matchesMaxRate = this.filters.maxHourlyRate
          ? coach.hourlyRate <= this.filters.maxHourlyRate
          : true;

        return matchesName && matchesArea && matchesMinRate && matchesMaxRate;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.filteredCoaches.length > 0;
    },
  },

  created() {
    this.loadCoaches();
  },
  methods: {
    async loadCoaches() {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("coaches/loadCoaches");
      } catch (message) {
        this.error = message;
      }
      this.isLoading = false;
    },
    refreshCoaches() {
      this.loadCoaches();
    },
    updateFilteredCoaches(filterValues) {
      this.filters = filterValues;
    },
    okayModal() {
      this.error = null;
    },
  },
};
</script>

