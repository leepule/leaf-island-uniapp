<script setup lang="ts">
import { useControlled } from '../../composables/useControlled';
import type { NotificationProps } from './types';

const props = withDefaults(defineProps<NotificationProps>(), {
  open: undefined,
  type: 'info',
  title: '',
  description: '',
  closable: false,
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'close'): void;
}>();
const { value: visible, setValue } = useControlled(() => props.open, true, (open) => emit('update:open', open));

function close() {
  setValue(false);
  emit('close');
}
</script>

<template>
  <view v-if="visible" class="li-notification" :class="`li-notification--${type}`" role="status">
    <view class="li-notification__content">
      <text v-if="title" class="li-notification__title">{{ title }}</text>
      <text v-if="description" class="li-notification__description">{{ description }}</text>
      <view v-if="$slots.default" class="li-notification__body"><slot /></view>
    </view>
    <text v-if="closable" class="li-notification__close" role="button" aria-label="关闭" @click="close">×</text>
  </view>
</template>

<style lang="less" scoped>
.li-notification {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 18px 20px;
  border: 2px solid #d8cfba;
  border-left-width: 8px;
  border-radius: 18px;
  background: var(--animal-surface-color, #fffdf7);
  color: #5a4b38;

  &--success { border-left-color: #6fba2c; }
  &--error { border-left-color: #d95b51; }
  &--warning { border-left-color: #d6a818; }
  &--info { border-left-color: var(--animal-primary-color, #2e9f91); }
  &__content { display: flex; flex: 1; flex-direction: column; gap: 4px; min-width: 0; }
  &__title { font-weight: 800; }
  &__description, &__body { color: #806f58; line-height: 1.5; }
  &__close { padding: 0 4px; color: var(--animal-text-color-secondary, #8b7b66); font-size: 22px; }
}
</style>
