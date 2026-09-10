<script setup lang="ts">
const FOOTER_API = [{ prop: 'type', desc: '底部装饰类型', type: `'sea'`, defaultVal: "'sea'" }];

const code = `<li-footer type="sea" />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="footer" />

      <view class="demo-label">sea 海（默认）</view>
      <li-footer type="sea" />

      <li-code-block title="使用示例" :code="code" />
      <ApiTable :rows="FOOTER_API" />
    </view>
  </AppLayout>
</template>
