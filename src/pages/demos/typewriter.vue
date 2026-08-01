<script setup lang="ts">
import { ref } from 'vue';
const replayKey = ref(0);

const TYPEWRITER_API = [
  { prop: 'text', desc: '纯文本内容（推荐，支持 \\n 换行，跨平台兼容性最好）', type: 'string', defaultVal: '-' },
  { prop: 'default', desc: 'slot 内容（H5 自动支持；小程序需配合 :rich="true"）', type: 'slot', defaultVal: '-' },
  { prop: 'speed', desc: '每字间隔 (ms)', type: 'number', defaultVal: '90' },
  { prop: 'trigger', desc: '值变化时重新播放', type: 'unknown', defaultVal: '-' },
  { prop: 'autoPlay', desc: '是否自动从头开始播放', type: 'boolean', defaultVal: 'true' },
  { prop: 'rich', desc: '标记 slot 为富内容（小程序跳过逐字动画；H5/App 自动支持）', type: 'boolean', defaultVal: 'false' },
];

const code = `<ai-typewriter :trigger="key" text="你好，欢迎来到动物岛！" />

<!-- 多行纯文本（支持 \\n 换行，有打字机效果） -->
<ai-typewriter :speed="40" :trigger="key" text="第一行：钓到石头了！\\n第二行：竟然连这种都能钓起来...\\n第三行：继续加油吧！" />

<!-- 富内容：H5/App 支持逐字动画；小程序需 :rich="true" 直接显示 -->
<ai-typewriter :speed="40" :trigger="key" :rich="true">
    <view>第一行</view>
    <view style="color: orange">第二行</view>
</ai-typewriter>

<ai-button @click="key++">重新播放</ai-button>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="typewriter" />

      <view class="demo-label">基础用法</view>
      <view class="demo-dashed" style="margin-bottom: 40rpx">
        <ai-typewriter :trigger="replayKey" text="你好，欢迎来到动物岛！今天的天气真不错呢～" />
      </view>

      <view class="demo-label">多行纯文本打字机 (速度 40ms)</view>
      <view class="demo-dashed" style="margin-bottom: 40rpx">
        <ai-typewriter
          :speed="40"
          :trigger="replayKey"
          text="第一行：钓到石头了！
第二行：竟然连这种都能钓起来...
第三行：继续加油吧！"
        />
      </view>

      <view class="demo-label">富内容打字机（H5/App 支持逐字动画；小程序直接显示）</view>
      <view
        class="demo-dashed"
        style="display: flex; flex-direction: column; align-items: flex-start; gap: 16rpx; margin-bottom: 40rpx"
      >
        <ai-typewriter :speed="40" :trigger="replayKey" :rich="true">
          <view>第一行：钓到石头了！</view>
          <view>第二行：竟然连这种都能钓起来...</view>
          <view style="color: #fd9303; font-weight: 700">第三行：继续加油吧！</view>
        </ai-typewriter>
      </view>

      <view class="demo-row">
        <ai-button type="primary" @click="replayKey++">重新播放</ai-button>
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="TYPEWRITER_API" />
    </view>
  </AppLayout>
</template>
