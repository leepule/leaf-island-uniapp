<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';
import type { ToastProps } from './types';

const props = withDefaults(defineProps<ToastProps>(), {
  show: false,
  message: '',
  type: 'info',
  duration: 2400,
  position: 'top',
});

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
  (e: 'close'): void;
}>();

let timer: ReturnType<typeof setTimeout> | undefined;

function close() {
  emit('update:show', false);
  emit('close');
}

watch(
  () => [props.show, props.duration] as const,
  ([show, duration]) => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    if (show && duration > 0) timer = setTimeout(close, duration);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <view v-if="show" class="li-toast" :class="[`li-toast--${type}`, `li-toast--${position}`]" role="status">
    <text class="li-toast__mark" aria-hidden="true">{{ type === 'success' ? '✓' : type === 'error' ? '!' : type === 'warning' ? '!' : 'i' }}</text>
    <text class="li-toast__message">{{ message }}<slot /></text>
  </view>
</template>

<style lang="less" scoped>
.li-toast {
  position: fixed;
  left: 50%;
  z-index: 1200;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: calc(100vw - 40px);
  padding: 12px 18px;
  border: 2px solid #d9cfba;
  border-radius: 18px;
  background: var(--animal-surface-color, #fffdf7);
  color: var(--animal-text-color, #594a37);
  box-shadow: 0 8px 28px rgba(61, 52, 40, 0.18);
  transform: translateX(-50%);
  animation: li-toast-in 0.18s ease-out;

  &--top { top: calc(env(safe-area-inset-top, 0px) + 18px); }
  &--center { top: 50%; transform: translate(-50%, -50%); }
  &--bottom { bottom: calc(env(safe-area-inset-bottom, 0px) + 18px); }
  &--success .li-toast__mark { background: #6fba2c; }
  &--error .li-toast__mark { background: #d95b51; }
  &--warning .li-toast__mark { background: #d6a818; }
  &--info .li-toast__mark { background: var(--animal-primary-color, #2e9f91); }

  &__mark {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: white;
    font-weight: 800;
  }

  &__message { line-height: 1.45; }
}

@keyframes li-toast-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
