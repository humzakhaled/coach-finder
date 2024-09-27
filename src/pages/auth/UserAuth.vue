<template>
  <the-layout>
    <template #header>{{ headerText }}</template>

    <!-- Error Modal -->
    <base-modal v-if="error" @okay="error = null">
      <template #header>
        <p class="text-red-900">Error Occurred!</p>
      </template>
      <p>{{ error }}</p>
    </base-modal>

    <!-- <base-modal-spinner v-if="isLoading"></base-modal-spinner> -->

    <base-card class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="onSubmit">
        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            value="hamza@gmail.com"
            id="email"
            class="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
            @input="validateField('email')"
            :disabled="isLoading"
          />
          <p v-if="emailError && emailTouched" class="text-red-500 text-sm">
            {{ emailError }}
          </p>
        </div>

        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            @input="validateField('password')"
            :disabled="isLoading"
          />
          <p
            v-if="passwordError && passwordTouched"
            class="text-red-500 text-sm"
          >
            {{ passwordError }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between items-center">
          <base-button
            type="submit"
            class="py-2.5 bg-indigo-500 hover:bg-indigo-700 text-white"
            :disabled="isSubmitDisabled || isLoading"
          >
            <span v-if="isLoading">Loading...</span>
            <span v-else>{{ submitButtonText }}</span>
          </base-button>

          <base-button
            @click="switchAuthMode"
            class="text-blue-600 hover:underline py-2.5"
            :disabled="isLoading"
          >
            {{ toggleButtonText }}
          </base-button>
        </div>
      </form>
    </base-card>
  </the-layout>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isLogin: true,
      emailTouched: false,
      passwordTouched: false,
      error: null,
      isLoading: false,
    };
  },
  computed: {
    headerText() {
      return this.isLogin ? "Login" : "Sign Up";
    },
    toggleButtonText() {
      return this.isLogin ? "Sign Up Instead" : "Login Instead";
    },
    submitButtonText() {
      return this.isLogin ? "Login" : "Sign Up";
    },
    emailError() {
      if (!this.emailTouched) return null;
      if (!this.email) return "Email is required";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email) ? null : "Invalid email address";
    },
    passwordError() {
      if (!this.passwordTouched) return null;
      if (!this.password) return "Password is required";
      return this.password.length >= 6
        ? null
        : "Password must be at least 6 characters long";
    },
    isSubmitDisabled() {
      return !!this.emailError || !!this.passwordError;
    },
  },
  methods: {
    switchAuthMode() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    validateField(field) {
      if (field === "email") this.emailTouched = true;
      if (field === "password") this.passwordTouched = true;
    },
    async onSubmit() {
      this.emailTouched = true;
      this.passwordTouched = true;
      this.error = null;

      if (this.isSubmitDisabled || this.isLoading) return;

      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.isLogin) {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }

        this.$router.replace("/coaches");
      } catch (error) {
        this.error = error.message || "An unexpected error occurred.";
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.emailTouched = false;
      this.passwordTouched = false;
    },
  },
};
</script>
