<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CascaderOption, CascaderValue } from '../../uni_modules/leaf-island/components/li-cascader/types';
import { getChinaAreaOptions } from '../../uni_modules/leaf-island/area-data';

const region = ref<CascaderValue[]>([]);
const category = ref<CascaderValue[]>([]);
const department = ref<CascaderValue[]>([]);
const options = getChinaAreaOptions();
const categoryOptions: CascaderOption[] = [
  { label: '数码家电', value: 'digital', children: [
    { label: '手机通讯', value: 'phone', children: [
      { label: '智能手机', value: 'smartphone' },
      { label: '手机配件', value: 'phone-accessory' },
    ] },
    { label: '电脑办公', value: 'computer', children: [
      { label: '笔记本电脑', value: 'laptop' },
      { label: '办公设备', value: 'office-device' },
    ] },
  ] },
  { label: '服饰鞋包', value: 'fashion', children: [
    { label: '女装', value: 'women', children: [{ label: '连衣裙', value: 'dress' }, { label: '外套', value: 'coat' }] },
    { label: '箱包', value: 'bags', children: [{ label: '双肩包', value: 'backpack' }, { label: '手提包', value: 'handbag' }] },
  ] },
  { label: '食品生鲜（暂不可选）', value: 'food', disabled: true, children: [{ label: '水果', value: 'fruit' }] },
];
const departmentOptions: CascaderOption[] = [
  { label: '产品中心', value: 'product-center', children: [
    { label: '产品部', value: 'product', children: [{ label: '用户体验组', value: 'ux' }, { label: '业务产品组', value: 'business-product' }] },
    { label: '设计部', value: 'design', children: [{ label: '视觉设计组', value: 'visual' }, { label: '交互设计组', value: 'interaction' }] },
  ] },
  { label: '技术中心', value: 'tech-center', children: [
    { label: '研发部', value: 'engineering', children: [{ label: '前端组', value: 'frontend' }, { label: '服务端组', value: 'backend' }] },
    { label: '质量部', value: 'quality', children: [{ label: '测试组', value: 'testing' }] },
  ] },
];
function getPathLabels(tree: CascaderOption[], values: CascaderValue[]) {
  let current = tree;
  const labels: string[] = [];
  for (const value of values) {
    const selected = current.find((item) => String(item.value) === String(value));
    if (!selected) break;
    labels.push(selected.label);
    current = selected.children ?? [];
  }
  return labels;
}
const regionLabels = computed(() => getPathLabels(options, region.value));
const categoryLabels = computed(() => getPathLabels(categoryOptions, category.value));
const departmentLabels = computed(() => getPathLabels(departmentOptions, department.value));
const apiRows = [
  { prop: 'options', desc: '级联数据；每项含 label/value，可嵌套 children，也可设置 disabled', type: 'CascaderOption[]', defaultVal: '必填' },
  { prop: 'modelValue', desc: '当前选中的 value 路径，从根到叶子', type: '(string | number)[]', defaultVal: '[]' },
  { prop: 'open', desc: '弹层状态，可使用 v-model:open；不传时组件内部管理', type: 'boolean', defaultVal: '内部关闭' },
  { prop: 'title', desc: '面板标题', type: 'string', defaultVal: '请选择地区' },
  { prop: 'placeholder', desc: '未选择时的占位文案', type: 'string', defaultVal: '请选择' },
  { prop: 'separator', desc: '已选路径的显示分隔符', type: 'string', defaultVal: ' / ' },
  { prop: 'clearable', desc: '有选中路径时显示清除按钮', type: 'boolean', defaultVal: 'false' },
  { prop: 'disabled', desc: '禁用整个选择器', type: 'boolean', defaultVal: 'false' },
  { prop: 'update:modelValue / change', desc: '选择叶子项后同步值路径及对应选项路径', type: 'event(value, selectedOptions)', defaultVal: '-' },
  { prop: 'clear / update:open', desc: '清空路径和弹层状态变化事件', type: 'event', defaultVal: '-' },
];
const code = `import { getChinaAreaOptions } from '@/uni_modules/leaf-island/area-data';\n\nconst regionOptions = getChinaAreaOptions();\nconst categoryOptions = [\n  { label: '数码家电', value: 'digital', children: [\n    { label: '手机通讯', value: 'phone', children: [\n      { label: '智能手机', value: 'smartphone' },\n    ] },\n  ] },\n];\n\n<li-cascader v-model="region" :options="regionOptions" clearable />\n<li-cascader v-model="category" title="选择商品分类" :options="categoryOptions" />`;
</script>

<template>
  <ComponentDemoPage name="cascader" use-case="适用于省市区、商品分类、组织架构等多级选择。示例分别展示内置地区数据、自定义分类与部门树，以及整体禁用和单项禁用状态。" :code="code" :api-rows="apiRows">
    <view class="cascader-demo__group">
      <text class="cascader-demo__label">省市区（内置地区数据）</text>
      <li-cascader v-model="region" :options="options" clearable placeholder="请选择所在地区" />
      <text class="cascader-demo__result">当前地区：{{ regionLabels.length ? regionLabels.join(' / ') : '尚未选择' }}<text v-if="region.length">（代码：{{ region.join(' / ') }}）</text></text>
    </view>
    <view class="cascader-demo__group">
      <text class="cascader-demo__label">商品分类（含禁用项）</text>
      <li-cascader v-model="category" title="选择商品分类" :options="categoryOptions" clearable placeholder="请选择商品分类" />
      <text class="cascader-demo__result">当前分类：{{ categoryLabels.join(' / ') || '尚未选择' }}</text>
    </view>
    <view class="cascader-demo__group">
      <text class="cascader-demo__label">组织架构</text>
      <li-cascader v-model="department" title="选择所属部门" :options="departmentOptions" placeholder="请选择所属部门" />
      <text class="cascader-demo__result">当前部门：{{ departmentLabels.join(' / ') || '尚未选择' }}</text>
    </view>
    <view class="cascader-demo__group">
      <text class="cascader-demo__label">整体禁用</text>
      <li-cascader :options="options" disabled placeholder="禁用状态" />
    </view>
  </ComponentDemoPage>
</template>

<style lang="less" scoped>
.cascader-demo__group { display: flex; flex-direction: column; gap: 10rpx; }
.cascader-demo__label { color: #8c7d68; font-size: 14px; font-weight: 600; }
.cascader-demo__result { color: #8c7d68; font-size: 14px; line-height: 1.6; }
</style>
