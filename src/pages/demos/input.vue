<script setup lang="ts">
import { ref } from 'vue';
const inputValue = ref('');

const INPUT_API = [
  { prop: 'modelValue / v-model', desc: '输入框值', type: 'string', defaultVal: '-' },
  { prop: 'size', desc: '输入框尺寸', type: `'small' | 'middle' | 'large'`, defaultVal: "'middle'" },
  { prop: 'prefix / suffix', desc: '前后缀', type: 'string | slot', defaultVal: '-' },
  { prop: 'allowClear', desc: '允许清除', type: 'boolean', defaultVal: 'false' },
  { prop: 'status', desc: '校验状态', type: `'error' | 'warning'`, defaultVal: '-' },
  { prop: 'shadow', desc: '是否显示阴影', type: 'boolean', defaultVal: 'false' },
];

const code = `<ai-input placeholder="Basic input" />
<ai-input v-model="value" placeholder="With clear" allow-clear />
<ai-input placeholder="Prefix & Suffix" prefix="🔍" suffix="⏎" />
<ai-input placeholder="Small" size="small" />
<ai-input placeholder="Large" size="large" />
<ai-input placeholder="Error" status="error" />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="input" />

      <view class="demo-label">shadow 阴影控制</view>
      <view class="demo-col">
        <ai-input placeholder="No shadow (default)" />
        <ai-input placeholder="With shadow" :shadow="true" />
      </view>

      <view class="demo-label">基础用法</view>
      <view class="demo-col">
        <ai-input placeholder="Basic input" />
        <ai-input v-model="inputValue" placeholder="With clear" allow-clear @clear="inputValue = ''" />
        <ai-input placeholder="Prefix & Suffix" prefix="🔍" suffix="⏎" />
      </view>

      <view class="demo-label">size 尺寸</view>
      <view class="demo-col">
        <ai-input placeholder="Small" size="small" />
        <ai-input placeholder="Middle (default)" size="middle" />
        <ai-input placeholder="Large" size="large" />
      </view>

      <view class="demo-label">status 校验状态</view>
      <view class="demo-col">
        <ai-input placeholder="Error status" status="error" />
        <ai-input placeholder="Warning status" status="warning" />
      </view>

      <view class="demo-label">disabled 禁用</view>
      <view class="demo-col">
        <ai-input placeholder="Disabled" disabled />
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="INPUT_API" />
    </view>
  </AppLayout>
</template>
