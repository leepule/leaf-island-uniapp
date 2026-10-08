<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
const apiRows = [
  { prop: 'show', desc: '显示状态，可使用 v-model:show', type: 'boolean', defaultVal: 'false' },
  { prop: 'message', desc: '提示内容', type: 'string', defaultVal: "''" },
  { prop: 'type', desc: '提示类型', type: 'success | error | warning | info', defaultVal: 'info' },
  { prop: 'duration', desc: '自动关闭时间，≤ 0 时不自动关闭', type: 'number', defaultVal: '2400' },
  { prop: 'position', desc: '显示位置', type: 'top | center | bottom', defaultVal: 'top' },
  { prop: 'update:show / close', desc: '状态更新 / 关闭事件', type: 'event', defaultVal: '-' },
  { prop: 'default', desc: '追加在 message 后的内容', type: 'slot', defaultVal: '-' },
];
const code = `<li-toast v-model:show="show" message="保存成功" type="success" />`;
</script>
<template>
  <ComponentDemoPage name="toast" use-case="适合保存成功、操作失败等短暂反馈；提示会自动关闭，也可以由业务状态控制显示。" :code="code" :api-rows="apiRows">
    <li-button type="primary" @click="show = true">模拟保存并提示</li-button>
    <text>点击后显示成功反馈，也可把 type 改为 error 或 warning。</text>
    <li-toast v-model:show="show" message="保存成功，岛民已经收到更新。" type="success" />
  </ComponentDemoPage>
</template>
