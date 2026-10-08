<script setup lang="ts">
import { computed } from 'vue';
import { useControlled } from '../../composables/useControlled';
import type { PaginationProps } from './types';

const props = withDefaults(defineProps<PaginationProps>(), { modelValue: undefined, pageSize: 10, disabled: false });
const emit = defineEmits<{ (e: 'update:modelValue', page: number): void; (e: 'change', page: number): void }>();
const pages = computed(() => Math.max(1, Math.ceil(Math.max(0, props.total) / Math.max(1, props.pageSize))));
const { value: current, setValue } = useControlled(() => props.modelValue, 1, (page) => emit('update:modelValue', page));
const safeCurrent = computed(() => Math.min(pages.value, Math.max(1, current.value)));
const visiblePages = computed(() => {
  const start = Math.max(1, Math.min(safeCurrent.value - 2, pages.value - 4));
  return Array.from({ length: Math.min(5, pages.value) }, (_, index) => start + index);
});
function go(page: number) {
  if (props.disabled || page < 1 || page > pages.value || page === safeCurrent.value) return;
  setValue(page);
  emit('change', page);
}
</script>

<template>
  <view class="li-pagination" :class="{ 'li-pagination--disabled': disabled }" role="navigation" aria-label="分页">
    <button type="button" :disabled="disabled || safeCurrent <= 1" aria-label="上一页" @click="go(safeCurrent - 1)">‹</button>
    <button v-for="page in visiblePages" :key="page" type="button" :disabled="disabled" :aria-current="page === safeCurrent ? 'page' : undefined" :class="{ 'is-current': page === safeCurrent }" @click="go(page)">{{ page }}</button>
    <button type="button" :disabled="disabled || safeCurrent >= pages" aria-label="下一页" @click="go(safeCurrent + 1)">›</button>
    <text class="li-pagination__total">共 {{ total }} 条</text>
  </view>
</template>

<style lang="less" scoped>
.li-pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: #655540; }
.li-pagination button { display: inline-flex; flex: 0 0 auto; align-items: center; justify-content: center; min-width: 36px; height: 36px; margin: 0; padding: 0 8px; border: 1px solid var(--animal-border-color-light, #dfd5c3); border-radius: 10px; background: var(--animal-surface-color, #fffdf7); color: inherit; font-size: 14px; line-height: 1; transition: border-color .16s ease, background-color .16s ease, color .16s ease; }
.li-pagination button:not(:disabled):hover { border-color: var(--animal-primary-color, #2e9f91); color: var(--animal-primary-color-active, #218f83); }
.li-pagination button.is-current { border-color: var(--animal-primary-color, #2e9f91); background: var(--animal-primary-color, #2e9f91); color: white; }
.li-pagination button:disabled { opacity: .45; }
.li-pagination__total { display: inline-flex; align-items: center; min-height: 36px; margin-left: 4px; color: var(--animal-text-color-secondary, #8b7b66); font-size: 13px; line-height: 1; white-space: nowrap; }
.li-pagination--disabled { opacity: .65; }
</style>
