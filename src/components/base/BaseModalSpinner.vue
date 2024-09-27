<template>
  <teleport to="body">
    <transition name="dialogue">
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-200"
            >
              <h3 class="text-xl font-semibold text-gray-900">
                Please wait...
              </h3>
            </div>
            <!-- Modal body -->
            <div class="py-4 md:p-5 space-y-2">
              <base-spinner></base-spinner>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {};
</script>

