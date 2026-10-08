<script setup lang="ts">
import type { TableColumn } from '../../leaf-island';

interface Critter extends Record<string, unknown> {
  key: string;
  name: string;
  kind: string;
  price: number;
}

const columns: TableColumn<Critter>[] = [
  { title: '名称', dataIndex: 'name', key: 'name', width: '40%' },
  { title: '类别', dataIndex: 'kind', key: 'kind' },
  { title: '售价(元)', dataIndex: 'price', key: 'price', align: 'right' },
];

const enhancedColumns: TableColumn<Critter>[] = [
  { title: '名称', dataIndex: 'name', key: 'name', width: 150, fixed: 'left', sorter: true },
  {
    title: '类别', dataIndex: 'kind', key: 'kind', width: 130,
    filters: [{ text: '鱼类', value: '鱼' }, { text: '昆虫', value: '昆虫' }],
  },
  { title: '售价(元)', dataIndex: 'price', key: 'price', width: 140, align: 'right', sorter: true },
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
  { prop: 'scroll', desc: '横向/纵向滚动尺寸；移动端横向滚动可设置 x', type: '{ x?: number | string; y?: number | string }', defaultVal: '-' },
  { prop: 'columns[].sorter', desc: '启用本地排序，或传入自定义比较函数', type: 'boolean | (a, b) => number', defaultVal: 'false' },
  { prop: 'columns[].filters', desc: '列筛选选项；默认支持多选，可设置 filterMultiple=false', type: 'TableFilter[]', defaultVal: '-' },
  { prop: 'columns[].fixed', desc: '水平滚动时固定列；固定列需设置像素宽度', type: 'left | right', defaultVal: '-' },
  { prop: 'sort-change / filter-change', desc: '排序或筛选条件变化时触发', type: 'event', defaultVal: '-' },
  { prop: 'slot[cell-x]', desc: '自定义单元格插槽', type: 'slot', defaultVal: '-' },
];

const code = `<li-table :columns="columns" :data-source="data" :scroll="{ x: 520 }" />

const columns = [
  { title: '名称', dataIndex: 'name', width: 150, fixed: 'left', sorter: true },
  { title: '类别', dataIndex: 'kind', filters: [{ text: '鱼类', value: '鱼' }] },
  { title: '售价', dataIndex: 'price', sorter: (a, b) => a.price - b.price },
];`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="table" />

      <view class="demo-note">小程序端不支持原生 table 标签，本组件内部用 view + flex 重写。排序和筛选在组件内处理；水平滚动时固定列需提供像素宽度。</view>

      <view class="demo-label">基础表格</view>
      <view class="demo-box" style="padding: 0; overflow: hidden">
        <li-table :columns="columns" :data-source="data" />
      </view>

      <view class="demo-label">关闭斑马纹 + 自定义单元格</view>
      <view class="demo-box" style="padding: 0; overflow: hidden">
        <li-table :columns="columns" :data-source="data" :striped="false">
          <template #cell-price="{ value }">
            <text style="color: #e0792b; font-weight: 700">{{ value }} 元</text>
          </template>
        </li-table>
      </view>

      <view class="demo-label">排序、筛选、固定列与横向滚动</view>
      <view class="demo-box" style="padding: 0; overflow: hidden">
        <li-table :columns="enhancedColumns" :data-source="data" :scroll="{ x: 520 }" />
      </view>

      <view class="demo-label">加载态</view>
      <view class="demo-box" style="padding: 0; overflow: hidden">
        <li-table :columns="columns" :data-source="[]" loading />
      </view>

      <view class="demo-label">空态</view>
      <view class="demo-box" style="padding: 0; overflow: hidden">
        <li-table :columns="columns" :data-source="[]" empty-text="还没有记录" />
      </view>

      <li-code-block title="使用示例" :code="code" />
      <ApiTable :rows="TABLE_API" />
    </view>
  </AppLayout>
</template>
