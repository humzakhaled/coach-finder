<template>
  <router-view> </router-view>
</template>

<script>
export default {
  computed: {
    autoLogout() {
      return this.$store.getters.autoLogout;
    },
  },
  watch: {
    // When the user is automatically logged out,
    // this watcher checks if the "autoLogout" value changes.
    // If a logout is triggered (currVal becomes true and differs from oldVal),
    // it redirects the user away from protected pages to the "/coaches" route.
    autoLogout(currVal, oldVal) {
      if (currVal && currVal != oldVal) {
        this.$router.replace("/coaches");
      }
    },
  },
  created() {
    this.$store.dispatch("tryLogIn");
  },
};
</script>

<style>
/* .route-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.route-enter-active {
  transition: all 0.5s ease-out;
}

.route-leave-active {
  transition: all 0.5s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
} */
</style>