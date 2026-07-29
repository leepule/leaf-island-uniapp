<script setup lang="ts">

const FOOTER_API = [
    { prop: 'type', desc: '底部装饰类型', type: `'tree' | 'sea'`, defaultVal: "'tree'" },
];

const code = `<AiFooter type="tree" />
<AiFooter type="sea" />`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="footer" />

        <view class="demo-label">tree 树（默认）</view>
        <AiFooter type="tree" />

        <view class="demo-label">sea 海</view>
        <AiFooter type="sea" />

        <AiCodeBlock :code="code" />
        <ApiTable :rows="FOOTER_API" />
    </view>
    </AppLayout>
</template>
