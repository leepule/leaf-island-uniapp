<script setup lang="ts">

const DIVIDER_API = [
    {
        prop: 'type',
        desc: '分隔线类型',
        type: `'line-brown' | 'line-teal' | 'line-white' | 'line-yellow' | 'wave-yellow' | 'dashed-brown' | 'dashed-teal' | 'dashed-white' | 'dashed-yellow'`,
        defaultVal: "'line-brown'",
    },
];

const code = `<AiDivider type="line-brown" />
<AiDivider type="line-teal" />
<AiDivider type="wave-yellow" />
<AiDivider type="dashed-brown" />`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="divider" />

        <view class="demo-label">line-brown</view>
        <AiDivider type="line-brown" />
        <view class="demo-label">line-teal</view>
        <AiDivider type="line-teal" />
        <view class="demo-label">line-white（深色背景）</view>
        <view style="background: #333; padding: 20rpx"><AiDivider type="line-white" /></view>
        <view class="demo-label">line-yellow</view>
        <AiDivider type="line-yellow" />
        <view class="demo-label">wave-yellow</view>
        <AiDivider type="wave-yellow" />

        <view class="demo-label">dashed-brown</view>
        <AiDivider type="dashed-brown" />
        <view class="demo-label">dashed-teal</view>
        <AiDivider type="dashed-teal" />
        <view class="demo-label">dashed-white（深色背景）</view>
        <view style="background: #333; padding: 20rpx"><AiDivider type="dashed-white" /></view>
        <view class="demo-label">dashed-yellow</view>
        <AiDivider type="dashed-yellow" />

        <AiCodeBlock :code="code" />
        <ApiTable :rows="DIVIDER_API" />
    </view>
    </AppLayout>
</template>
