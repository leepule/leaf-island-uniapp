<script setup lang="ts">
const TOOLTIP_API = [
  { prop: 'title', desc: '提示文本（或使用 #title 插槽）', type: 'string', defaultVal: '-' },
  { prop: 'placement', desc: '位置', type: '12 个方向', defaultVal: "'top'" },
  { prop: 'trigger', desc: '触发方式', type: "'hover' | 'focus' | 'click'", defaultVal: "'hover'" },
  { prop: 'variant', desc: '视觉风格', type: "'default' | 'island'", defaultVal: "'default'" },
  { prop: 'bordered', desc: '是否显示边框', type: 'boolean', defaultVal: 'true' },
];

const code = `<!-- 基础用法 -->
<ai-tooltip title="提示文字">
    <ai-button>Hover 我</ai-button>
</ai-tooltip>

<!-- 动森 island 风格 -->
<ai-tooltip variant="island" bordered title="有边框有机气泡">
    <ai-button>Island</ai-button>
</ai-tooltip>

<!-- 12 个方向 -->
<ai-tooltip title="我在上方" placement="top">
    <ai-button>Top</ai-button>
</ai-tooltip>

<!-- Click 触发 -->
<ai-tooltip title="点击触发" trigger="click">
    <ai-button>Click</ai-button>
</ai-tooltip>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="tooltip" />

      <view class="demo-label">基础用法 — hover 触发</view>
      <view class="demo-box">
        <view style="display: flex; gap: 20rpx; align-items: center; flex-wrap: wrap">
          <ai-tooltip title="提示文字">
            <ai-button type="primary" size="small">Hover 我</ai-button>
          </ai-tooltip>
        </view>
      </view>

      <view class="demo-label">风格 — island 动森不规则气泡</view>
      <view class="demo-box">
        <view style="display: flex; gap: 20rpx; align-items: center; flex-wrap: wrap">
          <ai-tooltip title="标准矩形气泡" placement="top">
            <ai-button size="small">default</ai-button>
          </ai-tooltip>
          <ai-tooltip title="无边框矩形" placement="top" :bordered="false">
            <ai-button size="small">default 无边框</ai-button>
          </ai-tooltip>
          <ai-tooltip variant="island" :bordered="true" placement="top">
            <template #title> 钓到<text style="color: #d4834a">石头</text>了！<br />竟然连这种都能钓起来… </template>
            <ai-button size="small">island 有边框</ai-button>
          </ai-tooltip>
          <ai-tooltip variant="island" :bordered="false" placement="top">
            <template #title> 无边框有机气泡<br />圆点指示方向 </template>
            <ai-button size="small">island 无边框</ai-button>
          </ai-tooltip>
        </view>
      </view>

      <view class="demo-label">12 个方向（部分示例）</view>
      <view class="demo-box" style="display: flex; flex-direction: column; gap: 24rpx; align-items: center">
        <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
          <ai-tooltip title="top-start" placement="top-start"><ai-button size="small">top-start</ai-button></ai-tooltip>
          <ai-tooltip title="top" placement="top"><ai-button size="small">top</ai-button></ai-tooltip>
          <ai-tooltip title="top-end" placement="top-end"><ai-button size="small">top-end</ai-button></ai-tooltip>
        </view>
        <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
          <ai-tooltip placement="left"
            ><template #title>left<br />箭头在右侧</template><ai-button size="small">left</ai-button></ai-tooltip
          >
          <ai-tooltip placement="right"
            ><template #title>right<br />箭头在左侧</template><ai-button size="small">right</ai-button></ai-tooltip
          >
        </view>
        <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
          <ai-tooltip title="bottom-start" placement="bottom-start"
            ><ai-button size="small">bottom-start</ai-button></ai-tooltip
          >
          <ai-tooltip title="bottom" placement="bottom"><ai-button size="small">bottom</ai-button></ai-tooltip>
          <ai-tooltip title="bottom-end" placement="bottom-end"
            ><ai-button size="small">bottom-end</ai-button></ai-tooltip
          >
        </view>
      </view>

      <view class="demo-label">Click 触发</view>
      <view class="demo-box">
        <ai-tooltip title="点击触发我才显示" trigger="click">
          <ai-button size="small">Click 我</ai-button>
        </ai-tooltip>
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="TOOLTIP_API" />
    </view>
  </AppLayout>
</template>
