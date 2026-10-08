<script setup lang="ts">
import { ref } from 'vue';

const score = ref(3.5);
const apiRows = [
  { prop: 'modelValue', desc: '当前评分，传入时受控', type: 'number', defaultVal: 'undefined' },
  { prop: 'defaultValue', desc: '非受控模式的初始评分', type: 'number', defaultVal: '0' },
  { prop: 'count', desc: '星星数量', type: 'number', defaultVal: '5' },
  { prop: 'allowHalf', desc: '允许半星评分', type: 'boolean', defaultVal: 'false' },
  { prop: 'allowClear', desc: '再次点击当前评分时清零', type: 'boolean', defaultVal: 'false' },
  { prop: 'disabled / readonly', desc: '禁用交互或只读展示', type: 'boolean', defaultVal: 'false' },
  { prop: 'showText', desc: '显示对应的评分文案', type: 'boolean', defaultVal: 'false' },
  { prop: 'texts', desc: '每个整数评分对应的文案', type: 'string[]', defaultVal: '很差 / 较差 / 一般 / 不错 / 很好' },
  { prop: 'character', desc: '评分符号', type: 'string', defaultVal: '★' },
  { prop: 'color / voidColor', desc: '选中与未选中颜色', type: 'string', defaultVal: '#f2b544 / #ded8cb' },
  { prop: 'update:modelValue / change', desc: '评分变化时触发', type: 'event', defaultVal: '-' },
];
const code = `<li-rate v-model="score" allow-half show-text />
<li-rate :model-value="4" readonly />
<li-rate :model-value="2" disabled />`;
</script>

<template>
  <ComponentDemoPage name="rate" use-case="用于商品评价、服务反馈和内容打分。支持半星、键盘调整、只读展示以及自定义评分文案。" :code="code" :api-rows="apiRows">
    <view class="demo-line"><text class="demo-label">交互评分：{{ score }} 分</text><li-rate v-model="score" allow-half show-text /></view>
    <view class="demo-line"><text class="demo-label">只读展示</text><li-rate :model-value="4" readonly /></view>
    <view class="demo-line"><text class="demo-label">自定义符号</text><li-rate :model-value="3" character="♥" color="#e97983" readonly /></view>
    <view class="demo-line"><text class="demo-label">禁用状态</text><li-rate :model-value="2" disabled /></view>
  </ComponentDemoPage>
</template>

<style scoped>
.demo-line { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.demo-label { color: var(--animal-text-color-secondary, #8b7b66); font-size: 13px; }
</style>
