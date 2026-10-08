<script setup lang="ts">
import { computed } from 'vue';
import type { DrawerProps } from './types';

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  placement: 'right',
  title: '',
  size: '80vw',
  maskClosable: true,
});
const emit = defineEmits<{ (e: 'update:open', value: boolean): void; (e: 'close'): void }>();
const panelStyle = computed(() => {
  const value = typeof props.size === 'number' ? `${props.size}px` : props.size;
  return props.placement === 'bottom' ? { height: value } : { width: value };
});
function close() {
  emit('update:open', false);
  emit('close');
}
</script>

<template>
  <view v-if="open" class="li-drawer" :class="`li-drawer--${placement}`">
    <view class="li-drawer__mask" @click="maskClosable && close()" />
    <view class="li-drawer__panel" :style="panelStyle" @click.stop>
      <view v-if="title || $slots.title" class="li-drawer__header">
        <slot name="title">{{ title }}</slot>
        <text class="li-drawer__close" @click="close">×</text>
      </view>
      <scroll-view class="li-drawer__body" scroll-y><slot /></scroll-view>
      <view v-if="$slots.footer" class="li-drawer__footer"><slot name="footer" /></view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.li-drawer { position: fixed; z-index: 1100; top: 0; right: 0; bottom: 0; left: 0; }
.li-drawer__mask { position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: rgba(35, 31, 25, .38); }
.li-drawer__panel { position: absolute; display: flex; flex-direction: column; max-width: 100vw; max-height: 100vh; background: var(--animal-surface-color, #fffdf7); color: var(--animal-text-color, #594a37); box-shadow: 0 0 30px rgba(61, 52, 40, .2); }
.li-drawer--right .li-drawer__panel { top: 0; right: 0; bottom: 0; }
.li-drawer--left .li-drawer__panel { top: 0; bottom: 0; left: 0; }
.li-drawer--bottom .li-drawer__panel { right: 0; bottom: 0; left: 0; width: 100%; border-radius: 24px 24px 0 0; }
.li-drawer__header { display: flex; align-items: center; justify-content: space-between; padding: 18px 22px; border-bottom: 1px solid var(--animal-border-color-light, #e8e0d2); font-weight: 800; }
.li-drawer__close { padding: 0 4px; font-size: 24px; }
.li-drawer__body { flex: 1; min-height: 0; padding: 20px; }
.li-drawer__footer { padding: 16px 20px; border-top: 1px solid var(--animal-border-color-light, #e8e0d2); }
</style>
