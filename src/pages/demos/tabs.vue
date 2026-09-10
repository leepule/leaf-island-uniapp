<script setup lang="ts">
import { ref } from 'vue';
import type { TabItem } from '../../leaf-island';

const items: TabItem[] = [
  { key: 'tab1', label: '岛屿概况' },
  { key: 'tab2', label: '商店' },
  { key: 'tab3', label: '服务台' },
];

const activeKey = ref('tab1');

const TABS_API = [
  { prop: 'items', desc: '标签页配置列表', type: 'TabItem[]', defaultVal: '-', required: true },
  { prop: 'modelValue', desc: '当前激活标签；传入时受控，未传时使用内部状态', type: 'string', defaultVal: '-' },
  { prop: 'defaultActiveKey', desc: '非受控模式的默认激活标签', type: 'string', defaultVal: '第一个标签' },
  { prop: 'shadow', desc: '是否显示选中状态阴影', type: 'boolean', defaultVal: 'true' },
  { prop: 'leafAnimation', desc: '是否启用叶子动画', type: 'boolean', defaultVal: 'true' },
  { prop: 'slot[item.key]', desc: '通过同名 slot 提供每个 tab 内容', type: 'slot', defaultVal: '-' },
];

const code = `<script setup lang="ts">
const items: TabItem[] = [
    { key: 'tab1', label: '标签一' },
    { key: 'tab2', label: '标签二' },
];
const active = ref('tab1');
<\/script>

<template>
    <AppLayout>
    <li-tabs v-model="active" :items="items">
        <template #tab1><text>内容一</text></template>
        <template #tab2><text>内容二</text></template>
    </li-tabs>
    </AppLayout>
</template>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="tabs" />

      <view class="demo-label">基础用法（受控）</view>
      <view class="demo-box">
        <li-tabs v-model="activeKey" :items="items">
          <template #tab1><text>岛上有 10 位居民，今天天气晴朗，适合钓鱼。</text></template>
          <template #tab2><text>今日市集特惠：手工果篮 99 元。</text></template>
          <template #tab3><text>服务中心可以办理活动登记与物料领取。</text></template>
        </li-tabs>
      </view>

      <view class="demo-label">关闭叶子动画</view>
      <view class="demo-box">
        <li-tabs v-model="activeKey" :items="items" :leaf-animation="false">
          <template #tab1><text>关闭动画后的标签切换。</text></template>
          <template #tab2><text>关闭动画后的标签切换。</text></template>
          <template #tab3><text>关闭动画后的标签切换。</text></template>
        </li-tabs>
      </view>

      <li-code-block title="使用示例" :code="code" />
      <ApiTable :rows="TABS_API" />
    </view>
  </AppLayout>
</template>
