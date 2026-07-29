<script setup lang="ts">
import { ref } from 'vue';
const checked = ref(false);

const SWITCH_API = [
    { prop: 'modelValue / v-model', desc: '受控开关状态', type: 'boolean', defaultVal: '-' },
    { prop: 'defaultChecked', desc: '非受控默认值', type: 'boolean', defaultVal: 'false' },
    { prop: 'size', desc: '尺寸', type: `'small' | 'default'`, defaultVal: "'default'" },
    { prop: 'disabled', desc: '禁用', type: 'boolean', defaultVal: 'false' },
    { prop: 'loading', desc: '加载状态', type: 'boolean', defaultVal: 'false' },
    { prop: '#checked / #unchecked', desc: '选中文案插槽', type: 'slot', defaultVal: '-' },
];

const code = `<AiSwitch v-model="checked" />
<AiSwitch default-checked>
    <template #checked>
    <AppLayout>开    </AppLayout>
</template>
    <template #unchecked>关</template>
</AiSwitch>
<AiSwitch size="small" default-checked />
<AiSwitch disabled />
<AiSwitch loading default-checked />`;
</script>

<template>
    <view class="demo-page">
        <DemoHeader name="switch" />

        <view class="demo-label">基础用法</view>
        <view class="demo-row">
            <AiSwitch v-model="checked" />
            <text style="font-size: 26rpx">{{ checked ? 'ON' : 'OFF' }}</text>
        </view>

        <view class="demo-label">checked / unchecked 自定义文案</view>
        <view class="demo-row">
            <AiSwitch default-checked>
                <template #checked>开</template>
                <template #unchecked>关</template>
            </AiSwitch>
        </view>

        <view class="demo-label">size 尺寸</view>
        <view class="demo-row">
            <AiSwitch default-checked />
            <AiSwitch size="small" default-checked />
        </view>

        <view class="demo-label">disabled / loading 状态</view>
        <view class="demo-row">
            <AiSwitch disabled />
            <AiSwitch loading default-checked />
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="SWITCH_API" />
    </view>
</template>
