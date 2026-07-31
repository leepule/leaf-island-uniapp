<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import type { TooltipPlacement, TooltipTrigger, TooltipVariant } from './types';

interface Props {
  title?: string;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  variant?: TooltipVariant;
  bordered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  placement: 'top',
  trigger: 'hover',
  variant: 'default',
  bordered: true,
});

const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function show() {
  if (timer) clearTimeout(timer);
  visible.value = true;
}
function hide() {
  timer = setTimeout(() => (visible.value = false), 100);
}
function toggle() {
  visible.value = !visible.value;
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});

const placementClass = computed(() => `animal-tooltip__bubble--${props.placement.replace(/-/g, '_')}`);

const isIsland = computed(() => props.variant === 'island');
</script>

<template>
  <view class="animal-tooltip">
    <view
      class="animal-tooltip__trigger"
      @mouseenter="trigger === 'hover' ? show() : null"
      @mouseleave="trigger === 'hover' ? hide() : null"
      @focusin="trigger === 'focus' ? show() : null"
      @focusout="trigger === 'focus' ? hide() : null"
      @click="trigger === 'click' ? toggle() : null"
    >
      <slot />
    </view>
    <view
      class="animal-tooltip__bubble"
      :class="[
        placementClass,
        {
          'animal-tooltip__bubble--island': isIsland,
          'animal-tooltip__bubble--bordered': bordered,
          'animal-tooltip__bubble--borderless': !bordered,
          'animal-tooltip__bubble--visible': visible,
        },
      ]"
      role="tooltip"
      :aria-hidden="!visible"
      @mouseenter="trigger === 'hover' ? show() : null"
      @mouseleave="trigger === 'hover' ? hide() : null"
    >
      <template v-if="isIsland">
        <view class="animal-tooltip__island-body">
          <view class="animal-tooltip__island-content">
            <view class="animal-tooltip__content">
              <slot name="title">{{ title }}</slot>
            </view>
          </view>
        </view>
        <view class="animal-tooltip__tail" aria-hidden="true" />
      </template>
      <view v-else class="animal-tooltip__content">
        <slot name="title">{{ title }}</slot>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

@tooltip-bg: rgb(247, 243, 223);
@tooltip-border: #c4b89e;
@tooltip-gap: 20rpx;
@tooltip-arrow-size: 16rpx;
@island-arrow-size: 20rpx;

.animal-tooltip {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  font-family: @font-family;
}
.animal-tooltip__trigger {
  display: inline-flex;
}

.animal-tooltip__bubble {
  position: absolute;
  z-index: 100;
  box-sizing: border-box;
  width: max-content;
  max-width: 480rpx;
  padding: 12rpx 24rpx;
  background: @tooltip-bg;
  border-radius: @border-radius-sm;
  box-shadow: @shadow-base;
  color: #725d42;
  font-size: @font-size-sm;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.01em;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity @motion-duration-base @motion-ease,
    transform @motion-duration-base @motion-ease;

  &--visible {
    opacity: 1;
    pointer-events: auto;
  }

  &::after {
    content: '';
    position: absolute;
    width: @tooltip-arrow-size;
    height: @tooltip-arrow-size;
    background: @tooltip-bg;
    border-radius: 4rpx;
  }
}

.animal-tooltip__content {
  position: relative;
  z-index: 1;
  white-space: pre-line;
  word-break: break-word;
}

// Border config
.animal-tooltip__bubble:not(.animal-tooltip__bubble--island).animal-tooltip__bubble--bordered {
  border: @border-width solid @tooltip-border;
}
.animal-tooltip__bubble--borderless:not(.animal-tooltip__bubble--island)::after {
  border: none !important;
}

// Island variant
.animal-tooltip__bubble--island {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  max-width: 560rpx;

  &::after {
    display: none;
  }
}

.animal-tooltip__island-body {
  position: relative;
  width: max-content;
  max-width: 560rpx;
  border-radius: 44rpx 36rpx 48rpx 40rpx;
}
.animal-tooltip__island-content {
  position: relative;
  z-index: 1;
  padding: 24rpx 40rpx;
  background: @tooltip-bg;
  border-radius: inherit;

  .animal-tooltip__content {
    font-weight: 600;
    line-height: 1.55;
    text-align: center;
  }
}

.animal-tooltip__bubble--island.animal-tooltip__bubble--bordered .animal-tooltip__island-body {
  border: @border-width solid @tooltip-border;
  filter: drop-shadow(0 8rpx 28rpx rgba(121, 79, 39, 0.14));

  /* #ifdef H5 */
  border-color: transparent;
  border-radius: 0;
  background: url('../../assets/img/decor/island-panel.svg') no-repeat center / 100% 100%;
  /* #endif */
}
.animal-tooltip__bubble--island.animal-tooltip__bubble--bordered .animal-tooltip__island-content {
  /* #ifdef H5 */
  background: transparent;
  border-radius: 0;
  /* #endif */
}
.animal-tooltip__bubble--island.animal-tooltip__bubble--borderless .animal-tooltip__island-content {
  background: @tooltip-bg;
  filter: drop-shadow(0 8rpx 28rpx rgba(121, 79, 39, 0.14));
}

.animal-tooltip__tail {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}

// Borderless island — circle
.animal-tooltip__bubble--island.animal-tooltip__bubble--borderless .animal-tooltip__tail {
  width: 28rpx;
  height: 28rpx;
  background: @tooltip-bg;
  border-radius: 50%;
}

// Bordered island — diamond
.animal-tooltip__bubble--island.animal-tooltip__bubble--bordered .animal-tooltip__tail {
  width: @island-arrow-size;
  height: @island-arrow-size;
  background: @tooltip-bg;
  border-radius: 4rpx;
}

// Bubble, arrow, and island-tail offsets differ for start/end placements, so
// the geometry mixin keeps all three values explicit while the generators stay generic.

.placement-geometry(@side, @align) when (@side = top) and (@align = center) {
  @anchor: bottom;
  @crossProperty: left;
  @bubbleCrossValue: 50%;
  @arrowCrossValue: 50%;
  @tailCrossValue: 50%;
  @hiddenTransform: translateX(-50%) translateY(8rpx);
  @visibleTransform: translateX(-50%) translateY(0);
  @arrowTransform: translateX(-50%) rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = top) and (@align = start) {
  @anchor: bottom;
  @crossProperty: left;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 32rpx;
  @tailCrossValue: 40rpx;
  @hiddenTransform: translateY(8rpx);
  @visibleTransform: translateY(0);
  @arrowTransform: rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = top) and (@align = end) {
  @anchor: bottom;
  @crossProperty: right;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 32rpx;
  @tailCrossValue: 40rpx;
  @hiddenTransform: translateY(8rpx);
  @visibleTransform: translateY(0);
  @arrowTransform: rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = bottom) and (@align = center) {
  @anchor: top;
  @crossProperty: left;
  @bubbleCrossValue: 50%;
  @arrowCrossValue: 50%;
  @tailCrossValue: 50%;
  @hiddenTransform: translateX(-50%) translateY(-8rpx);
  @visibleTransform: translateX(-50%) translateY(0);
  @arrowTransform: translateX(-50%) rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = bottom) and (@align = start) {
  @anchor: top;
  @crossProperty: left;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 32rpx;
  @tailCrossValue: 40rpx;
  @hiddenTransform: translateY(-8rpx);
  @visibleTransform: translateY(0);
  @arrowTransform: rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = bottom) and (@align = end) {
  @anchor: top;
  @crossProperty: right;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 32rpx;
  @tailCrossValue: 40rpx;
  @hiddenTransform: translateY(-8rpx);
  @visibleTransform: translateY(0);
  @arrowTransform: rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = left) and (@align = center) {
  @anchor: right;
  @crossProperty: top;
  @bubbleCrossValue: 50%;
  @arrowCrossValue: 50%;
  @tailCrossValue: 50%;
  @hiddenTransform: translateY(-50%) translateX(8rpx);
  @visibleTransform: translateY(-50%) translateX(0);
  @arrowTransform: translateY(-50%) rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = left) and (@align = start) {
  @anchor: right;
  @crossProperty: top;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 24rpx;
  @tailCrossValue: 32rpx;
  @hiddenTransform: translateX(8rpx);
  @visibleTransform: translateX(0);
  @arrowTransform: rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = left) and (@align = end) {
  @anchor: right;
  @crossProperty: bottom;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 24rpx;
  @tailCrossValue: 32rpx;
  @hiddenTransform: translateX(8rpx);
  @visibleTransform: translateX(0);
  @arrowTransform: rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = right) and (@align = center) {
  @anchor: left;
  @crossProperty: top;
  @bubbleCrossValue: 50%;
  @arrowCrossValue: 50%;
  @tailCrossValue: 50%;
  @hiddenTransform: translateY(-50%) translateX(-8rpx);
  @visibleTransform: translateY(-50%) translateX(0);
  @arrowTransform: translateY(-50%) rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = right) and (@align = start) {
  @anchor: left;
  @crossProperty: top;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 24rpx;
  @tailCrossValue: 32rpx;
  @hiddenTransform: translateX(-8rpx);
  @visibleTransform: translateX(0);
  @arrowTransform: rotate(45deg);
}
.placement-geometry(@side, @align) when (@side = right) and (@align = end) {
  @anchor: left;
  @crossProperty: bottom;
  @bubbleCrossValue: 0;
  @arrowCrossValue: 24rpx;
  @tailCrossValue: 32rpx;
  @hiddenTransform: translateX(-8rpx);
  @visibleTransform: translateX(0);
  @arrowTransform: rotate(45deg);
}

.tail-border-properties(@side) when (@side = top) {
  @firstBorder: border-right;
  @secondBorder: border-bottom;
}
.tail-border-properties(@side) when (@side = bottom) {
  @firstBorder: border-top;
  @secondBorder: border-left;
}
.tail-border-properties(@side) when (@side = left) {
  @firstBorder: border-top;
  @secondBorder: border-right;
}
.tail-border-properties(@side) when (@side = right) {
  @firstBorder: border-bottom;
  @secondBorder: border-left;
}

.center-tail-transform(@side) when (@side = top), (@side = bottom) {
  @centerTransform: translateX(-50%);
}
.center-tail-transform(@side) when (@side = left), (@side = right) {
  @centerTransform: translateY(-50%);
}

.gen-bubble(@name, @side, @align) {
  .animal-tooltip__bubble--@{name} {
    .placement-geometry(@side, @align);
    .tail-border-properties(@side);
    @{anchor}: calc(100% + @tooltip-gap);
    @{crossProperty}: @bubbleCrossValue;
    transform: @hiddenTransform;
    &.animal-tooltip__bubble--visible {
      transform: @visibleTransform;
    }
    &::after {
      @{anchor}: -10rpx;
      @{crossProperty}: @arrowCrossValue;
      transform: @arrowTransform;
      @{firstBorder}: @border-width solid @tooltip-border;
      @{secondBorder}: @border-width solid @tooltip-border;
    }
  }
}

.gen-tail(@name, @side, @align, @kind) when (@kind = borderless) {
  .animal-tooltip__bubble--island.animal-tooltip__bubble--borderless {
    &.animal-tooltip__bubble--@{name} .animal-tooltip__tail {
      .placement-geometry(@side, @align);
      @{anchor}: -10rpx;
      @{crossProperty}: @tailCrossValue;
      .emit-tail-transform(borderless, @side, @align);
    }
  }
}
.gen-tail(@name, @side, @align, @kind) when (@kind = bordered) {
  .animal-tooltip__bubble--island.animal-tooltip__bubble--bordered {
    &.animal-tooltip__bubble--@{name} .animal-tooltip__tail {
      .placement-geometry(@side, @align);
      @{anchor}: -10rpx;
      @{crossProperty}: @tailCrossValue;
      .emit-tail-transform(bordered, @side, @align);
      .emit-tail-borders(bordered, @side);
    }
  }
}
.emit-tail-transform(@kind, @side, @align) when (@kind = borderless) and (@align = center) {
  .center-tail-transform(@side);
  transform: @centerTransform;
}
.emit-tail-transform(@kind, @side, @align) when (@kind = bordered) and (@align = center) {
  .center-tail-transform(@side);
  transform: @centerTransform rotate(45deg);
}
.emit-tail-transform(@kind, @side, @align) when (@kind = bordered) and (@align = start),
    (@kind = bordered) and (@align = end) {
  transform: rotate(45deg);
}
.emit-tail-borders(@kind, @side) when (@kind = bordered) {
  .tail-border-properties(@side);
  @{firstBorder}: @border-width solid @tooltip-border;
  @{secondBorder}: @border-width solid @tooltip-border;
}

@placements:
  top top center,
  top_start top start,
  top_end top end,
  bottom bottom center,
  bottom_start bottom start,
  bottom_end bottom end,
  left left center,
  left_start left start,
  left_end left end,
  right right center,
  right_start right start,
  right_end right end;

each(@placements, {
    .gen-tail(extract(@value, 1), extract(@value, 2), extract(@value, 3), borderless);
});

each(@placements, {
    .gen-tail(extract(@value, 1), extract(@value, 2), extract(@value, 3), bordered);
});

each(@placements, {
    .gen-bubble(extract(@value, 1), extract(@value, 2), extract(@value, 3));
});
</style>
