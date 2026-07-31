<script setup lang="ts">
import { ref } from 'vue';
const islandOptions = [
  { label: '🌊 海滩', value: 'beach' },
  { label: '🌳 森林', value: 'forest' },
  { label: '🌸 花园', value: 'garden' },
  { label: '🏡 村庄', value: 'village' },
];
const critterOptions = [
  { label: '🦋 蝴蝶', value: 'butterfly' },
  { label: '🐟 鲈鱼', value: 'bass' },
  { label: '🦀 螃蟹', value: 'crab', disabled: true },
  { label: '🐛 毛毛虫', value: 'caterpillar' },
  { label: '🌊 水母', value: 'jellyfish' },
];

const selected1 = ref<(string | number)[]>(['beach', 'garden']);
const selected2 = ref<(string | number)[]>([]);
const selected3 = ref<(string | number)[]>(['forest']);
const selected4 = ref<(string | number)[]>(['beach']);
const selected5 = ref<(string | number)[]>(['beach']);
const selected6 = ref<(string | number)[]>(['garden', 'village']);

const CHECKBOX_API = [
  { prop: 'options', desc: '选项列表', type: 'CheckboxOption[]', defaultVal: '-', required: true },
  {
    prop: 'modelValue',
    desc: '选中值列表；传入时受控，未传时使用内部状态',
    type: 'Array<string | number>',
    defaultVal: '[]（非受控）',
  },
  { prop: 'size', desc: '尺寸', type: `'small' | 'middle' | 'large'`, defaultVal: "'middle'" },
  { prop: 'disabled', desc: '禁用全部选项', type: 'boolean', defaultVal: 'false' },
  { prop: 'direction', desc: '排列方向', type: `'horizontal' | 'vertical'`, defaultVal: "'horizontal'" },
];

const code = `<ai-checkbox v-model="value" :options="options" />
<ai-checkbox :options="options" direction="vertical" />
<ai-checkbox :options="options" disabled />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="checkbox" />

      <view class="demo-label">默认水平排列（受控）</view>
      <view class="demo-box"
        >已选中：<text style="color: #19c8b9; font-weight: 600">{{
          selected1.length
            ? islandOptions
                .filter((o) => selected1.includes(o.value))
                .map((o) => o.label)
                .join('、')
            : '无'
        }}</text></view
      >
      <view class="demo-box"><ai-checkbox v-model="selected1" :options="islandOptions" /></view>

      <view class="demo-label">垂直排列 + 含禁用选项</view>
      <view class="demo-box"><ai-checkbox v-model="selected2" :options="critterOptions" direction="vertical" /></view>

      <view class="demo-label">小尺寸 / 中尺寸 / 大尺寸</view>
      <view class="demo-box"><ai-checkbox v-model="selected3" :options="islandOptions" size="small" /></view>
      <view class="demo-box"><ai-checkbox v-model="selected4" :options="islandOptions" size="middle" /></view>
      <view class="demo-box"
        ><ai-checkbox v-model="selected5" :options="islandOptions.slice(0, 3)" size="large"
      /></view>

      <view class="demo-label">全部禁用</view>
      <view class="demo-box"><ai-checkbox v-model="selected6" :options="islandOptions" disabled /></view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="CHECKBOX_API" />
    </view>
  </AppLayout>
</template>
