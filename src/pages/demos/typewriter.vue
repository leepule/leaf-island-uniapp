<script setup lang="ts">
import { ref } from 'vue';
const replayKey = ref(0);

const TYPEWRITER_API = [
    { prop: 'default', desc: '需要逐字显示的内容（slot）', type: 'slot', defaultVal: '-' },
    { prop: 'speed', desc: '每字间隔 (ms)', type: 'number', defaultVal: '90' },
    { prop: 'trigger', desc: '值变化时重新播放', type: 'unknown', defaultVal: '-' },
    { prop: 'autoPlay', desc: '是否自动从头开始播放', type: 'boolean', defaultVal: 'true' },
];

const code = `<AiTypewriter :trigger="key">你好，欢迎来到动物岛！</AiTypewriter>

<!-- 多行 / 富内容 -->
<AiTypewriter :speed="40" :trigger="key">
    <view>第一行</view>
    <view style="color: orange">第二行</view>
</AiTypewriter>

<AiButton @click="key++">重新播放</AiButton>`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="typewriter" />

        <view class="demo-label">基础用法</view>
        <view class="demo-dashed" style="margin-bottom: 40rpx">
            <AiTypewriter :trigger="replayKey">你好，欢迎来到动物岛！今天的天气真不错呢～</AiTypewriter>
        </view>

        <view class="demo-label">保留多行与富内容 (速度 40ms)</view>
        <view class="demo-dashed" style="display: flex; flex-direction: column; align-items: flex-start; gap: 16rpx; margin-bottom: 40rpx">
            <AiTypewriter :speed="40" :trigger="replayKey">
                <view>第一行：钓到石头了！</view>
                <view>第二行：竟然连这种都能钓起来...</view>
                <view style="color: #FD9303; font-weight: 700">第三行：继续加油吧！</view>
            </AiTypewriter>
        </view>

        <view class="demo-row">
            <AiButton type="primary" @click="replayKey++">重新播放</AiButton>
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="TYPEWRITER_API" />
    </view>
    </AppLayout>
</template>
