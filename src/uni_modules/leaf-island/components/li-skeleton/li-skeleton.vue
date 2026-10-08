<script setup lang="ts">
import { computed } from 'vue';
import type { SkeletonProps } from './types';

const props = withDefaults(defineProps<SkeletonProps>(), { active: true, rows: 3, avatar: false, title: true });
const lines = computed(() => Array.from({ length: Math.max(1, Math.min(10, Math.floor(props.rows))) }, (_, index) => index));
</script>

<template>
  <view v-if="active" class="li-skeleton" aria-hidden="true">
    <view v-if="avatar" class="li-skeleton__avatar" />
    <view class="li-skeleton__content">
      <view v-if="title" class="li-skeleton__line li-skeleton__line--title" />
      <view v-for="line in lines" :key="line" class="li-skeleton__line" :class="{ 'li-skeleton__line--short': line === lines.length - 1 }" />
    </view>
  </view>
  <slot v-else />
</template>

<style lang="less" scoped>
.li-skeleton { display: flex; align-items: flex-start; gap: 14px; width: 100%; }
.li-skeleton__content { display: flex; flex: 1; flex-direction: column; gap: 12px; padding-top: 4px; }
.li-skeleton__line, .li-skeleton__avatar { border-radius: 99px; background: linear-gradient(90deg, var(--animal-bg-color-secondary, #eee7d8) 20%, #f8f4eb 40%, var(--animal-bg-color-secondary, #eee7d8) 60%); background-size: 300% 100%; animation: li-skeleton-wave 1.4s ease infinite; }
.li-skeleton__line { width: 100%; height: 12px; }
.li-skeleton__line--title { width: 45%; height: 16px; margin-bottom: 4px; }
.li-skeleton__line--short { width: 68%; }
.li-skeleton__avatar { flex: 0 0 48px; width: 48px; height: 48px; }
@keyframes li-skeleton-wave { from { background-position: 100% 0; } to { background-position: 0 0; } }
</style>
