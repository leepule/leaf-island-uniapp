<script setup lang="ts">
const CURSOR_API = [
  {
    prop: 'forceAll',
    desc: '是否让常见交互控件继承自定义光标（false 保留交互语义）',
    type: 'boolean',
    defaultVal: 'true',
  },
  { prop: 'default', desc: '子元素 slot', type: 'slot', defaultVal: '-' },
];

const code = `<!-- 默认 forceAll=true：组件范围内继承自定义光标 -->
<ai-cursor>
    <view>鼠标移入此区域将显示自定义光标</view>
</ai-cursor>

<!-- forceAll=false：保留交互语义 -->
<ai-cursor :force-all="false">
    <text>链接保留 pointer</text>
    <ai-button>按钮保留 pointer</ai-button>
</ai-cursor>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="cursor" />

      <view class="demo-label">forceAll=true（默认）：组件范围内继承（仅 H5 生效）</view>
      <ai-cursor>
        <view class="demo-dashed" style="padding: 48rpx; text-align: center"> 鼠标移入此区域将显示自定义手指光标 </view>
      </ai-cursor>

      <view class="demo-label">forceAll=false：保留原生光标语义（仅 H5 生效）</view>
      <ai-cursor :force-all="false">
        <view
          class="demo-dashed"
          style="padding: 48rpx; display: flex; flex-direction: column; align-items: center; gap: 24rpx"
        >
          <text>鼠标移入此区域，交互元素恢复语义光标</text>
          <view style="display: flex; gap: 32rpx; align-items: center; flex-wrap: wrap; justify-content: center">
            <text style="color: #2f7d6b">链接 (pointer)</text>
            <ai-button size="small">按钮 (pointer)</ai-button>
            <ai-button size="small" disabled>禁用 (not-allowed)</ai-button>
          </view>
        </view>
      </ai-cursor>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="CURSOR_API" />
    </view>
  </AppLayout>
</template>
