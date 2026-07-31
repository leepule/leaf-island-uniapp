<script setup lang="ts">
const FOOTER_API = [{ prop: 'type', desc: '底部装饰类型', type: `'tree' | 'sea'`, defaultVal: "'tree'" }];

const code = `<ai-footer type="tree" />
<ai-footer type="sea" />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="footer" />

      <view class="demo-label">tree 树（默认）</view>
      <ai-footer type="tree" />

      <view class="demo-label">sea 海</view>
      <ai-footer type="sea" />

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="FOOTER_API" />
    </view>
  </AppLayout>
</template>
