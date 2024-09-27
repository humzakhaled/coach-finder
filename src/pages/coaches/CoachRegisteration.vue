<template>
  <!-- <base-modal-spinner v-if="isLoading && !error"></base-modal-spinner> -->

  <base-modal v-if="error" @okay="error = null">
    <template #header>
      <p class="text-red-900">Error Occurred!</p>
    </template>
    <p>{{ error }}</p>
  </base-modal>

  <the-layout>
    <template #header>
      <h1>Register as a Coach</h1>
    </template>

    <coach-form @save-data="saveData"></coach-form>
  </the-layout>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";

export default {
  components: { CoachForm },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(formData) {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch("coaches/registerCoach", formData);
        this.$router.push("/coaches");
      } catch (message) {
        this.error = message;
      }

      this.isLoading = false;
    },
  },
};
</script>
