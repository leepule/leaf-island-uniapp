<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import type { Component, CSSProperties } from 'vue';
import type { IconProps } from './types';

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  bounce: false,
  variant: 'dark',
});

const lucideProps = computed(() => {
  const { name, variant, bounce, size, width, height, color, ...rest } = props;
  return rest;
});

function normalizeIconName(name: string) {
  return name
    .replace(/^icon-/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function toPascalCase(name: string) {
  return name
    .split('-')
    .map((part) => (part ? `${part[0].toUpperCase()}${part.slice(1)}` : part))
    .join('');
}

const lucideName = computed(() => normalizeIconName(props.name));
const iconColor = computed(() => props.color ?? (props.variant === 'light' ? '#fff' : 'currentColor'));

// #ifdef H5
const iconComponentCache = new Map<string, Component>();

function createIconComponent(iconName: string) {
  return defineAsyncComponent(async () => {
    const icons = (await import('@lucide/vue')) as Record<string, Component>;
    const icon = icons[toPascalCase(iconName)];

    if (!icon) {
      throw new Error(`Unknown Lucide icon: ${iconName}`);
    }

    return icon;
  });
}

const iconComponent = computed(() => {
  const iconName = lucideName.value;
  let component = iconComponentCache.get(iconName);

  if (!component) {
    component = createIconComponent(iconName);
    iconComponentCache.set(iconName, component);
  }

  return component;
});
// #endif

// #ifndef H5
const iconSvgFiles = import.meta.glob('/node_modules/lucide-static/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const iconSvgs: Record<string, string> = {};

for (const [file, svg] of Object.entries(iconSvgFiles)) {
  const iconName = file.split('/').pop()?.replace(/\.svg$/, '');

  if (iconName) {
    iconSvgs[iconName] = svg;
  }
}

const imageColor = computed(() => props.color ?? (props.variant === 'light' ? '#fff' : '#4C3C33'));

const iconUrl = computed(() => {
  const svg = iconSvgs[lucideName.value];

  if (!svg) {
    return '';
  }

  return `data:image/svg+xml,${encodeURIComponent(
    svg.replace(/stroke="currentColor"/g, `stroke="${imageColor.value}"`),
  )}`;
});
// #endif

const sizeStyle = computed<CSSProperties>(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
}));
</script>

<template>
  <view class="animal-icon" :class="{ 'animal-icon--bounce': bounce }" :style="sizeStyle">
    <!-- #ifdef H5 -->
    <component
      :is="iconComponent"
      v-bind="lucideProps"
      :color="iconColor"
      class="animal-icon__svg"
    />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <image class="animal-icon__image" :src="iconUrl" mode="aspectFit" />
    <!-- #endif -->
  </view>
</template>

<style lang="less" scoped>
.animal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  line-height: 0;

  &--bounce:hover {
    animation: animal-icon-bounce 0.3s ease-in-out forwards;
  }
}

.animal-icon__image {
  width: 100%;
  height: 100%;
}

:deep(.animal-icon__svg) {
  width: 100%;
  height: 100%;
}

@keyframes animal-icon-bounce {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.2) rotate(-5deg);
  }
  100% {
    transform: scale(1.1) rotate(-4deg);
  }
}
</style>
