<script setup lang="ts">
import type { ActionSheetAction, ActionSheetProps } from './types';

const props = withDefaults(defineProps<ActionSheetProps>(), {
  open: false,
  title: '',
  cancelText: '取消',
  maskClosable: true,
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'select', action: ActionSheetAction, index: number): void;
  (e: 'cancel'): void;
  (e: 'close'): void;
}>();

function close(reason: 'cancel' | 'mask') {
  if (reason === 'mask' && !props.maskClosable) return;
  emit('update:open', false);
  emit('close');
  if (reason === 'cancel') emit('cancel');
}

function selectAction(action: ActionSheetAction, index: number) {
  if (action.disabled) return;
  emit('select', action, index);
  emit('update:open', false);
  emit('close');
}
</script>

<template>
  <view v-if="open" class="li-action-sheet">
    <view class="li-action-sheet__mask" @click="close('mask')" />
    <view class="li-action-sheet__panel" @click.stop>
      <view class="li-action-sheet__handle" />
      <view v-if="title" class="li-action-sheet__title">{{ title }}</view>
      <view class="li-action-sheet__actions">
        <button
          v-for="(action, index) in actions"
          :key="`${index}-${action.text}`"
          class="li-action-sheet__action"
          :class="{ 'li-action-sheet__action--danger': action.danger, 'li-action-sheet__action--disabled': action.disabled }"
          :disabled="action.disabled"
          @click="selectAction(action, index)"
        >
          <text class="li-action-sheet__text">{{ action.text }}</text>
          <text v-if="action.description" class="li-action-sheet__description">{{ action.description }}</text>
        </button>
      </view>
      <button class="li-action-sheet__cancel" @click="close('cancel')">{{ cancelText }}</button>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-action-sheet { position: fixed; z-index: 1250; top: 0; right: 0; bottom: 0; left: 0; }
.li-action-sheet__mask { position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: rgba(35, 31, 25, .42); animation: li-action-sheet-fade .18s ease-out; }
.li-action-sheet__panel {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  max-height: 82vh;
  overflow-y: auto;
  padding: 10px 12px calc(12px + env(safe-area-inset-bottom, 0px));
  border: 1px solid @border-color-light;
  border-bottom: 0;
  border-radius: 24px 24px 0 0;
  background: var(--animal-surface-color, #fffdf7);
  box-shadow: 0 -10px 32px rgba(61, 52, 40, .18);
  color: @warm-color-soft;
  animation: li-action-sheet-rise .22s @motion-ease;
}
.li-action-sheet__handle { width: 38px; height: 4px; margin: 2px auto 12px; border-radius: 4px; background: @shadow-soft; }
.li-action-sheet__title { padding: 6px 12px 14px; color: @text-color-secondary; font-size: 13px; text-align: center; }
.li-action-sheet__actions { overflow: hidden; border: 1px solid @border-color-light; border-radius: 16px; background: @cream-color; }
.li-action-sheet__action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 54px;
  margin: 0;
  padding: 10px 16px;
  border: 0;
  border-bottom: 1px solid @border-color-light;
  border-radius: 0;
  background: transparent;
  color: @warm-color-soft;
  font-family: @font-family;
  font-size: @font-size-base;
  line-height: 1.4;
  &::after { border: 0; }
  &:last-child { border-bottom: 0; }
  &:active:not(:disabled) { background: @bg-color-secondary; }
  &--danger { color: @error-color; }
  &--disabled { color: @text-color-disabled; }
}
.li-action-sheet__text { display: block; }
.li-action-sheet__description { display: block; margin-top: 3px; color: @text-color-secondary; font-size: 12px; }
.li-action-sheet__cancel { display: flex; align-items: center; justify-content: center; width: 100%; min-height: 52px; margin: 10px 0 0; padding: 10px; border: 1px solid @border-color-light; border-radius: 16px; background: #f5f0e5; box-shadow: 0 3px 0 @shadow-soft; color: @warm-color; font-family: @font-family; font-size: @font-size-base; line-height: 1.4; }
.li-action-sheet__cancel::after { border: 0; }
@media (min-width: 768px) {
  .li-action-sheet__panel { right: calc(50% - 260px); bottom: 16px; left: calc(50% - 260px); border-bottom: 1px solid @border-color-light; border-radius: 24px; }
}
@keyframes li-action-sheet-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes li-action-sheet-rise { from { opacity: .5; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
</style>
