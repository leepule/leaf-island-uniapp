<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { LoadingProps } from './types';

const props = withDefaults(defineProps<LoadingProps>(), {
  active: true,
  text: '',
  color: '#19c8b9',
  size: 24,
});

const visible = ref(props.active);
const leaving = ref(false);
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const spinnerSize = computed(() => {
  const s = props.size;
  return typeof s === 'number' ? `${s}px` : s;
});

const spinnerStyle = computed(() => ({
  width: spinnerSize.value,
  height: spinnerSize.value,
  borderColor: 'rgba(0,0,0,0.08)',
  borderTopColor: props.color,
  borderLeftColor: props.color,
}));

watch(
  () => props.active,
  (active) => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    if (active) {
      visible.value = true;
      leaving.value = false;
    } else {
      leaving.value = true;
      hideTimer = setTimeout(() => {
        visible.value = false;
        leaving.value = false;
      }, 280);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
});
</script>

<template>
  <view class="animal-loading" :class="{ 'is-visible': visible, 'is-leaving': leaving }">
    <view class="animal-loading__spinner" :style="spinnerStyle" />
    <text v-if="text || $slots.default" class="animal-loading__text" :style="{ color: color }">
      <slot>{{ text }}</slot>
    </text>
  </view>
</template>

<style lang="less" scoped>
.animal-loading {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transform: scale(1.1);
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;

  &.is-visible {
    display: flex;
  }
  &.is-visible:not(.is-leaving) {
    opacity: 1;
    transform: scale(1);
  }
  &.is-leaving {
    opacity: 0;
    transform: scale(1.1);
  }

  &__spinner {
    box-sizing: border-box;
    border-style: solid;
    border-width: 3px;
    border-radius: 50%;
    animation: ai-loading-rotate 0.9s linear infinite;
  }

  &__text {
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
  }
}

@keyframes ai-loading-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animal-loading__spinner {
    animation: none !important;
  }
}
</style>
