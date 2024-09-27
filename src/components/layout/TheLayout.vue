<template>
  <div class="min-h-full">
    <the-nav></the-nav>
    <the-header>
      <slot name="header"></slot>
    </the-header>

    <main>
      <div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import TheNav from "./TheNav.vue";
import TheHeader from "./TheHeader.vue";

export default {
  components: { TheNav, TheHeader },
};
</script>
