<script setup lang="ts">
import { inject, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { leafIslandThemeKey, type LeafIslandTheme } from '../../composables/theme';
import type { PopoverProps } from './types';

const props = withDefaults(defineProps<PopoverProps>(), { open: false, placement: 'bottom', title: '', trigger: 'click' });
const emit = defineEmits<{ (e: 'update:open', value: boolean): void; (e: 'change', value: boolean): void }>();
const inheritedTheme = inject(leafIslandThemeKey, ref<LeafIslandTheme>('light'));
type UniViewRef = HTMLElement | (ComponentPublicInstance & { $el: HTMLElement });
const triggerRef = ref<UniViewRef | null>(null);
const panelRef = ref<UniViewRef | null>(null);
const floatingStyle = ref<Record<string, string>>({ top: '0px', left: '0px' });

function resolveElement(value: UniViewRef | null): HTMLElement | null {
  if (!value) return null;
  if (typeof (value as HTMLElement).getBoundingClientRect === 'function') return value as HTMLElement;
  return (value as ComponentPublicInstance & { $el?: HTMLElement }).$el ?? null;
}

function toggle() {
  if (props.trigger === 'manual') return;
  const next = !props.open;
  emit('update:open', next);
  emit('change', next);
}
function close() {
  emit('update:open', false);
  emit('change', false);
}

function updatePosition() {
  // #ifdef H5
  const trigger = resolveElement(triggerRef.value);
  const panel = resolveElement(panelRef.value);
  if (!trigger || !panel) return;

  const rect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const gap = 10;
  let top = 0;
  let left = 0;
  let transform = '';

  if (props.placement === 'top') {
    top = rect.top - gap;
    left = rect.left + rect.width / 2;
    transform = 'translate(-50%, -100%)';
  } else if (props.placement === 'left') {
    top = rect.top + rect.height / 2;
    left = rect.left - gap;
    transform = 'translate(-100%, -50%)';
  } else if (props.placement === 'right') {
    top = rect.top + rect.height / 2;
    left = rect.right + gap;
    transform = 'translateY(-50%)';
  } else {
    top = rect.bottom + gap;
    left = rect.left + rect.width / 2;
    transform = 'translateX(-50%)';
  }

  // Keep the panel inside the viewport when the requested side has little room.
  const transformedLeft = props.placement === 'left'
    ? left - panelRect.width
    : props.placement === 'right'
      ? left
      : left - panelRect.width / 2;
  const transformedTop = props.placement === 'top'
    ? top - panelRect.height
    : props.placement === 'bottom'
      ? top
      : top - panelRect.height / 2;
  const safeLeft = Math.min(Math.max(8, transformedLeft), Math.max(8, window.innerWidth - panelRect.width - 8));
  const safeTop = Math.min(Math.max(8, transformedTop), Math.max(8, window.innerHeight - panelRect.height - 8));

  if (props.placement === 'top') {
    top = safeTop + panelRect.height;
    left = safeLeft + panelRect.width / 2;
  } else if (props.placement === 'bottom') {
    top = safeTop;
    left = safeLeft + panelRect.width / 2;
  } else if (props.placement === 'left') {
    top = safeTop + panelRect.height / 2;
    left = safeLeft + panelRect.width;
  } else {
    top = safeTop + panelRect.height / 2;
    left = safeLeft;
  }

  floatingStyle.value = { top: `${top}px`, left: `${left}px`, transform };
  // #endif
}

function handleViewportChange() {
  updatePosition();
}

watch(
  () => [props.open, props.placement] as const,
  async ([open]) => {
    // #ifdef H5
    window.removeEventListener('resize', handleViewportChange);
    window.removeEventListener('scroll', handleViewportChange, true);
    if (open) {
      await nextTick();
      updatePosition();
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('scroll', handleViewportChange, true);
    }
    // #endif
  }
);

onBeforeUnmount(() => {
  // #ifdef H5
  window.removeEventListener('resize', handleViewportChange);
  window.removeEventListener('scroll', handleViewportChange, true);
  // #endif
});
</script>

<template>
  <view class="li-popover" :class="`li-popover--${placement}`">
    <view ref="triggerRef" class="li-popover__trigger" @click="toggle"><slot /></view>
    <!-- #ifdef H5 -->
    <Teleport to="body">
      <view v-if="open" class="li-popover__mask" @click="close" />
      <view v-if="open" ref="panelRef" class="li-popover__panel li-popover__panel--floating" :class="[`li-popover__panel--${placement}`, { 'li-theme-provider--dark': inheritedTheme === 'dark' }]" :style="floatingStyle" @click.stop>
        <view class="li-popover__content">
          <text v-if="title" class="li-popover__title">{{ title }}</text>
          <slot name="content" />
        </view>
      </view>
    </Teleport>
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view v-if="open" class="li-popover__mask" @click="close" />
    <view v-if="open" ref="panelRef" class="li-popover__panel" @click.stop>
      <view class="li-popover__content">
        <text v-if="title" class="li-popover__title">{{ title }}</text>
        <slot name="content" />
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<style lang="less" scoped>
.li-popover { position: relative; display: inline-block; }
.li-popover__trigger { display: inline-flex; }
.li-popover__mask { position: fixed; z-index: 1298; top: 0; right: 0; bottom: 0; left: 0; background: transparent; }
.li-popover__panel { position: absolute; z-index: 1299; min-width: 170px; max-width: calc(100vw - 24px); max-height: calc(100vh - 16px); overflow: visible; padding: 14px 16px; border: 1px solid #e4d9c6; border-radius: 16px; background: var(--animal-surface-color, #fffdf7); color: var(--animal-text-color, #594a37); box-shadow: 0 8px 26px rgba(61, 52, 40, .16); }
.li-popover__content { max-height: calc(100vh - 46px); overflow-y: auto; }
.li-popover__panel::before { position: absolute; width: 10px; height: 10px; border: 1px solid #e4d9c6; background: var(--animal-surface-color, #fffdf7); content: ''; transform: rotate(45deg); }
.li-popover__panel--floating { position: fixed; }
.li-popover--top .li-popover__panel { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.li-popover--bottom .li-popover__panel { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.li-popover--left .li-popover__panel { top: 50%; right: calc(100% + 8px); transform: translateY(-50%); }
.li-popover--right .li-popover__panel { top: 50%; left: calc(100% + 8px); transform: translateY(-50%); }
.li-popover--bottom .li-popover__panel::before,
.li-popover__panel--bottom::before { top: -6px; left: calc(50% - 5px); border-right: 0; border-bottom: 0; }
.li-popover--top .li-popover__panel::before,
.li-popover__panel--top::before { right: calc(50% - 5px); bottom: -6px; border-top: 0; border-left: 0; }
.li-popover--left .li-popover__panel::before,
.li-popover__panel--left::before { top: calc(50% - 5px); right: -6px; border-bottom: 0; border-left: 0; }
.li-popover--right .li-popover__panel::before,
.li-popover__panel--right::before { top: calc(50% - 5px); left: -6px; border-top: 0; border-right: 0; }
.li-popover__title { display: block; margin-bottom: 6px; font-weight: 800; }
</style>
