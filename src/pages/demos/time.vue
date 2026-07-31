<script setup lang="ts">
const TIME_API = [{ prop: '(无)', desc: '组件自动实时更新当前时间，无需传参', type: '-', defaultVal: '-' }];

const code = `<!-- 经典 HUD 风格时间，自动每秒更新 -->
<ai-time />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="time" />

      <view class="demo-label">实时时间显示（HUD 风格）</view>
      <view class="demo-box" style="display: flex; justify-content: center; padding: 50rpx">
        <ai-time />
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="TIME_API" />
    </view>
  </AppLayout>
</template>
