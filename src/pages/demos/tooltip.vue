<script setup lang="ts">
const TOOLTIP_API = [
  { prop: 'title', desc: '提示文本（或使用 #title 插槽）', type: 'string', defaultVal: '-' },
  { prop: 'placement', desc: '位置', type: '12 个方向', defaultVal: "'top'" },
  { prop: 'trigger', desc: '触发方式', type: "'hover' | 'focus' | 'click'", defaultVal: "'hover'" },
  { prop: 'variant', desc: '视觉风格', type: "'default' | 'island'", defaultVal: "'default'" },
  { prop: 'bordered', desc: '是否显示边框', type: 'boolean', defaultVal: 'true' },
];

const code = `<!-- 基础用法 -->
<li-tooltip title="提示文字">
    <li-button>Hover 我</li-button>
</li-tooltip>

<!-- island 有机圆角风格 -->
<li-tooltip variant="island" bordered title="有边框有机气泡">
    <li-button>Island</li-button>
</li-tooltip>

<!-- 12 个方向 -->
<li-tooltip title="我在上方" placement="top">
    <li-button>Top</li-button>
</li-tooltip>

<!-- Click 触发 -->
<li-tooltip title="点击触发" trigger="click">
    <li-button>Click</li-button>
</li-tooltip>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="tooltip" />

      <view class="demo-label">基础用法 — hover 触发</view>
      <view class="demo-box">
        <view style="display: flex; gap: 20rpx; align-items: center; flex-wrap: wrap">
          <li-tooltip title="提示文字">
            <li-button type="primary" size="small">Hover 我</li-button>
          </li-tooltip>
        </view>
      </view>

      <view class="demo-label">风格 — island 有机圆角气泡</view>
      <view class="demo-box">
        <view style="display: flex; gap: 20rpx; align-items: center; flex-wrap: wrap">
          <li-tooltip title="标准矩形气泡" placement="top">
            <li-button size="small">default</li-button>
          </li-tooltip>
          <li-tooltip title="无边框矩形" placement="top" :bordered="false">
            <li-button size="small">default 无边框</li-button>
          </li-tooltip>
          <li-tooltip variant="island" :bordered="true" placement="top">
            <template #title> 钓到<text style="color: #d4834a">石头</text>了！<br />竟然连这种都能钓起来… </template>
            <li-button size="small">island 有边框</li-button>
          </li-tooltip>
          <li-tooltip variant="island" :bordered="false" placement="top">
            <template #title> 无边框有机气泡<br />圆点指示方向 </template>
            <li-button size="small">island 无边框</li-button>
          </li-tooltip>
        </view>
      </view>

      <view class="demo-label">12 个方向（部分示例）</view>
      <view class="demo-box" style="display: flex; flex-direction: column; gap: 24rpx; align-items: center">
        <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
          <li-tooltip title="top-start" placement="top-start"><li-button size="small">top-start</li-button></li-tooltip>
          <li-tooltip title="top" placement="top"><li-button size="small">top</li-button></li-tooltip>
          <li-tooltip title="top-end" placement="top-end"><li-button size="small">top-end</li-button></li-tooltip>
        </view>
        <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
          <li-tooltip placement="left"
            ><template #title>left<br />箭头在右侧</template><li-button size="small">left</li-button></li-tooltip
          >
          <li-tooltip placement="right"
            ><template #title>right<br />箭头在左侧</template><li-button size="small">right</li-button></li-tooltip
          >
        </view>
        <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
          <li-tooltip title="bottom-start" placement="bottom-start"
            ><li-button size="small">bottom-start</li-button></li-tooltip
          >
          <li-tooltip title="bottom" placement="bottom"><li-button size="small">bottom</li-button></li-tooltip>
          <li-tooltip title="bottom-end" placement="bottom-end"
            ><li-button size="small">bottom-end</li-button></li-tooltip
          >
        </view>
      </view>

      <view class="demo-label">Click 触发</view>
      <view class="demo-box">
        <li-tooltip title="点击触发我才显示" trigger="click">
          <li-button size="small">Click 我</li-button>
        </li-tooltip>
      </view>

      <li-code-block title="使用示例" :code="code" />
      <ApiTable :rows="TOOLTIP_API" />
    </view>
  </AppLayout>
</template>
