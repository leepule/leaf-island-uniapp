<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(true);
const apiRows = [
  { prop: 'open', desc: '显示状态；传入时受控', type: 'boolean', defaultVal: 'true' },
  { prop: 'type', desc: '通知类型', type: 'success | error | warning | info', defaultVal: 'info' },
  { prop: 'title / description', desc: '标题与说明文字', type: 'string', defaultVal: "''" },
  { prop: 'closable', desc: '显示关闭按钮', type: 'boolean', defaultVal: 'false' },
  { prop: 'update:open / close', desc: '状态更新 / 关闭事件', type: 'event', defaultVal: '-' },
  { prop: 'default', desc: '补充通知正文', type: 'slot', defaultVal: '-' },
];
const code = `<li-notification type="warning" title="请检查网络" closable
  description="离线期间的更改会暂存在本机。" />`;
</script>
<template>
  <ComponentDemoPage name="notification" use-case="通知需要持续显示的重要状态，例如网络异常、配置提醒或后台任务完成。与短暂 Toast 不同，通知不会自动消失。" :code="code" :api-rows="apiRows">
    <li-button size="small" @click="visible = !visible">{{ visible ? '隐藏通知' : '显示通知' }}</li-button>
    <li-notification v-model:open="visible" type="warning" title="请检查网络" description="离线期间的更改会暂存在本机。" closable />
    <li-notification type="success" title="同步完成" description="岛屿资料已保存。" />
  </ComponentDemoPage>
</template>
