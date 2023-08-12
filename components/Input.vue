<script setup lang="ts">
const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({
  focus: () => inputRef.value?.focus()
})

type Props = {
  placeholder?: string,
  type?: string,
  errorMsg?: string,
  modelValue?: string
}

withDefaults(defineProps<Props>(), {
  type: "text"
})

defineEmits<{
  (event: 'update:modelValue', payload: string): void;
}>()

</script>

<template>

      <input
        ref="inputRef"
        v-bind = $attrs
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder = "placeholder"
        :type="type"
        class="p-3 bg-slate-700 rounded-sm text-white w-full placeholder:text-gray-500"
        />

      <p class="text-red-600 text-left w-full" v-if="errorMsg">{{ errorMsg }}</p>
    
</template>