<script setup lang="ts">
import { ref } from 'vue';
import type { BreadcrumbItem } from '../../leaf-island';

const items = ref<BreadcrumbItem[]>([
  { key: 'home', label: '首页' },
  { key: 'guide', label: '岛屿指南' },
  { key: 'plants', label: '植物图鉴' },
]);
const apiRows = [
  { prop: 'items', desc: '面包屑项 key、label 和 disabled', type: 'BreadcrumbItem[]', defaultVal: '-', required: true },
  { prop: 'separator', desc: '分隔符文本', type: 'string', defaultVal: '/' },
  { prop: 'click', desc: '点击非当前且未禁用项时触发，返回 item 和 index', type: 'event', defaultVal: '-' },
  { prop: 'item / separator', desc: '自定义条目和分隔符', type: 'slot', defaultVal: '-' },
];
const code = `<li-breadcrumb :items="items" separator="›" @click="navigateTo" />`;

function navigateTo(item: BreadcrumbItem, index: number) {
  items.value = items.value.slice(0, index + 1);
}
function addLevel() {
  items.value = [...items.value, { key: `level-${items.value.length}`, label: `层级 ${items.value.length + 1}` }];
}
</script>

<template>
  <ComponentDemoPage name="breadcrumb" use-case="用于展示当前页面在信息架构中的位置。组件不负责路由跳转；点击上级项后由业务监听 click 并执行导航。" :code="code" :api-rows="apiRows">
    <li-breadcrumb :items="items" separator="›" @click="navigateTo" />
    <li-button size="small" @click="addLevel">添加层级</li-button>
    <text>点击任意上级可以回到该层。</text>
  </ComponentDemoPage>
</template>
