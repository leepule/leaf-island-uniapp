<script setup lang="ts">
import { ref } from 'vue';

const message = ref('尚未触发返回事件');
const apiRows = [
  { prop: 'title', desc: '导航栏标题', type: 'string', defaultVal: "''" },
  { prop: 'showBack / backText', desc: '显示返回入口及其文案', type: 'boolean / string', defaultVal: 'false / 返回' },
  { prop: 'fixed', desc: '固定在页面顶部；启用时自动插入占位高度', type: 'boolean', defaultVal: 'false' },
  { prop: 'safeArea', desc: '适配顶部安全区域', type: 'boolean', defaultVal: 'true' },
  { prop: 'bordered / shadow', desc: '显示底部分隔线或阴影', type: 'boolean', defaultVal: 'true / false' },
  { prop: 'background / color', desc: '自定义背景色和文字色', type: 'string', defaultVal: '主题变量' },
  { prop: 'autoBack', desc: '点击返回后调用 uni.navigateBack', type: 'boolean', defaultVal: 'false' },
  { prop: 'back', desc: '返回入口点击事件', type: 'event', defaultVal: '-' },
  { prop: 'left / default / right', desc: '左侧、标题、右侧插槽', type: 'slot', defaultVal: '-' },
];
const code = `<li-navbar title="岛屿首页" show-back @back="goBack">
  <template #right><text @click="openSettings">设置</text></template>
</li-navbar>`;
</script>

<template>
  <ComponentDemoPage name="navbar" use-case="用于页面顶部标题、返回入口和操作按钮。固定模式会保留占位高度；小程序页面可用 safeArea 适配刘海区域。" :code="code" :api-rows="apiRows">
    <li-navbar title="岛屿首页" show-back @back="message = '已触发 back 事件'">
      <template #right><text class="nav-action" @click="message = '点击了右侧操作'">设置</text></template>
    </li-navbar>
    <text>{{ message }}</text>
  </ComponentDemoPage>
</template>

<style scoped>
.nav-action { color: var(--animal-primary-color); font-size: 26rpx; }
</style>
