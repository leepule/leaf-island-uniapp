<script setup lang="ts">
import { computed } from 'vue';
import type { StepStatus, StepsProps } from './types';

const props = withDefaults(defineProps<StepsProps>(), {
  current: 0,
  direction: 'horizontal',
  status: 'process',
});

const stepItems = computed(() => {
  const current = Math.max(0, Math.min(props.steps.length, Math.trunc(props.current)));
  return props.steps.map((step, index) => {
    const status: StepStatus = step.status ?? (index < current ? 'finish' : index === current ? props.status : 'wait');
    return { ...step, status, marker: status === 'finish' ? '✓' : status === 'error' ? '!' : String(index + 1), connectorDone: status === 'finish' };
  });
});
</script>

<template>
  <view class="li-steps" :class="`li-steps--${direction}`">
    <view v-for="(step, index) in stepItems" :key="`${index}-${step.title}`" class="li-steps__step">
      <view class="li-steps__head">
        <view class="li-steps__node" :class="`li-steps__node--${step.status}`">{{ step.marker }}</view>
        <view v-if="index < stepItems.length - 1" class="li-steps__line" :class="{ 'li-steps__line--done': step.connectorDone }" />
      </view>
      <view class="li-steps__body">
        <text class="li-steps__title" :class="`li-steps__title--${step.status}`">{{ step.title }}</text>
        <text v-if="step.description" class="li-steps__description">{{ step.description }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-steps {
  display: flex;
  width: 100%;
  color: @warm-color-soft;
  &--horizontal { flex-direction: row; }
  &--vertical { flex-direction: column; }
  &__step { position: relative; min-width: 0; }
  &--horizontal &__step { display: flex; flex: 1; flex-direction: column; align-items: stretch; }
  &--vertical &__step { display: flex; gap: 12px; padding-bottom: 20px; }
  &--vertical &__step:last-child { padding-bottom: 0; }
  &__head { position: relative; display: flex; align-items: center; justify-content: center; height: 30px; }
  &--vertical &__head { flex: 0 0 28px; align-items: flex-start; justify-content: flex-start; height: auto; }
  &__node {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 28px;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 2px solid @shadow-soft;
    border-radius: 50%;
    background: @cream-color;
    color: @text-color-secondary;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
    box-sizing: border-box;
    &--process { border-color: @primary-color-active; background: @primary-color-active; color: #fff; box-shadow: 0 2px 0 var(--animal-primary-color-active-35, rgba(80, 185, 171, 0.35)); }
    &--finish { border-color: @success-color; background: @success-color; color: #fff; }
    &--error { border-color: @error-color; background: @error-color; color: #fff; }
  }
  &__line { position: absolute; z-index: 0; height: 2px; background: @border-color-light; }
  &--horizontal &__line { top: 14px; right: calc(-50% + 14px); left: calc(50% + 14px); }
  &--vertical &__line { top: 28px; bottom: -20px; left: 13px; width: 2px; height: auto; }
  &__line--done { background: @success-color; }
  &__body { min-width: 0; }
  &--horizontal &__body { padding: 8px 8px 0; text-align: center; }
  &--vertical &__body { display: flex; flex: 1; flex-direction: column; gap: 4px; padding-top: 2px; }
  &__title { display: block; color: @text-color-secondary; font-size: @font-size-sm; font-weight: 600; line-height: 1.4; }
  &__title--process { color: @warm-color; }
  &__title--finish { color: @warm-color-soft; }
  &__title--error { color: @error-color; }
  &__description { display: block; color: @text-color-secondary; font-size: 12px; line-height: 1.45; }
}
</style>
