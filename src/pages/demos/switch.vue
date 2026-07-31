<script setup lang="ts">
import { ref } from 'vue';
const checked = ref(false);

const SWITCH_API = [
  { prop: 'modelValue / v-model', desc: '开关状态；传入时受控，未传时使用内部状态', type: 'boolean', defaultVal: '-' },
  { prop: 'defaultChecked', desc: '非受控默认值', type: 'boolean', defaultVal: 'false' },
  { prop: 'size', desc: '尺寸', type: `'small' | 'default'`, defaultVal: "'default'" },
  { prop: 'disabled', desc: '禁用', type: 'boolean', defaultVal: 'false' },
  { prop: 'loading', desc: '加载状态', type: 'boolean', defaultVal: 'false' },
  { prop: '#checked / #unchecked', desc: '选中文案插槽', type: 'slot', defaultVal: '-' },
];

const code = `<ai-switch v-model="checked" />
<ai-switch default-checked>
    <template #checked>
    <AppLayout>开    </AppLayout>
</template>
    <template #unchecked>关</template>
</ai-switch>
<ai-switch size="small" default-checked />
<ai-switch disabled />
<ai-switch loading default-checked />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="switch" />

      <view class="demo-label">基础用法</view>
      <view class="demo-row">
        <ai-switch v-model="checked" />
        <text style="font-size: 26rpx">{{ checked ? 'ON' : 'OFF' }}</text>
      </view>

      <view class="demo-label">checked / unchecked 自定义文案</view>
      <view class="demo-row">
        <ai-switch default-checked>
          <template #checked>开</template>
          <template #unchecked>关</template>
        </ai-switch>
      </view>

      <view class="demo-label">size 尺寸</view>
      <view class="demo-row">
        <ai-switch default-checked />
        <ai-switch size="small" default-checked />
      </view>

      <view class="demo-label">disabled / loading 状态</view>
      <view class="demo-row">
        <ai-switch disabled />
        <ai-switch loading default-checked />
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="SWITCH_API" />
    </view>
  </AppLayout>
</template>
