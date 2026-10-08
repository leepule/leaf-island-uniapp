<script setup lang="ts">
import { ref } from 'vue';
import type { TabbarItem } from '../../leaf-island';

const active = ref('home');
const items: TabbarItem[] = [
  { key: 'home', label: '首页', icon: 'House' },
  { key: 'discover', label: '发现', icon: 'Compass', badge: 2 },
  { key: 'profile', label: '我的', icon: 'UserRound' },
];
const apiRows = [
  { prop: 'items', desc: '导航项 key、label、icon、badge 和 disabled', type: 'TabbarItem[]', defaultVal: '-', required: true },
  { prop: 'modelValue', desc: '受控当前项；支持 v-model', type: 'string', defaultVal: '-' },
  { prop: 'defaultActiveKey', desc: '非受控初始项', type: 'string', defaultVal: '第一个导航项' },
  { prop: 'fixed', desc: '固定在屏幕底部并插入占位高度', type: 'boolean', defaultVal: 'true' },
  { prop: 'safeArea / bordered', desc: '适配底部安全区 / 显示上边框', type: 'boolean', defaultVal: 'true / true' },
  { prop: 'activeColor / inactiveColor', desc: '自定义选中和未选中文字色', type: 'string', defaultVal: '主题变量' },
  { prop: 'change', desc: '选择变化时返回 key 和 item', type: 'event', defaultVal: '-' },
  { prop: 'item', desc: '自定义每个导航项内容', type: 'slot', defaultVal: '-' },
];
const code = `<li-tabbar v-model="active" :items="items" @change="onChange" />`;
function onChange(key: string) {
  active.value = key;
}
</script>

<template>
  <ComponentDemoPage name="tabbar" use-case="用于移动端一级页面切换。固定模式适合应用主导航；切换只更新选中状态并触发 change，不会自行执行路由跳转。" :code="code" :api-rows="apiRows">
    <li-tabbar v-model="active" :items="items" :fixed="false" @change="onChange" />
    <text>当前选中：{{ active }}</text>
    <view class="tabbar-spacer" />
  </ComponentDemoPage>
</template>

<style scoped>
.tabbar-spacer { height: 80rpx; }
</style>
