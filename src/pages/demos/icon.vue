<script setup lang="ts">
import { ICON_LIST } from '../../animal-island';

const ICON_API = [
    { prop: 'name', desc: '图标名称', type: 'IconName', defaultVal: '-', required: true },
    { prop: 'size', desc: '图标尺寸', type: 'number | string', defaultVal: '24' },
    { prop: 'bounce', desc: '弹跳动画', type: 'boolean', defaultVal: 'false' },
];

const code = `<AiIcon name="icon-miles" :size="32" />
<AiIcon name="icon-camera" :size="48" bounce />`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="icon" />

        <view class="demo-label">基础用法</view>
        <view class="demo-row">
            <AiIcon name="icon-miles" :size="32" />
            <AiIcon name="icon-camera" :size="32" />
            <AiIcon name="icon-chat" :size="32" />
            <AiIcon name="icon-design" :size="32" />
            <AiIcon name="icon-map" :size="32" />
        </view>

        <view class="demo-label">size 尺寸</view>
        <view class="demo-row">
            <AiIcon name="icon-miles" :size="16" />
            <AiIcon name="icon-miles" :size="24" />
            <AiIcon name="icon-miles" :size="32" />
            <AiIcon name="icon-miles" :size="48" />
        </view>

        <view class="demo-label">bounce 弹跳动画（H5 悬停查看效果）</view>
        <view class="demo-row">
            <AiIcon name="icon-miles" :size="32" bounce />
            <AiIcon name="icon-camera" :size="32" bounce />
            <AiIcon name="icon-chat" :size="32" bounce />
        </view>

        <view class="demo-label">图标列表</view>
        <view class="demo-box">
            <view
                v-for="(icon, idx) in ICON_LIST"
                :key="icon.name"
                style="display: flex; align-items: center; gap: 20rpx; padding: 24rpx 10rpx; border-bottom: 1px dashed #f0e8d8"
            >
                <AiIcon :name="icon.name" :size="32" />
                <text style="font-size: 28rpx; color: #725d42">{{ icon.label }}</text>
                <text style="margin-left: auto; font-size: 24rpx; color: #a0936e; font-family: monospace; word-break: break-all; max-width: 50%; text-align: right">{{ icon.name }}</text>
            </view>
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="ICON_API" />
    </view>
    </AppLayout>
</template>
