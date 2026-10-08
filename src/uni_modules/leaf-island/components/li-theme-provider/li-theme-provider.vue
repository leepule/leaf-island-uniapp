<script setup lang="ts">
import { computed, provide } from 'vue';
import { leafIslandThemeKey, type LeafIslandTheme } from '../../composables/theme';

const props = withDefaults(defineProps<{ theme?: LeafIslandTheme }>(), {
  theme: 'light',
});
provide(leafIslandThemeKey, computed(() => props.theme));
</script>

<template>
  <view class="li-theme-provider" :class="`li-theme-provider--${theme}`">
    <slot />
  </view>
</template>

<style scoped>
.li-theme-provider {
  color: var(--animal-text-color);
  background-color: var(--animal-bg-color);
  min-height: 100vh;
}
</style>
