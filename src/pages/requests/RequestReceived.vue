<template>
  <the-layout>
    <template #header> Received Requests </template>

    <base-modal v-if="!isLoading && error" @okay="error = null">
      <template #header> Error Occured! </template>
      <p>{{ error }}</p>
    </base-modal>

    <base-card class="mt-6 sm:max-w-2xl sm:mx-auto">
      <base-spinner v-if="isLoading"></base-spinner>

      <div v-else>
        <div v-if="hasRequests">
          <ul class="divide-y divide-gray-200">
            <request-item
              v-for="(request, index) in receivedRequests"
              :key="request.id"
              :request="request"
              :requestIndex="index + 1"
            />
          </ul>
        </div>

        <div v-else class="text-center py-10">
          <p class="text-lg text-gray-600">No requests received yet.</p>
          <p class="text-sm text-gray-400 mt-2">
            When you receive requests, they will appear here.
          </p>
        </div>
      </div>
    </base-card>
  </the-layout>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";

export default {
  components: { RequestItem },

  data() {
    return {
      error: null,
      isLoading: true,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },

  created() {
    this.loadRequests();
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (message) {
        this.error = message;
      }

      this.isLoading = false;
    },
  },
};
</script>
