<template>
  <base-card class="p-6 bg-white shadow-md rounded-lg">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Name Filter -->
      <div>
        <base-input
          type="text"
          name="name"
          id="name"
          placeholder="Enter coach name"
          v-model="name"
        >
          <template #label>
            <span class="text-gray-700 font-medium">Name</span>
          </template>
        </base-input>
      </div>

      <!-- Area Filter -->
      <div>
        <label for="area" class="block text-sm font-medium text-gray-700">
          Areas
        </label>
        <select
          id="area"
          name="area"
          v-model="areas"
          class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm"
        >
          <option value="" selected>Show all</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Database">Database</option>
          <option value="Mobile">Mobile</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>

      <!-- Min Hourly Rate Filter -->
      <div>
        <base-input
          type="number"
          name="minHourlyRate"
          id="minHourlyRate"
          placeholder="Min Hourly Rate"
          v-model="minHourlyRate"
          class="focus:ring-indigo-500 focus:border-indigo-500"
        >
          <template #label>
            <span class="text-gray-700 font-medium">Min Hourly Rate</span>
          </template>
        </base-input>
      </div>

      <!-- Max Hourly Rate Filter -->
      <div>
        <base-input
          type="number"
          name="maxHourlyRate"
          id="maxHourlyRate"
          placeholder="Max Hourly Rate"
          v-model="maxHourlyRate"
          class="focus:ring-indigo-500 focus:border-indigo-500"
        >
          <template #label>
            <span class="text-gray-700 font-medium">Max Hourly Rate</span>
          </template>
        </base-input>
      </div>

      <div class="flex items-start">
        <a
          href="#"
          @click.prevent="$emit('refresh-click')"
          class="text-sm text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
        >
          <i class="fa fa-refresh mr-1"></i>
          Refresh Coaches
        </a>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      areas: "",
      minHourlyRate: "",
      maxHourlyRate: "",
    };
  },
  watch: {
    name() {
      this.setFilter();
    },
    areas() {
      this.setFilter();
    },
    minHourlyRate() {
      this.setFilter();
    },
    maxHourlyRate() {
      this.setFilter();
    },
  },
  methods: {
    setFilter() {
      this.$emit("set-filter", {
        name: this.name,
        areas: this.areas,
        minHourlyRate: this.minHourlyRate,
        maxHourlyRate: this.maxHourlyRate,
      });
    },
  },
};
</script>
