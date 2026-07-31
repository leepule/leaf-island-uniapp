<script setup lang="ts">
const colors: [string, string][] = [
  ['default', '默认奶油色'],
  ['app-pink', '应用粉'],
  ['purple', '紫色'],
  ['app-blue', '应用蓝'],
  ['app-yellow', '应用黄'],
  ['app-orange', '应用橙'],
  ['app-teal', '应用青'],
  ['app-green', '应用绿'],
  ['app-red', '应用红'],
  ['lime-green', '青柠绿'],
  ['yellow-green', '黄绿色'],
  ['brown', '棕色'],
  ['warm-peach-pink', '暖桃粉'],
];

const CARD_API = [
  { prop: 'type', desc: '卡片类型', type: `'default' | 'dashed'`, defaultVal: "'default'" },
  { prop: 'color', desc: '背景颜色类型', type: '13 种', defaultVal: "'default'" },
  { prop: 'pattern', desc: '背景花纹类型', type: '13 种 / none', defaultVal: "'none'" },
  { prop: 'default', desc: '内容（默认 slot）', type: 'slot', defaultVal: '-' },
];

const code = `<ai-card color="app-pink">
    这是一张动森风格的卡片内容。
</ai-card>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="card" />

      <view class="demo-label">配色变体</view>
      <view class="demo-row" style="gap: 20rpx">
        <view v-for="[c, label] in colors" :key="c" style="min-width: 280rpx; flex: 1 1 280rpx; max-width: 100%">
          <ai-card :color="c as any">
            <text style="font-size: 24rpx; font-weight: 700">{{ label }}</text>
          </ai-card>
        </view>
      </view>

      <view class="demo-label">dashed 类型 + pattern 花纹</view>
      <view class="demo-row" style="gap: 20rpx">
        <ai-card type="dashed" color="app-blue" pattern="app-blue">
          <text style="font-size: 24rpx">蓝色虚线 + 点纹</text>
        </ai-card>
        <ai-card type="dashed" color="app-green" pattern="app-green">
          <text style="font-size: 24rpx">绿色虚线 + 点纹</text>
        </ai-card>
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="CARD_API" />
    </view>
  </AppLayout>
</template>
