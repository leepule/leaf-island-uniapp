<script setup lang="ts">
import { ref } from 'vue';
const inputValue = ref('');

const INPUT_API = [
    { prop: 'modelValue / v-model', desc: '输入框值', type: 'string', defaultVal: '-' },
    { prop: 'size', desc: '输入框尺寸', type: `'small' | 'middle' | 'large'`, defaultVal: "'middle'" },
    { prop: 'prefix / suffix', desc: '前后缀', type: 'string | slot', defaultVal: '-' },
    { prop: 'allowClear', desc: '允许清除', type: 'boolean', defaultVal: 'false' },
    { prop: 'status', desc: '校验状态', type: `'error' | 'warning'`, defaultVal: '-' },
    { prop: 'shadow', desc: '是否显示阴影', type: 'boolean', defaultVal: 'false' },
];

const code = `<AiInput placeholder="Basic input" />
<AiInput v-model="value" placeholder="With clear" allow-clear />
<AiInput placeholder="Prefix & Suffix" prefix="🔍" suffix="⏎" />
<AiInput placeholder="Small" size="small" />
<AiInput placeholder="Large" size="large" />
<AiInput placeholder="Error" status="error" />`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="input" />

        <view class="demo-label">shadow 阴影控制</view>
        <view class="demo-col">
            <AiInput placeholder="No shadow (default)" />
            <AiInput placeholder="With shadow" :shadow="true" />
        </view>

        <view class="demo-label">基础用法</view>
        <view class="demo-col">
            <AiInput placeholder="Basic input" />
            <AiInput v-model="inputValue" placeholder="With clear" allow-clear @clear="inputValue = ''" />
            <AiInput placeholder="Prefix & Suffix" prefix="🔍" suffix="⏎" />
        </view>

        <view class="demo-label">size 尺寸</view>
        <view class="demo-col">
            <AiInput placeholder="Small" size="small" />
            <AiInput placeholder="Middle (default)" size="middle" />
            <AiInput placeholder="Large" size="large" />
        </view>

        <view class="demo-label">status 校验状态</view>
        <view class="demo-col">
            <AiInput placeholder="Error status" status="error" />
            <AiInput placeholder="Warning status" status="warning" />
        </view>

        <view class="demo-label">disabled 禁用</view>
        <view class="demo-col">
            <AiInput placeholder="Disabled" disabled />
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="INPUT_API" />
    </view>
    </AppLayout>
</template>
