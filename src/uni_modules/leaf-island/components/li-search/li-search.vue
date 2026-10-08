<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SearchProps } from './types';

const props = withDefaults(defineProps<SearchProps>(), {
  modelValue: undefined,
  placeholder: '请输入关键词',
  buttonText: '搜索',
  clearable: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search', value: string): void;
  (e: 'clear'): void;
}>();

defineSlots<{
  history?: (scope: { value: string; search: (keyword?: string) => void; clear: () => void }) => unknown;
}>();

const internalValue = ref('');
const value = computed(() => props.modelValue ?? internalValue.value);
const showClear = computed(() => props.clearable && !!value.value && !props.disabled);

function updateValue(next: string) {
  internalValue.value = next;
  emit('update:modelValue', next);
}

function handleInput(event: Event) {
  const mpValue = (event as unknown as { detail?: { value?: string } }).detail?.value;
  const h5Value = (event.target as HTMLInputElement | null)?.value;
  updateValue(mpValue ?? h5Value ?? '');
}

function search(keyword?: string) {
  if (props.disabled) return;
  if (keyword !== undefined) updateValue(keyword);
  emit('search', keyword ?? value.value);
}

function clear() {
  if (props.disabled) return;
  updateValue('');
  emit('clear');
}
</script>

<template>
  <view class="li-search" :class="{ 'li-search--disabled': disabled }">
    <view class="li-search__bar">
      <view class="li-search__icon" aria-hidden="true" />
      <input
        class="li-search__input"
        type="text"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        confirm-type="search"
        @input="handleInput"
        @confirm="search()"
      />
      <text v-if="showClear" class="li-search__clear" role="button" @click="clear">×</text>
      <button class="li-search__button" :disabled="disabled" @click="search()">{{ buttonText }}</button>
    </view>
    <view v-if="$slots.history" class="li-search__history">
      <slot name="history" :value="value" :search="search" :clear="clear" />
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-search {
  width: 100%;
  &__bar {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: @height-base;
    padding: 6px 8px 6px 18px;
    border: 2px solid @shadow-soft-hover;
    border-radius: 42px;
    background: @bg-color-input;
    transition: border-color @motion-duration-base @motion-ease, box-shadow @motion-duration-base @motion-ease;
    &:focus-within {
      border-color: @primary-color-active;
      box-shadow: 0 0 0 3px var(--animal-primary-color-14, rgba(25, 200, 185, 0.14));
    }
  }
  &__icon {
    position: relative;
    flex: 0 0 15px;
    width: 15px;
    height: 15px;
    border: 2px solid @warm-color-soft;
    border-radius: 50%;
    &::after {
      position: absolute;
      right: -5px;
      bottom: -3px;
      width: 7px;
      height: 2px;
      border-radius: 2px;
      background: @warm-color-soft;
      content: '';
      transform: rotate(45deg);
      transform-origin: left center;
    }
  }
  &__input {
    flex: 1;
    min-width: 0;
    height: 40px;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: @warm-color-soft;
    font-family: @font-family;
    font-size: @font-size-base;
    line-height: 1.4;
    &::placeholder { color: @text-color-disabled; }
  }
  &__clear {
    display: flex;
    flex: 0 0 22px;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--animal-warm-color-soft-12, rgba(114, 93, 66, 0.12));
    color: @warm-color-soft;
    font-size: 18px;
    line-height: 1;
    text-align: center;
  }
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 68px;
    height: 42px;
    margin: 0;
    padding: 0 16px;
    border: 0;
    border-radius: 30px;
    background: @primary-color;
    box-shadow: 0 3px 0 @primary-color-active;
    color: var(--animal-surface-color, #fffdf7);
    font-family: @font-family;
    font-size: @font-size-sm;
    line-height: 1;
    white-space: nowrap;
    &::after { border: 0; }
    &:active { box-shadow: 0 1px 0 @primary-color-active; transform: translateY(2px); }
    &:disabled { opacity: 0.55; }
  }
  &__history { margin-top: 12px; }
  &--disabled { opacity: 0.58; }
}
</style>
