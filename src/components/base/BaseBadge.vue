<template>
  <span :class="badgeClasses">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },

  computed: {
    badgeClasses() {
      const baseClasses =
        "text-white text-xs font-medium px-3 py-1 rounded-full border border-transparent mb-1";
      const colorClasses = this.getTagColor(this.text);
      return `${baseClasses} ${colorClasses}`;
    },
  },

  methods: {
    getTagColor(text) {
      switch (text.toLowerCase()) {
        case "frontend":
          return "bg-green-500 border-green-300 shadow-md";
        case "backend":
          return "bg-blue-500 border-blue-300 shadow-md";
        case "ui/ux":
          return "bg-pink-500 border-pink-300 shadow-md";
        case "mobile":
          return "bg-purple-500 border-purple-300 shadow-md";
        case "database":
          return "bg-yellow-500 border-yellow-300 shadow-md";
        case "devops":
          return "bg-red-500 border-red-300 shadow-md";
        default:
          return "bg-gray-500 border-gray-300 shadow-md";
      }
    },
  },
};
</script>