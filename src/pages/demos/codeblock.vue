<script setup lang="ts">

const CODE_API = [
    { prop: 'code', desc: '需要高亮显示的代码字符串', type: 'string', defaultVal: '-', required: true },
];

const sample = `// 引入组件库
import { Button, Title } from 'animal-island-vue';

// 渲染一个动森风按钮
createApp(App)
  .use(Button)
  .mount('#app');`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="codeblock" />

        <view class="demo-label">基础代码高亮</view>
        <AiCodeBlock :code="sample" />

        <view class="demo-label">HTML / Vue 片段</view>
        <AiCodeBlock code="<template>
    <Button type=&quot;primary&quot;>上岛</Button>
</template>" />

        <AiCodeBlock :code="`<AiCodeBlock :code=&quot;const a = 1&quot; />`" />
        <ApiTable :rows="CODE_API" />
    </view>
    </AppLayout>
</template>
