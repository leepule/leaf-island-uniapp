<script setup lang="ts">
import { ref } from 'vue';
const seasonOptions = [
  { label: '🌸 春天', value: 'spring' },
  { label: '☀️ 夏天', value: 'summer' },
  { label: '🍁 秋天', value: 'autumn' },
  { label: '❄️ 冬天', value: 'winter' },
];
const fruitOptions = [
  { label: '🍎 苹果', value: 'apple' },
  { label: '🍊 橙子', value: 'orange' },
  { label: '🍑 桃子', value: 'peach' },
  { label: '🍐 梨子', value: 'pear', disabled: true },
  { label: '🍒 樱桃', value: 'cherry' },
];
const timeOptions = [
  { label: '🌅 早晨', value: 'morning' },
  { label: '🌞 中午', value: 'noon' },
  { label: '🌇 傍晚', value: 'evening' },
  { label: '🌙 深夜', value: 'night' },
];

const selected1 = ref<string | number>('spring');
const selected2 = ref<string | number>('');
const selected3 = ref<string | number>('noon');
const selected4 = ref<string | number>('morning');
const selected5 = ref<string | number>('winter');

const RADIO_API = [
  { prop: 'options', desc: '选项列表', type: 'RadioOption[]', defaultVal: '-', required: true },
  {
    prop: 'modelValue',
    desc: '选中值；传入时受控，未传时使用内部状态',
    type: 'string | number',
    defaultVal: '未选中（非受控）',
  },
  { prop: 'size', desc: '尺寸', type: `'small' | 'middle' | 'large'`, defaultVal: "'middle'" },
  { prop: 'disabled', desc: '禁用全部选项', type: 'boolean', defaultVal: 'false' },
  { prop: 'direction', desc: '排列方向', type: `'horizontal' | 'vertical'`, defaultVal: "'horizontal'" },
];

const code = `<ai-radio v-model="value" :options="options" />
<ai-radio :options="options" direction="vertical" />
<ai-radio :options="options" disabled />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="radio" />

      <view class="demo-label">水平排列（受控）</view>
      <view class="demo-box"
        >已选中：<text style="color: #19c8b9; font-weight: 600">{{
          seasonOptions.find((o) => o.value === selected1)?.label ?? '无'
        }}</text></view
      >
      <view class="demo-box"><ai-radio v-model="selected1" :options="seasonOptions" /></view>

      <view class="demo-label">垂直排列 + 含禁用选项</view>
      <view class="demo-box"><ai-radio v-model="selected2" :options="fruitOptions" direction="vertical" /></view>

      <view class="demo-label">小尺寸 / 大尺寸</view>
      <view class="demo-box"><ai-radio v-model="selected4" :options="timeOptions" size="small" /></view>
      <view class="demo-box"><ai-radio v-model="selected3" :options="timeOptions" size="large" /></view>

      <view class="demo-label">全部禁用</view>
      <view class="demo-box"><ai-radio v-model="selected5" :options="seasonOptions" disabled /></view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="RADIO_API" />
    </view>
  </AppLayout>
</template>
