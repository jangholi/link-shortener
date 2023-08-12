<script setup lang="ts">
defineProps({
   message: String,
   visible: Boolean
})
</script>

<template>
    <Transition>
        <div v-if="visible" id="toast-default" class="absolute top-4 right-0 left-0 mx-auto flex w-full max-w-xs p-4 text-white bg-red-500 rounded-lg shadow" role="alert">
            <div class="ml-3 text-sm font-normal">{{message}}</div>
            <button type="button" class="ml-auto bg-red-500 text-white" data-dismiss-target="#toast-default" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>