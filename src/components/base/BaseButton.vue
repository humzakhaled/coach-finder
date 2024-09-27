
<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :to="link ? to : null"
    :type="link ? null : type"
    :class="computedClasses"
    class="items-center text-xs px-3 py-1 rounded-md border border-gray-100 font-semibold text-black-600"
    :disabled="disabled"
    @click="handleClick"
  >
    <i v-if="icon" :class="icon + ' mr-1'"></i>
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    type: {
      type: String,
      default: "button",
    },
    icon: {
      type: String,
      default: null,
    },
    class: {
      type: [String, Object, Array],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      return this.class + (this.link ? "" : " cursor-pointer");
    },
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
</style>
