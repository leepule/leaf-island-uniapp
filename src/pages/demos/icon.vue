<script setup lang="ts">
import { ICON_LIST } from '../../animal-island';

const ICON_API = [
  { prop: 'name', desc: 'Lucide 图标名，支持 icon- 前缀', type: 'IconName', defaultVal: '-', required: true },
  { prop: 'size', desc: '图标尺寸', type: 'number | string', defaultVal: '24' },
  { prop: 'bounce', desc: '弹跳动画', type: 'boolean', defaultVal: 'false' },
  { prop: 'variant', desc: '图标颜色变体', type: "'dark' | 'light'", defaultVal: "'dark'" },
  { prop: 'color', desc: '图标颜色', type: 'string', defaultVal: 'currentColor' },
  { prop: 'strokeWidth', desc: '线条宽度', type: 'number | string', defaultVal: '2' },
];

const code = `<ai-icon name="icon-ticket" :size="32" />
<ai-icon name="icon-camera" :size="48" color="#0cc0b5" :stroke-width="1.5" bounce />`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="icon" />

      <view class="demo-label">基础用法</view>
      <view class="demo-row">
        <ai-icon name="icon-ticket" :size="32" />
        <ai-icon name="icon-camera" :size="32" />
        <ai-icon name="icon-message-circle" :size="32" />
        <ai-icon name="icon-palette" :size="32" />
        <ai-icon name="icon-map" :size="32" />
      </view>

      <view class="demo-label">size 尺寸</view>
      <view class="demo-row">
        <ai-icon name="icon-ticket" :size="16" />
        <ai-icon name="icon-ticket" :size="24" />
        <ai-icon name="icon-ticket" :size="32" />
        <ai-icon name="icon-ticket" :size="48" />
      </view>

      <view class="demo-label">bounce 弹跳动画（H5 悬停查看效果）</view>
      <view class="demo-row">
        <ai-icon name="icon-ticket" :size="32" bounce />
        <ai-icon name="icon-camera" :size="32" bounce />
        <ai-icon name="icon-message-circle" :size="32" bounce />
      </view>

      <view class="demo-label">图标列表</view>
      <view class="demo-box">
        <view
          v-for="(icon, idx) in ICON_LIST"
          :key="icon.name"
          style="
            display: flex;
            align-items: center;
            gap: 20rpx;
            padding: 24rpx 10rpx;
            border-bottom: 1px dashed #f0e8d8;
          "
        >
          <ai-icon :name="icon.name" :size="32" />
          <text style="font-size: 28rpx; color: #725d42">{{ icon.label }}</text>
          <text
            style="
              margin-left: auto;
              font-size: 24rpx;
              color: #a0936e;
              font-family: monospace;
              word-break: break-all;
              max-width: 50%;
              text-align: right;
            "
            >{{ icon.name }}</text
          >
        </view>
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="ICON_API" />
    </view>
  </AppLayout>
</template>
