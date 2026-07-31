<script setup lang="ts">
import { computed } from 'vue';
import { highlightCode } from './highlight';

interface Props {
  code: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
});

const segments = computed(() => highlightCode(props.code));
</script>

<template>
  <pre class="animal-code-block"><view v-if="title" class="animal-code-block__title">{{ title }}</view><text
        v-for="(seg, i) in segments"
        :key="i"
        :style="{ color: seg.color }"
    >{{ seg.text }}</text></pre>
</template>

<style lang="less" scoped>
.animal-code-block__title {
  display: block;
  background: #3d3028;
  color: #e7e4e0;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  margin: -20px -24px 20px;
  border-radius: 20px 20px 0 0;
}
.animal-code-block {
  margin-top: 40rpx;
  padding: 20px 24px;
  background: #2b2118;
  border: 1px solid #3d3028;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.7;
  font-weight: 600;
  color: #e8d5bc;
  overflow: auto;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  white-space: pre;
  tab-size: 4;
}
</style>
