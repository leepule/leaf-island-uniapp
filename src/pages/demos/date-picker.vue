<script setup lang="ts">
import { ref } from 'vue';
const date = ref('');
const year = ref('');
const range = ref<[string, string]>(['2026-10-12', '2026-10-13']);
const weekRange = ref<[string, string]>(['2026-10-05', '2026-10-11']);
const disabledDates = ['2026-10-14', '2026-10-20'];
const apiRows = [
  { prop: 'modelValue', desc: '单选时为日期字符串；mode=range 时为 [开始日期, 结束日期]', type: 'string | [string, string]', defaultVal: "''" },
  { prop: 'start / end', desc: '可选的最早和最晚日期', type: 'string', defaultVal: '-' },
  { prop: 'fields', desc: '选择粒度', type: 'year | month | day', defaultVal: 'day' },
  { prop: 'mode', desc: '单日期或日期范围；范围模式需选择开始和结束日期', type: 'single | range', defaultVal: 'single' },
  { prop: 'view', desc: '桌面日历选择粒度；week 模式显示整月日期，点击日期选择所在整周', type: 'month | week', defaultVal: 'month' },
  { prop: 'disabled-dates', desc: '不可选择的 yyyy-MM-dd 日期列表', type: 'string[]', defaultVal: '[]' },
  { prop: 'disabled-date', desc: '按日期判断是否禁用，参数格式为 yyyy-MM-dd', type: '(date: string) => boolean', defaultVal: '-' },
  { prop: 'value-format', desc: 'v-model 日期字符串格式，支持 yyyy、MM、dd 等日期令牌', type: 'string', defaultVal: '按 fields 自动设置' },
  { prop: 'placeholder', desc: '未选择时的提示文案', type: 'string', defaultVal: '请选择日期' },
  { prop: 'disabled', desc: '禁用选择器', type: 'boolean', defaultVal: 'false' },
  { prop: 'update:modelValue / change', desc: '选中后更新；范围模式返回 [start, end]', type: 'event', defaultVal: '-' },
];
const code = `<li-date-picker v-model="date" value-format="yyyy/MM/dd" start="2024-01-01" end="2035-12-31" />
<li-date-picker v-model="range" mode="range" :disabled-dates="disabledDates" />
<li-date-picker v-model="weekRange" mode="range" view="week" />
<li-date-picker v-model="year" fields="year" value-format="yyyy" />`;
</script>
<template>
  <ComponentDemoPage name="date-picker" use-case="预约、入住和日程筛选可使用范围模式。桌面端始终展示整月日期；周范围模式点击日期即可选中所在整周。disabled-dates / disabled-date 可排除不可选日期。移动端使用日期滚轮，并提供开始和结束日期切换。" :code="code" :api-rows="apiRows">
    <li-date-picker v-model="date" value-format="yyyy/MM/dd" start="2024-01-01" end="2035-12-31" />
    <text>选择结果：{{ date || '尚未选择' }}</text>
    <li-date-picker v-model="range" mode="range" start="2026-10-01" end="2026-10-31" :disabled-dates="disabledDates" />
    <text>日期范围：{{ range.join(' 至 ') }}</text>
    <li-date-picker v-model="weekRange" mode="range" view="week" start="2026-10-01" end="2026-10-31" />
    <text>周范围：{{ weekRange.join(' 至 ') }}</text>
    <li-date-picker v-model="year" fields="year" value-format="yyyy" placeholder="只选择年份" />
    <text>年份结果：{{ year || '尚未选择' }}</text>
  </ComponentDemoPage>
</template>
