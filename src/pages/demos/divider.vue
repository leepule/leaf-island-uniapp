<script setup lang="ts">
const DIVIDER_API = [
  {
    prop: 'type',
    desc: '分隔线类型',
    type: `'line-brown' | 'line-teal' | 'line-white' | 'line-yellow' | 'wave-yellow' | 'dashed-brown' | 'dashed-teal' | 'dashed-white' | 'dashed-yellow'`,
    defaultVal: "'line-brown'",
  },
];

const code = `<ai-divider type="line-brown" />
<ai-divider type="line-teal" />
<ai-divider type="wave-yellow" />
<ai-divider type="dashed-brown" />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="divider" />

      <view class="demo-label">line-brown</view>
      <ai-divider type="line-brown" />
      <view class="demo-label">line-teal</view>
      <ai-divider type="line-teal" />
      <view class="demo-label">line-white（深色背景）</view>
      <view style="background: #333; padding: 20rpx"><ai-divider type="line-white" /></view>
      <view class="demo-label">line-yellow</view>
      <ai-divider type="line-yellow" />
      <view class="demo-label">wave-yellow</view>
      <ai-divider type="wave-yellow" />

      <view class="demo-label">dashed-brown</view>
      <ai-divider type="dashed-brown" />
      <view class="demo-label">dashed-teal</view>
      <ai-divider type="dashed-teal" />
      <view class="demo-label">dashed-white（深色背景）</view>
      <view style="background: #333; padding: 20rpx"><ai-divider type="dashed-white" /></view>
      <view class="demo-label">dashed-yellow</view>
      <ai-divider type="dashed-yellow" />

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="DIVIDER_API" />
    </view>
  </AppLayout>
</template>
