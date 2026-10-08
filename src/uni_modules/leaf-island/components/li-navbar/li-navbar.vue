<script setup lang="ts">
import { computed } from 'vue';
import type { NavbarProps } from './types';

const props = withDefaults(defineProps<NavbarProps>(), {
  title: '',
  showBack: false,
  backText: '返回',
  fixed: false,
  bordered: true,
  shadow: false,
  safeArea: true,
  autoBack: false,
});

const emit = defineEmits<{ (e: 'back', event: any): void }>();
const customStyle = computed(() => ({
  ...(props.background ? { background: props.background } : {}),
  ...(props.color ? { color: props.color } : {}),
}));

function handleBack(event: any) {
  emit('back', event);
  if (!props.autoBack) return;
  uni.navigateBack({
    fail: (error) => console.warn('[li-navbar] 返回失败，请监听 back 事件处理降级导航', error),
  });
}
</script>

<template>
  <view v-if="fixed" class="li-navbar__placeholder" :class="{ 'li-navbar__placeholder--safe': safeArea }" />
  <view
    class="li-navbar"
    :class="{
      'li-navbar--fixed': fixed,
      'li-navbar--bordered': bordered,
      'li-navbar--shadow': shadow,
      'li-navbar--safe': safeArea,
    }"
    :style="customStyle"
  >
    <view class="li-navbar__side li-navbar__side--left">
      <slot name="left">
        <view v-if="showBack" class="li-navbar__back" role="button" :aria-label="backText" @click="handleBack">
          <text class="li-navbar__back-icon">‹</text>
          <text v-if="backText">{{ backText }}</text>
        </view>
      </slot>
    </view>
    <view class="li-navbar__title" :title="title"><slot>{{ title }}</slot></view>
    <view class="li-navbar__side li-navbar__side--right"><slot name="right" /></view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-navbar {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 88rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  background: @bg-color;
  color: @text-color;
  font-family: @font-family;

  &--fixed { position: fixed; top: 0; right: 0; left: 0; }
  &--safe { padding-top: env(safe-area-inset-top, 0px); }
  &--bordered { border-bottom: 1px solid @border-color-light; }
  &--shadow { box-shadow: @shadow-sm; }

  &__placeholder { height: 88rpx; }
  &__placeholder--safe { height: calc(88rpx + env(safe-area-inset-top, 0px)); }
  &__side { display: flex; align-items: center; flex: 1 1 0; min-width: 0; }
  &__side--right { justify-content: flex-end; }
  &__title { flex: 0 1 auto; max-width: 55%; overflow: hidden; color: inherit; font-size: @font-size-lg; font-weight: 700; text-align: center; text-overflow: ellipsis; white-space: nowrap; }
  &__back { display: inline-flex; align-items: center; gap: 4rpx; min-height: 72rpx; color: @primary-color; font-size: @font-size-base; cursor: pointer; }
  &__back-icon { font-family: sans-serif; font-size: 52rpx; font-weight: 300; line-height: 0.8; }
}
</style>
