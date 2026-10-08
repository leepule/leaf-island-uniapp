<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { BacktopProps } from './types';

const props = withDefaults(defineProps<BacktopProps>(), {
  visibilityHeight: 300,
  duration: 300,
  right: '32rpx',
  bottom: 'calc(32rpx + env(safe-area-inset-bottom, 0px))',
  text: '顶部',
  showText: true,
});
const emit = defineEmits<{ (e: 'click'): void }>();
const pageScrollTop = ref(0);
const scrollTargets = ref<HTMLElement[]>([]);
// #ifdef H5
const useExternalScrollTop = false;
// #endif
// #ifndef H5
const useExternalScrollTop = true;
// #endif
const isVisible = computed(() => {
  const top = useExternalScrollTop ? (props.scrollTop ?? pageScrollTop.value) : pageScrollTop.value;
  return top >= props.visibilityHeight;
});
const buttonStyle = computed(() => ({ right: props.right, bottom: props.bottom }));

// #ifdef H5
function findScrollTargets(): HTMLElement[] {
  const candidates = [
    document.querySelector('uni-main'),
    document.querySelector('.app-main'),
    document.scrollingElement,
    document.documentElement,
    document.body,
  ];
  return Array.from(new Set(candidates.filter((item): item is HTMLElement => item instanceof HTMLElement)));
}
// #endif

function updateScrollTop() {
  // #ifdef H5
  const targets = findScrollTargets();
  scrollTargets.value = targets;
  pageScrollTop.value = Math.max(window.scrollY, ...targets.map((target) => target.scrollTop));
  // #endif
}

function scrollToTop() {
  emit('click');
  // #ifdef H5
  const behavior: ScrollBehavior = props.duration <= 0 ? 'auto' : 'smooth';
  const activeTargets = scrollTargets.value.filter((target) => target.scrollTop > 0);
  if (activeTargets.length > 0) {
    activeTargets.forEach((target) => target.scrollTo({ top: 0, behavior }));
  } else {
    window.scrollTo({ top: 0, behavior });
  }
  // #endif
  // #ifndef H5
  uni.pageScrollTo({ scrollTop: 0, duration: props.duration });
  // #endif
}

onMounted(() => {
  // #ifdef H5
  updateScrollTop();
  window.addEventListener('scroll', updateScrollTop, { passive: true, capture: true });
  document.addEventListener('scroll', updateScrollTop, { passive: true, capture: true });
  scrollTargets.value.forEach((target) => target.addEventListener('scroll', updateScrollTop, { passive: true }));
  window.addEventListener('resize', updateScrollTop, { passive: true });
  // #endif
});

onUnmounted(() => {
  // #ifdef H5
  window.removeEventListener('scroll', updateScrollTop, true);
  document.removeEventListener('scroll', updateScrollTop, true);
  scrollTargets.value.forEach((target) => target.removeEventListener('scroll', updateScrollTop));
  window.removeEventListener('resize', updateScrollTop);
  // #endif
});
</script>

<template>
  <view v-if="isVisible" class="li-backtop" :style="buttonStyle" role="button" aria-label="返回顶部" @click="scrollToTop">
    <text class="li-backtop__arrow">↑</text>
    <text v-if="showText" class="li-backtop__text">{{ text }}</text>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-backtop { position: fixed; z-index: 900; display: inline-flex; align-items: center; justify-content: center; gap: 4rpx; min-width: 76rpx; min-height: 76rpx; padding: 0 16rpx; border: 1px solid @border-color-light; border-radius: 999rpx; background: @bg-color; color: @primary-color; box-shadow: @shadow-base; font-family: @font-family; font-size: @font-size-sm; cursor: pointer; transition: transform @motion-duration-fast @motion-ease, opacity @motion-duration-fast @motion-ease; }
.li-backtop:active { transform: scale(0.94); }
.li-backtop__arrow { font-size: 36rpx; font-weight: 700; line-height: 1; }
.li-backtop__text { font-size: @font-size-sm; }
</style>
