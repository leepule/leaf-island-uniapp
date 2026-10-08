<script setup lang="ts">
import { ref } from 'vue';
const rightOpen = ref(false);
const bottomOpen = ref(false);
const apiRows = [
  { prop: 'open', desc: '显示状态，使用 v-model:open', type: 'boolean', defaultVal: 'false' },
  { prop: 'placement', desc: '抽屉展开方向', type: 'left | right | bottom', defaultVal: 'right' },
  { prop: 'title', desc: '标题文字', type: 'string', defaultVal: "''" },
  { prop: 'size', desc: '侧边抽屉宽度或底部抽屉高度', type: 'number | string', defaultVal: '80vw' },
  { prop: 'maskClosable', desc: '点击遮罩关闭', type: 'boolean', defaultVal: 'true' },
  { prop: 'update:open / close', desc: '状态更新 / 关闭事件', type: 'event', defaultVal: '-' },
  { prop: 'default / title / footer', desc: '内容、标题和底部操作插槽', type: 'slot', defaultVal: '-' },
];
const code = `<li-drawer v-model:open="open" title="筛选条件">
  <text>抽屉内容</text>
  <template #footer><li-button block>应用筛选</li-button></template>
</li-drawer>`;
</script>
<template>
  <ComponentDemoPage name="drawer" use-case="筛选条件、次级导航或移动端操作面板可放入抽屉；支持右侧和底部两种常见布局。" :code="code" :api-rows="apiRows">
    <view class="demo-row"><li-button type="primary" @click="rightOpen = true">打开右侧抽屉</li-button><li-button @click="bottomOpen = true">打开底部抽屉</li-button></view>
    <li-drawer v-model:open="rightOpen" title="岛屿筛选"><text>选择地区、季节或活动类型。</text><template #footer><li-button type="primary" block @click="rightOpen = false">应用筛选</li-button></template></li-drawer>
    <li-drawer v-model:open="bottomOpen" placement="bottom" size="60vh" title="快速操作"><text>移动端常用底部操作面板。</text></li-drawer>
  </ComponentDemoPage>
</template>
