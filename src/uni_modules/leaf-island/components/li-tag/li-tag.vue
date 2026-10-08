<script setup lang="ts">
import { ref } from 'vue';
import { useControlled } from '../../composables/useControlled';
import type { TagProps } from './types';

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'middle',
  closable: false,
  checkable: false,
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
  (e: 'close', event: Event): void;
}>();

const visible = ref(true);
const { value: checked, setValue: setChecked } = useControlled(
  () => props.modelValue,
  props.defaultChecked,
  (value) => emit('update:modelValue', value),
);

function toggle() {
  if (!props.checkable || props.disabled) return;
  const next = !checked.value;
  setChecked(next);
  emit('change', next);
}

function handleKeydown(event: KeyboardEvent) {
  if (!props.checkable || (event.key !== ' ' && event.key !== 'Enter')) return;
  event.preventDefault();
  toggle();
}

function close(event: Event) {
  event.stopPropagation();
  if (props.disabled) return;
  visible.value = false;
  emit('close', event);
}

function handleCloseKeydown(event: KeyboardEvent) {
  if (event.key !== ' ' && event.key !== 'Enter') return;
  event.preventDefault();
  close(event);
}
</script>

<template>
  <view
    v-if="visible"
    class="li-tag"
    :class="[
      `li-tag--${type}`,
      `li-tag--${size}`,
      {
        'li-tag--checkable': checkable,
        'li-tag--checked': checkable && checked,
        'li-tag--closable': closable,
        'li-tag--disabled': disabled,
      },
    ]"
    :role="checkable ? 'checkbox' : undefined"
    :aria-checked="checkable ? checked : undefined"
    :aria-disabled="disabled"
    :tabindex="checkable && !disabled ? 0 : undefined"
    @click="toggle"
    @keydown="handleKeydown"
  >
    <slot />
    <view
      v-if="closable"
      class="li-tag__close"
      role="button"
      aria-label="关闭标签"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      @click.stop="close"
      @keydown.stop="handleCloseKeydown"
    ><view class="li-tag__close-icon" aria-hidden="true" /></view>
  </view>
</template>

<style lang="less" scoped>
.li-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 7px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  transition: background-color .18s ease, border-color .18s ease, color .18s ease, transform .18s ease;

  &--small { height: 24px; padding: 0 7px; font-size: 11px; }
  &--middle { height: 28px; padding: 0 9px; font-size: 12px; }
  &--large { height: 36px; padding: 0 11px; font-size: 14px; }
  &--closable { position: relative; padding-right: 29px; }
  &--small.li-tag--closable { padding-right: 25px; }
  &--large.li-tag--closable { padding-right: 31px; }

  &--default { border-color: var(--animal-border-color-light, #e8e2d6); background: var(--animal-bg-color, #f8f8f0); color: var(--animal-text-color-secondary, #8b7b66); }
  &--primary { border-color: var(--animal-primary-color-light, #bfece5); background: var(--animal-primary-color-bg, #e6f9f6); color: var(--animal-primary-color-active, #138d82); }
  &--success { border-color: #c8e8bd; background: #eff9e9; color: #548d32; }
  &--warning { border-color: #f2dfae; background: #fff8e3; color: #a8791e; }
  &--danger { border-color: #f0c7c1; background: #fff0ed; color: #bd5147; }
  &--info { border-color: #cbdced; background: #eef5fb; color: #52769a; }

  &--checkable:not(.li-tag--disabled) { cursor: pointer; user-select: none; }
  &--checked { box-shadow: inset 0 0 0 1px currentColor; }
  &--checkable:not(.li-tag--disabled):active { transform: scale(.97); }
  &--disabled { opacity: .5; cursor: not-allowed; }

  &__close {
    position: absolute;
    top: 50%;
    right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    margin: 0;
    border-radius: 3px;
    cursor: pointer;
    transform: translateY(-50%);
    transition: background-color .16s ease, transform .16s ease;
  }
  &__close:hover { background: rgba(0, 0, 0, .06); }
  &__close:active { background: rgba(0, 0, 0, .12); transform: translateY(-50%) scale(.92); }
  &__close:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  &__close-icon { position: absolute; top: 50%; left: 50%; width: 8px; height: 8px; transform: translate(-50%, -50%); }
  &__close-icon::before, &__close-icon::after { position: absolute; top: 50%; left: 0; width: 8px; height: 1.5px; border-radius: 2px; background: currentColor; content: ''; }
  &__close-icon::before { transform: translateY(-50%) rotate(45deg); }
  &__close-icon::after { transform: translateY(-50%) rotate(-45deg); }
  &--small .li-tag__close { flex-basis: 14px; width: 14px; height: 14px; right: 6px; }
  &--disabled .li-tag__close { cursor: not-allowed; }
}
</style>
