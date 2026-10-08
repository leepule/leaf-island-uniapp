<script setup lang="ts">
import { ref } from 'vue';

const keyword = ref('');
const lastSearch = ref('');
const history = ['海岛旅行', '自然观察', '露营攻略'];
const apiRows = [
  { prop: 'modelValue', desc: '搜索关键词，可使用 v-model', type: 'string', defaultVal: "''" },
  { prop: 'placeholder', desc: '输入提示文案', type: 'string', defaultVal: '请输入关键词' },
  { prop: 'buttonText', desc: '搜索按钮文案', type: 'string', defaultVal: '搜索' },
  { prop: 'clearable', desc: '有关键词时显示清除按钮', type: 'boolean', defaultVal: 'false' },
  { prop: 'disabled', desc: '禁用输入、清除和搜索', type: 'boolean', defaultVal: 'false' },
  { prop: 'update:modelValue', desc: '输入或清除关键词时触发', type: 'event(value)', defaultVal: '-' },
  { prop: 'search', desc: '点击搜索、按键盘搜索键或选择历史词时触发', type: 'event(keyword)', defaultVal: '-' },
  { prop: 'clear', desc: '点击清除按钮后触发', type: 'event', defaultVal: '-' },
  { prop: 'history', desc: '历史词内容插槽；提供 value、search(keyword)、clear 方法', type: 'slot', defaultVal: '-' },
];
const code = `<li-search v-model="keyword" placeholder="搜索活动" clearable @search="handleSearch">
  <template #history="{ search }">
    <text @click="search('海岛旅行')">海岛旅行</text>
  </template>
</li-search>`;

function handleSearch(value: string) {
  lastSearch.value = value;
}
</script>

<template>
  <ComponentDemoPage name="search" use-case="搜索列表或内容；支持输入清除、点击按钮或键盘搜索键提交，并可用 history 插槽展示可点击的历史关键词。" :code="code" :api-rows="apiRows">
    <li-search v-model="keyword" placeholder="搜索岛屿活动" clearable @search="handleSearch" @clear="lastSearch = ''">
      <template #history="{ search }">
        <view class="search-demo__history">
          <text class="search-demo__label">最近搜索</text>
          <text v-for="item in history" :key="item" class="search-demo__chip" @click="search(item)">{{ item }}</text>
        </view>
      </template>
    </li-search>
    <text class="search-demo__result">{{ lastSearch ? `最近一次搜索：${lastSearch}` : '输入关键词，或点选历史词试试' }}</text>
  </ComponentDemoPage>
</template>

<style lang="less" scoped>
.search-demo__history { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.search-demo__label { color: #9f927d; font-size: 13px; }
.search-demo__chip { padding: 5px 11px; border: 1px solid #e8e2d6; border-radius: 20px; background: #fffdf7; color: #725d42; font-size: 13px; }
.search-demo__result { color: #8c7d68; font-size: 14px; }
</style>
