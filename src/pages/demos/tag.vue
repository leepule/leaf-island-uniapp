<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(true);
const apiRows = [
  { prop: 'type', desc: '语义颜色', type: 'default | primary | success | warning | danger | info', defaultVal: 'default' },
  { prop: 'size', desc: '标签尺寸', type: 'small | middle | large', defaultVal: 'middle' },
  { prop: 'checkable', desc: '作为筛选标签切换选中状态', type: 'boolean', defaultVal: 'false' },
  { prop: 'modelValue', desc: '可选中标签的选中状态', type: 'boolean', defaultVal: 'undefined' },
  { prop: 'defaultChecked', desc: '非受控模式的初始选中状态', type: 'boolean', defaultVal: 'false' },
  { prop: 'closable', desc: '显示关闭按钮，关闭后组件隐藏并触发 close', type: 'boolean', defaultVal: 'false' },
  { prop: 'disabled', desc: '禁用选择和关闭操作', type: 'boolean', defaultVal: 'false' },
  { prop: 'update:modelValue / change / close', desc: '选中状态变化或关闭时触发', type: 'event', defaultVal: '-' },
  { prop: 'default', desc: '标签内容', type: 'slot', defaultVal: '-' },
];
const code = `<li-tag type="success">已完成</li-tag>
<li-tag v-model="selected" checkable type="primary">可筛选</li-tag>
<li-tag closable type="primary">标签一</li-tag>
<li-tag closable type="success">标签二</li-tag>
<li-tag closable>标签三</li-tag>`;
</script>

<template>
  <ComponentDemoPage name="tag" use-case="用语义颜色展示状态，也可设为可选中标签构建筛选条件；可关闭标签会在关闭后隐藏并发出事件。" :code="code" :api-rows="apiRows">
    <view class="demo-row">
      <li-tag>默认</li-tag>
      <li-tag type="primary">进行中</li-tag>
      <li-tag type="success">已完成</li-tag>
      <li-tag type="warning">待处理</li-tag>
      <li-tag type="danger">失败</li-tag>
      <li-tag type="info">提示</li-tag>
    </view>
    <view class="demo-row">
      <li-tag size="small">小标签</li-tag>
      <li-tag>中标签</li-tag>
      <li-tag size="large">大标签</li-tag>
      <li-tag v-model="selected" checkable type="primary">筛选：已选 {{ selected ? '✓' : '' }}</li-tag>
      <li-tag closable type="primary">标签一</li-tag>
      <li-tag closable type="success">标签二</li-tag>
      <li-tag closable>标签三</li-tag>
      <li-tag disabled checkable>禁用</li-tag>
    </view>
  </ComponentDemoPage>
</template>

<style scoped>
.demo-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
</style>
