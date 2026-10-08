<script setup lang="ts">
import { ref } from 'vue';
const page = ref(1);
const apiRows = [
  { prop: 'modelValue', desc: '当前页码，可使用 v-model', type: 'number', defaultVal: '1' },
  { prop: 'total', desc: '记录总数，必填', type: 'number', defaultVal: '-', required: true },
  { prop: 'pageSize', desc: '每页记录数', type: 'number', defaultVal: '10' },
  { prop: 'disabled', desc: '禁用分页操作', type: 'boolean', defaultVal: 'false' },
  { prop: 'update:modelValue / change', desc: '页码更新事件；组件不负责数据切片或请求', type: 'event', defaultVal: '-' },
];
const code = `<li-pagination v-model="page" :total="127" :page-size="10" />`;
</script>
<template>
  <ComponentDemoPage name="pagination" use-case="长列表或表格使用分页控制当前页。监听页码变化后由业务代码请求数据或切片。" :code="code" :api-rows="apiRows">
    <view class="pagination-demo">
      <li-pagination v-model="page" :total="127" :page-size="10" />
      <text class="pagination-summary">当前第 {{ page }} 页，共 13 页。</text>
    </view>
  </ComponentDemoPage>
</template>

<style scoped>
.pagination-demo { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 18px; }
.pagination-summary { display: flex; align-items: center; min-height: 36px; color: #655540; line-height: 1.4; }
</style>
