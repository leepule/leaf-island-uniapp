<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
const apiRows = [
  { prop: 'open', desc: '显示状态，使用 v-model:open', type: 'boolean', defaultVal: 'false' },
  { prop: 'placement', desc: '气泡方向', type: 'top | bottom | left | right', defaultVal: 'bottom' },
  { prop: 'title', desc: '面板标题', type: 'string', defaultVal: "''" },
  { prop: 'trigger', desc: '点击触发或由外部手动控制', type: 'click | manual', defaultVal: 'click' },
  { prop: 'update:open / change', desc: '状态更新事件', type: 'event', defaultVal: '-' },
  { prop: 'default / content', desc: '触发器 / 气泡内容插槽', type: 'slot', defaultVal: '-' },
];
const code = `<li-popover v-model:open="open" title="快速操作" placement="bottom">
  <li-button>更多操作</li-button>
  <template #content><text>查看详情 · 分享</text></template>
</li-popover>`;
</script>
<template>
  <ComponentDemoPage name="popover" use-case="在按钮旁展示少量上下文操作。H5 会按触发器定位并限制在视口内，小程序使用组件内定位。" :code="code" :api-rows="apiRows">
    <li-popover v-model:open="open" title="快速操作" placement="bottom"><li-button>点此打开</li-button><template #content><view class="popover-content">查看岛屿 · 分享旅程</view></template></li-popover>
    <text>当前状态：{{ open ? '已打开' : '已关闭' }}</text>
  </ComponentDemoPage>
</template>
<style scoped>.popover-content { padding: 8px 0; color: #806f58; }</style>
