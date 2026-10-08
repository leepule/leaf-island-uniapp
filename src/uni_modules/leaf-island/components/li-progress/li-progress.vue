<script setup lang="ts">
import { computed } from 'vue';
import type { ProgressProps } from './types';

const props = withDefaults(defineProps<ProgressProps>(), {
  percent: 0,
  status: 'normal',
  showInfo: true,
  strokeColor: '',
  indeterminate: false,
});

const normalizedPercent = computed(() => Math.min(100, Math.max(0, Number(props.percent) || 0)));
const fillStyle = computed(() => ({
  width: props.indeterminate ? '35%' : `${normalizedPercent.value}%`,
  ...(props.strokeColor ? { backgroundColor: props.strokeColor } : {}),
}));
</script>

<template>
  <view class="li-progress" :class="[`li-progress--${status}`, { 'li-progress--indeterminate': indeterminate }]" role="progressbar" :aria-valuenow="indeterminate ? undefined : normalizedPercent" aria-valuemin="0" aria-valuemax="100">
    <view class="li-progress__track"><view class="li-progress__fill" :style="fillStyle" /></view>
    <text v-if="showInfo && !indeterminate" class="li-progress__info">{{ Math.round(normalizedPercent) }}%</text>
  </view>
</template>

<style lang="less" scoped>
.li-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  color: #6e604c;
  &__track { position: relative; flex: 1; height: 10px; overflow: hidden; border-radius: 99px; background: #e9e1d1; }
  &__fill { height: 100%; border-radius: inherit; background: #19a995; transition: width 0.25s ease; }
  &__info { min-width: 40px; font-size: 12px; text-align: right; }
  &--success .li-progress__fill { background: #6fba2c; }
  &--exception .li-progress__fill { background: #d95b51; }
  &--indeterminate .li-progress__fill { position: absolute; width: 35%; animation: li-progress-run 1.2s ease-in-out infinite; }
}
@keyframes li-progress-run { from { left: -35%; } to { left: 100%; } }
</style>
