<script setup lang="ts">
import type { TableColumn } from '../../animal-island';

interface Critter extends Record<string, unknown> {
  key: string;
  name: string;
  kind: string;
  price: number;
}

const columns: TableColumn<Critter>[] = [
  { title: '名称', dataIndex: 'name', key: 'name', width: '40%' },
  { title: '类别', dataIndex: 'kind', key: 'kind' },
  { title: '售价(铃钱)', dataIndex: 'price', key: 'price', align: 'right' },
];

const data: Critter[] = [
  { key: '1', name: '鲈鱼', kind: '鱼', price: 200 },
  { key: '2', name: '皇带鱼', kind: '鱼', price: 9000 },
  { key: '3', name: '瓢虫', kind: '昆虫', price: 80 },
  { key: '4', name: '锹形虫', kind: '昆虫', price: 1000 },
];

const TABLE_API = [
  { prop: 'columns', desc: '列定义（title / dataIndex / key）', type: 'TableColumn[]', defaultVal: '[]' },
  { prop: 'dataSource', desc: '数据源', type: 'T[]', defaultVal: '[]' },
  { prop: 'striped', desc: '斑马纹', type: 'boolean', defaultVal: 'true' },
  { prop: 'loading', desc: '加载态', type: 'boolean', defaultVal: 'false' },
  { prop: 'emptyText', desc: '空态文案', type: 'string', defaultVal: "'暂无数据'" },
  { prop: 'slot[cell-x]', desc: '自定义单元格插槽', type: 'slot', defaultVal: '-' },
];

const code = `<script setup lang="ts">
const columns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '类别', dataIndex: 'kind', key: 'kind' },
    { title: '售价', dataIndex: 'price', key: 'price', align: 'right' },
];
const data = [
    { key: '1', name: '鲈鱼', kind: '鱼', price: 200 },
];
<\/script>

<template>
    <AppLayout>
    <ai-table :columns="columns" :data-source="data" />
    </AppLayout>
</template>`;
</script>

<template>
  <view class="demo-page">
    <DemoHeader name="table" />

    <view class="demo-note">小程序端不支持原生 table 标签，本组件内部已用 view + flex 重写，全平台表现一致。</view>

    <view class="demo-label">基础表格</view>
    <view class="demo-box" style="padding: 0; overflow: hidden">
      <ai-table :columns="columns" :data-source="data" />
    </view>

    <view class="demo-label">关闭斑马纹 + 自定义单元格</view>
    <view class="demo-box" style="padding: 0; overflow: hidden">
      <ai-table :columns="columns" :data-source="data" :striped="false">
        <template #cell-price="{ value }">
          <text style="color: #e0792b; font-weight: 700">{{ value }} 铃钱</text>
        </template>
      </ai-table>
    </view>

    <view class="demo-label">加载态 / 空态</view>
    <view class="demo-box" style="padding: 0; overflow: hidden">
      <ai-table :columns="columns" :data-source="[]" loading />
    </view>

    <ai-code-block title="使用示例" :code="code" />
    <ApiTable :rows="TABLE_API" />
  </view>
</template>
