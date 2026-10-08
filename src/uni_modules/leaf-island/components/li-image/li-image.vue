<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { previewImages } from '../../composables/preview-images';
import type { ImageProps } from './types';

const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  width: '100%',
  height: '180px',
  fit: 'aspectFill',
  radius: '12px',
  lazyLoad: false,
  preview: false,
  placeholder: '加载中',
  errorText: '图片加载失败',
});
const emit = defineEmits<{
  (e: 'load', event: unknown): void;
  (e: 'error', event: unknown): void;
  (e: 'preview', src: string, index: number): void;
}>();

const loaded = ref(false);
const failed = ref(false);
const previewList = computed(() => {
  const urls = (props.previewUrls || []).filter(Boolean);
  if (props.src && !urls.includes(props.src)) urls.unshift(props.src);
  return urls;
});
const containerStyle = computed(() => ({
  width: toCssSize(props.width),
  height: toCssSize(props.height),
  borderRadius: toCssSize(props.radius),
}));

function toCssSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}

watch(() => props.src, () => {
  loaded.value = false;
  failed.value = false;
});

function handleLoad(event: unknown) {
  loaded.value = true;
  emit('load', event);
}

function handleError(event: unknown) {
  failed.value = true;
  emit('error', event);
}

function handlePreview() {
  if (!props.preview || !props.src || failed.value || !loaded.value) return;
  const index = previewList.value.indexOf(props.src);
  emit('preview', props.src, index);
  previewImages(previewList.value, index);
}
</script>

<template>
  <view
    class="li-image"
    :class="{ 'li-image--previewable': preview, 'li-image--loaded': loaded }"
    :style="containerStyle"
    @click="handlePreview"
  >
    <image
      v-if="src && !failed"
      class="li-image__native"
      :class="{ 'li-image__native--loaded': loaded }"
      :src="src"
      :mode="fit"
      :lazy-load="lazyLoad"
      @load="handleLoad"
      @error="handleError"
    />
    <view v-if="!src || failed || !loaded" class="li-image__state" :class="{ 'li-image__state--error': failed }">
      <slot v-if="failed" name="error">
        <text class="li-image__leaf">🍃</text>
        <text>{{ errorText }}</text>
      </slot>
      <slot v-else name="placeholder">
        <text class="li-image__leaf">🍃</text>
        <text>{{ src ? placeholder : '暂无图片' }}</text>
      </slot>
    </view>
  </view>
</template>

<style lang="less" scoped>
.li-image { position: relative; display: inline-flex; flex: 0 0 auto; overflow: hidden; align-items: center; justify-content: center; border: 1px solid var(--animal-border-color-light, #e8e2d6); background: var(--animal-bg-color-secondary, #f5f1e7); color: var(--animal-text-color-secondary, #8c7d68); font-size: 13px; }
.li-image--previewable { cursor: zoom-in; }
.li-image__native { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity .18s ease; }
.li-image__native--loaded { opacity: 1; }
.li-image__state { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; background: linear-gradient(145deg, var(--animal-bg-color, #f8f8f0), var(--animal-bg-color-secondary, #eee8d9)); color: var(--animal-text-color-secondary, #8c7d68); }
.li-image__state--error { background: #fbf0e9; color: #a16b5b; }
.li-image__leaf { font-size: 18px; }
</style>
