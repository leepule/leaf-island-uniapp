<script setup lang="ts">
import type { EmptyProps } from './types';

withDefaults(defineProps<EmptyProps>(), { description: '暂无数据' });
</script>

<template>
  <view class="li-empty">
    <view class="li-empty__illustration" aria-hidden="true"><view class="li-empty__island" /></view>
    <text class="li-empty__description">{{ description }}</text>
    <view v-if="$slots.default" class="li-empty__action"><slot /></view>
  </view>
</template>

<style lang="less" scoped>
.li-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 180px;
  padding: 28px;
  color: var(--animal-text-color-secondary, #8b7b66);
  text-align: center;

  &__illustration {
    position: relative;
    width: 84px;
    height: 54px;
    overflow: hidden;
    border-radius: 50% 50% 40% 40%;
    background: #d7f0e7;
  }

  &__illustration::before, &__illustration::after {
    position: absolute;
    bottom: 0;
    width: 62px;
    height: 40px;
    border-radius: 50% 50% 0 0;
    background: #83c69e;
    content: '';
  }
  &__illustration::before { left: -12px; }
  &__illustration::after { right: -10px; height: 30px; background: #60b58d; }
  &__island { position: absolute; z-index: 1; right: 26px; bottom: 18px; width: 5px; height: 16px; border-radius: 5px; background: var(--animal-warm-color-soft, #725d42); }
  &__island::after { position: absolute; top: -5px; left: -5px; width: 15px; height: 10px; border-radius: 100% 0 100% 0; background: #6fba2c; content: ''; transform: rotate(-20deg); }
  &__description { font-size: 14px; }
  &__action { margin-top: 4px; }
}
</style>
