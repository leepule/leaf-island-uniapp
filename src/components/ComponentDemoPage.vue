<script setup lang="ts">
interface ApiRow { prop: string; desc: string; type?: string; defaultVal?: string; required?: boolean }
defineProps<{ name: string; useCase: string; code: string; apiRows: ApiRow[] }>();
</script>
<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader :name="name" />
      <view class="demo-label">使用案例</view>
      <view class="demo-box component-demo"><slot /></view>
      <view class="demo-note">{{ useCase }}</view>
      <li-code-block title="使用代码" :code="code" />
      <ApiTable :rows="apiRows" />
    </view>
  </AppLayout>
</template>
<style scoped>.component-demo { display: flex; flex-direction: column; gap: 20rpx; }</style>
