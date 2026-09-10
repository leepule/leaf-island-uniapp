<script setup lang="ts">
import type { FooterType } from './types';

interface Props {
  type?: FooterType;
}

withDefaults(defineProps<Props>(), { type: 'sea' });
</script>

<template>
  <view class="animal-footer" :class="`animal-footer--${type}`" />
</template>

<style lang="less" scoped>
.animal-footer {
  width: 100%;
  height: 80px;
  background-repeat: no-repeat;

  &--sea {
    background: url('../../assets/img/footer/wave.svg') center / contain no-repeat;
  }
}
</style>
