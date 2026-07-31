<script setup lang="ts">
import { useControlled } from '../../composables/useControlled';

interface Props {
  question?: string;
  answer?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: undefined,
  defaultExpanded: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:expanded', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

defineSlots<{
  question?: () => unknown;
  default?: () => unknown;
}>();

const { value: expandedState, setValue: setExpanded } = useControlled(
  () => props.expanded,
  props.defaultExpanded,
  (value) => emit('update:expanded', value)
);

function toggle() {
  if (props.disabled) return;
  const next = !expandedState.value;
  setExpanded(next);
  emit('change', next);
}
</script>

<template>
  <view
    class="animal-collapse"
    :class="{
      'animal-collapse--expanded': expandedState,
      'animal-collapse--disabled': disabled,
    }"
  >
    <view
      class="animal-collapse__header"
      :class="{ 'animal-collapse__header--disabled': disabled }"
      :aria-expanded="expandedState"
      @click="toggle"
    >
      <text class="animal-collapse__icon">{{ expandedState ? '−' : '+' }}</text>
      <text class="animal-collapse__title">
        <slot name="question">{{ question }}</slot>
      </text>
      <view class="animal-collapse__arrow" aria-hidden="true" />
    </view>
    <view class="animal-collapse__panel" :style="{ gridTemplateRows: expandedState ? '1fr' : '0fr' }">
      <view class="animal-collapse__content">
        <slot>{{ answer }}</slot>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.animal-collapse {
  position: relative;
  background: @bg-color;
  border-radius: @border-radius-base;
  border: @border-width solid @border-color;
  overflow: hidden;
  transition: border-color @motion-duration-base @motion-ease;
  margin-bottom: @spacing-md;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: @spacing-md;
    width: 100%;
    padding: @spacing-lg @spacing-xl;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: @font-family;

    &--disabled {
      cursor: not-allowed;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: @primary-color;
    color: #fff;
    border-radius: 50%;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(25, 200, 185, 0.3);
    transition:
      background-color @motion-duration-base @motion-ease,
      transform @motion-duration-base @motion-ease;
  }

  &__title {
    flex: 1;
    font-size: @font-size-lg;
    font-weight: 600;
    color: @text-color;
    line-height: 1.35;
  }

  &__arrow {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    background: url('../../assets/img/icons/collapse-leaf.svg') no-repeat center / contain;
    opacity: 0.5;
    transition:
      opacity @motion-duration-base @motion-ease,
      transform @motion-duration-base @motion-ease;
  }

  &--expanded {
    .animal-collapse__icon {
      background: @primary-color-active;
      transform: rotate(180deg);
    }
    .animal-collapse__arrow {
      opacity: 1;
      transform: rotate(45deg);
    }
    .animal-collapse__content {
      padding-bottom: @spacing-xl;
    }
  }

  &__panel {
    display: grid;
    transition: grid-template-rows 0.3s @motion-ease;
    will-change: grid-template-rows;
  }

  &__content {
    overflow: hidden;
    padding: 0 @spacing-xl;
    color: @text-color-secondary;
    font-size: @font-size-base;
    line-height: 1.7;
    transition: padding @motion-duration-base @motion-ease;
  }
}
</style>
