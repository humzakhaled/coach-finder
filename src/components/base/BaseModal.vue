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
              class="flex items-center justify-between p-3 md:p-3 border-b rounded-t bg-gray-200"
            >
              <h3 class="text-xl font-semibold text-gray-900">
                <slot name="header"></slot>
              </h3>

              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                @click="$emit('okay')"
                data-modal-hide="default-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="py-4 md:p-5 space-y-2">
              <slot></slot>
            </div>
            <!-- Modal footer -->
            <div
              class="flex items-center p-2 md:p-2 border-t border-gray-200 rounded-b"
            >
              <button
                data-modal-hide="default-modal"
                @click="$emit('okay')"
                type="button"
                class="py-2 px-5 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg"
              >
                Okay
              </button>
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

