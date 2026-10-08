<script setup lang="ts">
import { computed } from 'vue';
import type { BadgeProps } from './types';

const props = withDefaults(defineProps<BadgeProps>(), { count: 0, dot: false, max: 99, showZero: false });
const visible = computed(() => props.dot || props.count > 0 || props.showZero);
const label = computed(() => props.count > props.max ? `${props.max}+` : String(props.count));
</script>

<template>
  <view class="li-badge">
    <slot />
    <text v-if="visible" class="li-badge__mark" :class="{ 'li-badge__mark--dot': dot }">{{ dot ? '' : label }}</text>
  </view>
</template>

<style lang="less" scoped>
.li-badge { position: relative; display: inline-flex; }
.li-badge__mark { position: absolute; top: -9px; right: -12px; display: flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 5px; border: 2px solid var(--animal-surface-color, #fffdf7); border-radius: 99px; background: #d95b51; color: white; font-size: 11px; font-weight: 800; line-height: 1; white-space: nowrap; }
.li-badge__mark--dot { top: -3px; right: -4px; min-width: 10px; width: 10px; height: 10px; padding: 0; }
</style>
