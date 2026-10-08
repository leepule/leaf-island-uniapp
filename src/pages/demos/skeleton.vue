<script setup lang="ts">
import { ref } from 'vue';
const loading = ref(true);
const apiRows = [
  { prop: 'active', desc: '显示骨架占位；关闭后显示 default 插槽', type: 'boolean', defaultVal: 'true' },
  { prop: 'rows', desc: '文本占位行数，限制为 1–10', type: 'number', defaultVal: '3' },
  { prop: 'avatar', desc: '显示头像占位', type: 'boolean', defaultVal: 'false' },
  { prop: 'title', desc: '显示标题占位', type: 'boolean', defaultVal: 'true' },
  { prop: 'default', desc: '加载结束后展示的真实内容', type: 'slot', defaultVal: '-' },
];
const code = `<li-skeleton v-if="loading" avatar :rows="3" />
<li-skeleton v-else :active="false">
  <text>加载完成的内容</text>
</li-skeleton>`;
</script>
<template>
  <ComponentDemoPage name="skeleton" use-case="请求页面数据时用骨架屏保持版面稳定；拿到数据后展示真实内容，可切换状态预览。" :code="code" :api-rows="apiRows">
    <view class="demo-box"><li-skeleton v-if="loading" avatar :rows="3" /><text v-else>岛屿天气晴朗，适合出门散步。</text></view>
    <li-button size="small" @click="loading = !loading">{{ loading ? '模拟加载完成' : '重新加载' }}</li-button>
  </ComponentDemoPage>
</template>
