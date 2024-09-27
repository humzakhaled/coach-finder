<template>
  <base-card class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name Section -->
      <div class="flex flex-col sm:flex-row sm:space-x-6">
        <!-- First Name -->
        <div class="flex-1">
          <base-input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            v-model.trim="firstName"
            @input="validateFirstName"
            :class="{ 'border-red-500': errors.firstName }"
          >
            <template #label>
              First Name<small class="text-red-500">*</small>
            </template>
          </base-input>
          <p v-if="errors.firstName" class="text-red-500 text-sm">
            {{ errors.firstName }}
          </p>
        </div>

        <!-- Last Name -->
        <div class="flex-1">
          <base-input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            v-model.trim="lastName"
            @input="validateLastName"
            :class="{ 'border-red-500': errors.lastName }"
          >
            <template #label>
              Last Name<small class="text-red-500">*</small>
            </template>
          </base-input>
          <p v-if="errors.lastName" class="text-red-500 text-sm">
            {{ errors.lastName }}
          </p>
        </div>
      </div>

      <!-- Hourly Rate -->
      <div>
        <base-input
          type="number"
          name="hourlyRate"
          id="hourlyRate"
          placeholder="Enter hourly rate"
          v-model="hourlyRate"
          @input="validateHourlyRate"
          :class="{ 'border-red-500': errors.hourlyRate }"
        >
          <template #label>
            Hourly Rate<small class="text-red-500">*</small>
          </template>
        </base-input>
        <p v-if="errors.hourlyRate" class="text-red-500 text-sm">
          {{ errors.hourlyRate }}
        </p>
      </div>

      <!-- Areas of Expertise -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Areas of Expertise<small class="text-red-500">*</small>
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
          <div
            v-for="(area, index) in areasOptions"
            :key="index"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :id="'area-' + area"
              :value="area"
              v-model="areas"
              @change="validateAreas"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              :for="'area-' + area"
              class="ml-2 block text-sm font-medium text-gray-700"
            >
              {{ area }}
            </label>
          </div>
        </div>
        <p v-if="errors.areas" class="text-red-500 text-sm">
          {{ errors.areas }}
        </p>
      </div>

      <!-- Description -->
      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700"
        >
          Description<small class="text-red-500">*</small>
        </label>
        <textarea
          id="description"
          rows="4"
          v-model.trim="description"
          @input="validateDescription"
          :class="{ 'border-red-500': errors.description }"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Write about yourself..."
        ></textarea>
        <p v-if="errors.description" class="text-red-500 text-sm">
          {{ errors.description }}
        </p>
      </div>

      <div>
        <base-button
          type="submit"
          class="bg-indigo-600 hover:bg-indigo-700 py-2.5 text-white"
          :disabled="isLoading"
        >
          {{ isLoading ? "Registering.." : "Register as a Coach" }}
        </base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ["save-data"],

  data() {
    return {
      firstName: "",
      lastName: "",
      hourlyRate: 0,
      description: "",
      areas: [],
      areasOptions: [
        "Frontend",
        "Backend",
        "UI/UX",
        "Database",
        "Mobile",
        "DevOps",
      ],
      errors: {},
      isLoading: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.validateForm()) {
        this.isLoading = true;
        let formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          hourlyRate: this.hourlyRate,
          description: this.description,
          areas: this.areas,
        };

        this.$emit("save-data", formData);
      }
    },

    validateForm() {
      this.errors = {};
      this.validateFirstName();
      this.validateLastName();
      this.validateHourlyRate();
      this.validateDescription();
      this.validateAreas();

      return Object.keys(this.errors).length === 0;
    },

    validateFirstName() {
      if (!this.firstName) {
        this.errors.firstName = "First name is required.";
      } else {
        delete this.errors.firstName;
      }
    },

    validateLastName() {
      if (!this.lastName) {
        this.errors.lastName = "Last name is required.";
      } else {
        delete this.errors.lastName;
      }
    },

    validateHourlyRate() {
      if (!this.hourlyRate || this.hourlyRate <= 0) {
        this.errors.hourlyRate = "Hourly rate must be a positive number.";
      } else {
        delete this.errors.hourlyRate;
      }
    },

    validateDescription() {
      if (!this.description) {
        this.errors.description = "Description is required.";
      } else {
        delete this.errors.description;
      }
    },

    validateAreas() {
      if (this.areas.length === 0) {
        this.errors.areas = "At least one area of expertise must be selected.";
      } else {
        delete this.errors.areas;
      }
    },
  },
};
</script>

