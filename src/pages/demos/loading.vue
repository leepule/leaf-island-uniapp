<script setup lang="ts">
import { ref } from 'vue';
const loading = ref(true);

const LOADING_API = [
  { prop: 'active', desc: '是否显示加载动画', type: 'boolean', defaultVal: 'true' },
  { prop: 'text', desc: '加载提示文字，也支持默认 slot', type: 'string', defaultVal: "''" },
  { prop: 'color', desc: '弧线颜色', type: 'string', defaultVal: "'#19c8b9'" },
  { prop: 'size', desc: '图标大小（数字为 px，字符串如 48rpx）', type: 'number | string', defaultVal: '24' },
];

const code = `<!-- 纯图标（默认主题青绿色 #19c8b9） -->
<ai-loading />

<!-- 带文字 -->
<ai-loading text="拼命加载中" />

<!-- 自定义大小和颜色 -->
<ai-loading text="Loading..." :size="32" color="#725d42" />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="loading" />

      <view class="demo-label">默认加载</view>
      <view class="demo-box" style="display: flex; justify-content: center; padding: 60rpx">
        <ai-loading />
      </view>

      <view class="demo-label">带提示文字</view>
      <view class="demo-box" style="display: flex; justify-content: center; padding: 60rpx">
        <ai-loading text="拼命加载中" :size="32" />
      </view>

      <view class="demo-label">组件库主题色</view>
      <view class="demo-box" style="display: flex; justify-content: center; gap: 48rpx; padding: 60rpx">
        <ai-loading text="青绿" color="#19c8b9" :size="28" />
        <ai-loading text="草木绿" color="#7DC395" :size="28" />
        <ai-loading text="暖棕" color="#725d42" :size="28" />
      </view>

      <view class="demo-label">通过 active 控制显隐</view>
      <view class="demo-box" style="display: flex; flex-direction: column; align-items: center; gap: 24rpx">
        <view style="min-height: 120rpx; display: flex; align-items: center; justify-content: center">
          <ai-loading v-if="loading" text="加载中..." />
          <text v-else style="color: #19c8b9; font-weight: 700">加载完成！</text>
        </view>
        <ai-button type="primary" size="small" @click="loading = !loading">
          {{ loading ? '停止加载' : '开始加载' }}
        </ai-button>
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="LOADING_API" />
    </view>
  </AppLayout>
</template>
