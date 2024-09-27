<template>
  <!-- Error Modal -->
  <base-modal v-if="reqError" @okay="reqError = null">
    <template #header>
      <p class="text-red-700 font-semibold">Error Occurred!</p>
    </template>
    <p class="text-gray-600">{{ reqError }}</p>
  </base-modal>

  <base-modal v-else-if="success" @okay="success = null">
    <template #header>
      <p class="text-green-700 font-semibold">Message Sent!</p>
    </template>
    <p class="text-gray-600">{{ success }}</p>
  </base-modal>

  <!-- Form Container -->
  <base-card class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Email Input Field -->
      <div>
        <base-input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="Email address"
          @input="validateEmail"
          :class="{ 'border-red-500': errors.email }"
        >
          <template #label>
            Email<small class="text-red-500 ml-1">*</small>
          </template>
        </base-input>
        <p v-if="errors.email" class="text-red-500 text-xs mt-1">
          {{ errors.email }}
        </p>
      </div>

      <!-- Message Textarea Field -->
      <div>
        <label for="message" class="block text-sm font-semibold text-gray-700">
          Message<small class="text-red-500 ml-1">*</small>
        </label>
        <textarea
          id="message"
          v-model.trim="message"
          @input="validateMessage"
          :class="[
            'block w-full text-sm rounded-md p-2.5 border',
            errors.message ? 'border-red-500' : 'border-gray-300',
          ]"
          rows="4"
          placeholder="Write your message..."
        ></textarea>
        <p v-if="errors.message" class="text-red-500 text-xs mt-1">
          {{ errors.message }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end space-x-4 mt-4">
        <!-- Send Message Button -->
        <base-button
          type="submit"
          :disabled="isLoading"
          class="bg-indigo-600 text-white hover:bg-indigo-700 py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
        >
          {{ isLoading ? "Sending..." : "Send Message" }}
        </base-button>

        <!-- Cancel Button -->
        <base-button
          link
          :to="cancelLink"
          :disabled="isLoading"
          class="bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-md transition duration-150 ease-in-out"
        >
          Cancel
        </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      errors: {},
      reqError: null,
      success: null,
    };
  },
  computed: {
    cancelLink() {
      return { name: "CoachDetail", params: { id: this.$route.params.id } };
    },
  },
  methods: {
    async handleSubmit() {
      if (this.validateForm()) {
        this.isLoading = true;
        this.reqError = null;
        this.success = null;
        try {
          await this.$store.dispatch("requests/contactCoach", {
            coachId: this.$route.params.id,
            email: this.email,
            message: this.message,
          });
          this.success =
            "Message is sent successfully! Coach will get back to you as soon as possible";

          this.email = "";
          this.message = "";
          // this.$router.push(`/coaches/${this.$route.params.id}`);
        } catch (message) {
          this.reqError = message;
        }

        this.isLoading = false;
      }
    },

    validateForm() {
      this.errors = {};
      this.validateEmail();
      this.validateMessage();
      return Object.keys(this.errors).length === 0;
    },

    validateEmail() {
      if (!this.email) {
        this.errors.email = "Email is required.";
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = "Email is not valid.";
      } else {
        delete this.errors.email;
      }
    },

    validateMessage() {
      if (!this.message) {
        this.errors.message = "Message is required.";
      } else {
        delete this.errors.message;
      }
    },

    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
