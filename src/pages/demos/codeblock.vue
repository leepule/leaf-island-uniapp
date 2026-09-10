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
<li-button type="primary">上岛</li-button>
<li-title color="green">欢迎来到无人岛</li-title>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="codeblock" />

      <view class="demo-label">基础代码高亮</view>
      <li-code-block title="使用示例" :code="sample" />

      <view class="demo-label">HTML / Vue 片段</view>
      <li-code-block
        title="使用示例"
        code='<template>
    <li-button type="primary">上岛</li-button>
</template>'
      />

      <li-code-block title="使用示例" :code="`<li-code-block :code=&quot;const a = 1&quot; />`" />
      <ApiTable :rows="CODE_API" />
    </view>
  </AppLayout>
</template>
