<script setup lang="ts">
import { computed, watch } from 'vue';
import Icon from '../li-icon/li-icon.vue';
import { useControlled } from '../../composables/useControlled';
import type { TabbarItem, TabbarProps } from './types';

const props = withDefaults(defineProps<TabbarProps>(), {
  fixed: true,
  safeArea: true,
  bordered: true,
});
const emit = defineEmits<{
  (e: 'update:modelValue', key: string): void;
  (e: 'change', key: string, item: TabbarItem): void;
}>();
defineSlots<{ item?: (scope: { item: TabbarItem; active: boolean }) => unknown }>();

const { value: activeKey, setValue, setUncontrolledValue, isControlled } = useControlled(
  () => props.modelValue,
  props.defaultActiveKey ?? props.items[0]?.key ?? '',
  (key) => emit('update:modelValue', key)
);
const customStyle = computed(() => ({
  ...(props.activeColor ? { '--li-tabbar-active-color': props.activeColor } : {}),
  ...(props.inactiveColor ? { '--li-tabbar-inactive-color': props.inactiveColor } : {}),
}));

watch(() => props.items, (items) => {
  if (isControlled.value || items.some((item) => item.key === activeKey.value)) return;
  setUncontrolledValue(items[0]?.key ?? '');
});

function activate(item: TabbarItem) {
  if (item.disabled || item.key === activeKey.value) return;
  setValue(item.key);
  emit('change', item.key, item);
}
</script>

<template>
  <view v-if="fixed" class="li-tabbar__placeholder" :class="{ 'li-tabbar__placeholder--safe': safeArea }" />
  <view class="li-tabbar" :class="{ 'li-tabbar--fixed': fixed, 'li-tabbar--safe': safeArea, 'li-tabbar--bordered': bordered }" :style="customStyle" role="tablist">
    <view
      v-for="item in items"
      :key="item.key"
      class="li-tabbar__item"
      :class="{ 'li-tabbar__item--active': item.key === activeKey, 'li-tabbar__item--disabled': item.disabled }"
      role="tab"
      :aria-selected="item.key === activeKey"
      :aria-disabled="item.disabled || undefined"
      @click="activate(item)"
    >
      <slot name="item" :item="item" :active="item.key === activeKey">
        <view v-if="item.icon || item.activeIcon" class="li-tabbar__icon-wrap">
          <Icon :name="item.key === activeKey ? (item.activeIcon || item.icon || '') : (item.icon || item.activeIcon || '')" size="22" />
          <text v-if="item.badge !== undefined && item.badge !== ''" class="li-tabbar__badge">{{ item.badge }}</text>
        </view>
        <text class="li-tabbar__label">{{ item.label }}</text>
      </slot>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-tabbar {
  position: relative;
  z-index: 30;
  display: flex;
  width: 100%;
  min-height: 100rpx;
  padding: 8rpx 12rpx;
  box-sizing: border-box;
  background: @bg-color;
  color: var(--li-tabbar-inactive-color, @text-color-secondary);
  font-family: @font-family;

  &--fixed { position: fixed; right: 0; bottom: 0; left: 0; }
  &--safe { padding-bottom: calc(8rpx + env(safe-area-inset-bottom, 0px)); }
  &--bordered { border-top: 1px solid @border-color-light; }
  &__placeholder { height: 100rpx; }
  &__placeholder--safe { height: calc(100rpx + env(safe-area-inset-bottom, 0px)); }
  &__item { position: relative; display: flex; flex: 1 1 0; flex-direction: column; align-items: center; justify-content: center; gap: 4rpx; min-width: 0; color: inherit; font-size: @font-size-sm; line-height: 1.2; cursor: pointer; }
  &__item--active { color: var(--li-tabbar-active-color, @primary-color); font-weight: 700; }
  &__item--disabled { opacity: 0.45; cursor: not-allowed; }
  &__icon-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: 44rpx; min-height: 42rpx; }
  &__label { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  &__badge { position: absolute; top: -4rpx; right: -18rpx; min-width: 28rpx; height: 28rpx; padding: 0 6rpx; border: 2rpx solid @bg-color; border-radius: 99rpx; background: @error-color; color: #fff; font-size: 18rpx; line-height: 24rpx; text-align: center; }
}
</style>
