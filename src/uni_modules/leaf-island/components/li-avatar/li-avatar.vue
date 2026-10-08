<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { AvatarProps } from './types';

const props = withDefaults(defineProps<AvatarProps>(), { src: '', name: '', size: 40, shape: 'circle' });
const imageFailed = ref(false);
watch(() => props.src, () => { imageFailed.value = false; });
const avatarStyle = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size;
  return { width: size, height: size };
});
const initials = computed(() => props.name.trim().slice(0, 2) || '島');
function handleImageError() {
  imageFailed.value = true;
}
</script>

<template>
  <view class="li-avatar" :class="`li-avatar--${shape}`" :style="avatarStyle" :aria-label="name || '头像'">
    <image v-if="src && !imageFailed" class="li-avatar__image" :src="src" mode="aspectFill" @error="handleImageError" />
    <slot v-else>{{ initials }}</slot>
  </view>
</template>

<style lang="less" scoped>
.li-avatar { display: inline-flex; flex: 0 0 auto; align-items: center; justify-content: center; overflow: hidden; background: #d8eee0; color: #457a56; font-weight: 800; }
.li-avatar--circle { border-radius: 50%; }
.li-avatar--square { border-radius: 12px; }
.li-avatar__image { width: 100%; height: 100%; }
</style>
