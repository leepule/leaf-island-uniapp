<script setup lang="ts">
import { computed } from 'vue';
import type { CursorProps } from './types';

const props = withDefaults(defineProps<CursorProps>(), {
  forceAll: true,
});

defineSlots<{ default?: () => unknown }>();

const modeClass = computed(() => (props.forceAll ? 'animal-cursor--force' : 'animal-cursor--scoped'));
</script>

<template>
  <view :class="['animal-cursor', modeClass]">
    <slot />
  </view>
</template>

<style scoped>
/* #ifdef H5 */
/* 光标只在 H5 有意义，:deep() 用于覆盖组件 slot 中的后代元素。 */
.animal-cursor {
  cursor:
    url('../../assets/img/cursor/cursor-icon.png') 4 0,
    default;
}

/* force 模式让常见交互控件继承容器光标，但允许业务样式显式覆盖。 */
.animal-cursor--force
  :deep(
    :where(
      a[href],
      button,
      [role='button'],
      [role='link'],
      label[for],
      select,
      summary,
      input,
      textarea,
      [data-cursor='pointer']
    )
  ) {
  cursor: inherit;
}

.animal-cursor--scoped :deep(*) {
  cursor: auto;
}

.animal-cursor--scoped
  :deep(
    :where(
      a[href],
      button,
      [role='button'],
      [role='link'],
      label[for],
      select,
      summary,
      input[type='button'],
      input[type='submit'],
      input[type='reset'],
      input[type='checkbox'],
      input[type='radio'],
      [data-cursor='pointer']
    )
  ) {
  cursor: pointer;
}

.animal-cursor--scoped
  :deep(
    :where(
      input[type='text'],
      input[type='search'],
      input[type='email'],
      input[type='password'],
      input[type='number'],
      input[type='tel'],
      input[type='url'],
      textarea
    )
  ) {
  cursor: text;
}

.animal-cursor--scoped :deep(:where([disabled], [aria-disabled='true'])) {
  cursor: not-allowed;
}
/* #endif */
</style>
