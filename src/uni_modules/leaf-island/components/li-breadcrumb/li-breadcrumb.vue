<script setup lang="ts">
import type { BreadcrumbItem, BreadcrumbProps } from './types';

withDefaults(defineProps<BreadcrumbProps>(), { separator: '/' });
const emit = defineEmits<{ (e: 'click', item: BreadcrumbItem, index: number): void }>();
defineSlots<{ separator?: () => unknown; item?: (scope: { item: BreadcrumbItem; index: number; current: boolean }) => unknown }>();
</script>

<template>
  <view class="li-breadcrumb" role="navigation" aria-label="面包屑导航">
    <template v-for="(item, index) in items" :key="item.key">
      <view
        class="li-breadcrumb__item"
        :class="{ 'li-breadcrumb__item--current': index === items.length - 1, 'li-breadcrumb__item--disabled': item.disabled }"
        :aria-current="index === items.length - 1 ? 'page' : undefined"
        @click="index < items.length - 1 && !item.disabled && emit('click', item, index)"
      >
        <slot name="item" :item="item" :index="index" :current="index === items.length - 1">{{ item.label }}</slot>
      </view>
      <text v-if="index < items.length - 1" class="li-breadcrumb__separator">
        <slot name="separator">{{ separator }}</slot>
      </text>
    </template>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: 10rpx; color: @text-color-secondary; font-family: @font-family; font-size: @font-size-sm; line-height: 1.5; }
.li-breadcrumb__item { color: @primary-color; cursor: pointer; }
.li-breadcrumb__item--current { color: @text-color; font-weight: 700; cursor: default; }
.li-breadcrumb__item--disabled { color: @text-color-disabled; cursor: not-allowed; }
.li-breadcrumb__separator { color: @text-color-disabled; user-select: none; }
</style>
