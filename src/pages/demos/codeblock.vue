<script setup lang="ts">
const CODE_API = [
  {
    prop: 'code',
    desc: '代码字符串；超过 20,000 字符时展示原文但跳过高亮',
    type: 'string',
    defaultVal: '-',
    required: true,
  },
  { prop: 'title', desc: '代码块标题（如「使用示例」），为空则不显示标题条', type: 'string', defaultVal: "''" },
];

const sample = `<!-- easycom 自动引入，无需 import -->
<ai-button type="primary">上岛</ai-button>
<ai-title color="green">欢迎来到无人岛</ai-title>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="codeblock" />

      <view class="demo-label">基础代码高亮</view>
      <ai-code-block title="使用示例" :code="sample" />

      <view class="demo-label">HTML / Vue 片段</view>
      <ai-code-block
        title="使用示例"
        code='<template>
    <ai-button type="primary">上岛</ai-button>
</template>'
      />

      <ai-code-block title="使用示例" :code="`<ai-code-block :code=&quot;const a = 1&quot; />`" />
      <ApiTable :rows="CODE_API" />
    </view>
  </AppLayout>
</template>
