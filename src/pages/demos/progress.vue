<script setup lang="ts">
import { ref } from 'vue';
const percent = ref(36);
const apiRows = [
  { prop: 'percent', desc: '进度百分比，显示值限制在 0–100', type: 'number', defaultVal: '0' },
  { prop: 'status', desc: '进度状态', type: 'normal | success | exception', defaultVal: 'normal' },
  { prop: 'showInfo', desc: '显示百分比文本', type: 'boolean', defaultVal: 'true' },
  { prop: 'strokeColor', desc: '自定义进度颜色', type: 'string', defaultVal: '-' },
  { prop: 'indeterminate', desc: '显示不确定进度动画', type: 'boolean', defaultVal: 'false' },
];
const code = `<li-progress :percent="percent" />
<li-progress :percent="100" status="success" />
<li-progress indeterminate :show-info="false" />`;
</script>
<template>
  <ComponentDemoPage name="progress" use-case="用于上传、任务执行和分步加载。进度值由业务逻辑更新；未知总量的任务可使用 indeterminate。" :code="code" :api-rows="apiRows">
    <li-progress :percent="percent" />
    <li-progress :percent="100" status="success" />
    <li-progress :percent="68" status="exception" />
    <li-progress indeterminate :show-info="false" />
    <li-button size="small" @click="percent = percent >= 100 ? 0 : percent + 10">推进 10%（当前 {{ percent }}%）</li-button>
  </ComponentDemoPage>
</template>
