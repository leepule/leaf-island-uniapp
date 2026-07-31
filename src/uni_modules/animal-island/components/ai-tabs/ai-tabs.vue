<script setup lang="ts">
import { computed, watch } from 'vue';
import leafIcon from '../../assets/img/icons/icon-leaf.png';
import { useControlled } from '../../composables/useControlled';
import type { TabItem } from './types';

interface Props {
  /** 标签页配置列表 */
  items: TabItem[];
  /** 当前激活标签 (v-model) — 受控 */
  modelValue?: string;
  /** 默认激活标签（非受控） */
  defaultActiveKey?: string;
  /** 是否启用叶子摆动动画 */
  leafAnimation?: boolean;
  /** 是否显示选中状态阴影 */
  shadow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  leafAnimation: true,
  shadow: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', key: string): void;
  (e: 'change', key: string): void;
}>();

defineSlots<Record<string, (scope: { item: TabItem }) => unknown>>();

const {
  value: activeKey,
  setValue: setActiveKey,
  setUncontrolledValue,
  isControlled,
} = useControlled(
  () => props.modelValue,
  props.defaultActiveKey ?? props.items[0]?.key ?? '',
  (key) => emit('update:modelValue', key)
);
const activeItem = computed(() => props.items.find((i) => i.key === activeKey.value));

watch(
  () => props.items,
  (list) => {
    if (isControlled.value) return;
    if (!list.find((i) => i.key === activeKey.value)) {
      setUncontrolledValue(list[0]?.key ?? '');
    }
  }
);

function handleClick(key: string) {
  setActiveKey(key);
  emit('change', key);
}
</script>

<template>
  <view class="animal-tabs">
    <view class="animal-tabs__list">
      <view
        v-for="item in items"
        :key="item.key"
        class="animal-tabs__item"
        :class="{
          'animal-tabs__item--active': item.key === activeKey,
          'animal-tabs__item--active-shadow': shadow && item.key === activeKey,
        }"
        @click="handleClick(item.key)"
      >
        <text class="animal-tabs__icon">
          {{ item.key === activeKey ? '●' : '○' }}
        </text>
        <text class="animal-tabs__label">{{ item.label }}</text>
        <image
          v-if="item.key === activeKey"
          :src="leafIcon"
          class="animal-tabs__leaf"
          :class="{ 'animal-tabs__leaf--static': !leafAnimation }"
        />
      </view>
    </view>
    <view class="animal-tabs__content">
      <view class="animal-tabs__inner">
        <slot v-if="activeItem" :name="activeItem.key" :item="activeItem" />
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.animal-tabs {
  background: @bg-color;
  border-radius: @border-radius-lg;
  border: @border-width solid @border-color-light;
  overflow: hidden;

  &__list {
    display: flex;
    gap: @spacing-xs;
    padding: @spacing-lg;
    background: rgba(255, 255, 255, 0.6);
    border-bottom: 2px solid @border-color-light;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: @spacing-sm;
    padding: @spacing-sm @spacing-lg;
    background: transparent;
    border: none;
    border-radius: @border-radius-lg;
    cursor: pointer;
    font-family: @font-family;
    font-size: @font-size-base;
    font-weight: 500;
    color: @text-color;
    transition: all @motion-duration-base @motion-ease;

    &:hover {
      background: rgba(25, 200, 185, 0.1);
      color: @text-color;
    }

    &--active,
    &--active:hover {
      background: #0cc0b5;
      color: #fff9e3;
      font-weight: 600;
      border-radius: @border-radius-lg;
    }

    // 全局 reset [class^='animal-'] 会重设嵌套子元素颜色，
    // 在选中态显式覆盖：label 跟随白色，dot 保持深棕
    &--active .animal-tabs__label {
      color: #fff9e3;
    }
    &--active .animal-tabs__icon {
      color: @text-color;
    }

    &--active-shadow {
      box-shadow: 0 3px 0 0 @shadow-color-light;
    }
  }

  &__icon {
    font-size: 10px;
    transition: transform @motion-duration-base @motion-ease;

    .animal-tabs__item--active & {
      transform: scale(1.2);
    }
  }

  &__label {
    position: relative;
    color: inherit;
  }

  &__leaf {
    position: absolute;
    right: -5px;
    top: -4px;
    width: 18px;
    height: 18px;
    animation: animal-tabs-leaf-wiggle 2s ease-in-out infinite;

    &--static {
      animation: none;
    }
  }

  &__content {
    min-height: 60px;
    padding: @spacing-xl;
    animation: animal-tabs-fade-in 0.25s ease;
  }

  &__inner {
    min-height: 40px;
    color: @text-color-secondary;
    font-size: @font-size-base;
    line-height: @line-height-base;
  }
}

@keyframes animal-tabs-leaf-wiggle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

@keyframes animal-tabs-fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
