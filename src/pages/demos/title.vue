<script setup lang="ts">
const acBox = (bg: string, dot1: string, dot2: string, border: string) => ({
  padding: '40rpx',
  background: `radial-gradient(circle, ${dot1} 1.5px, transparent 1.5px), radial-gradient(circle, ${dot2} 1px, transparent 1px), ${bg}`,
  backgroundSize: '28px 28px, 14px 14px, auto',
  backgroundPosition: '0 0, 7px 7px, 0 0',
  border: `1.5px solid ${border}`,
  borderRadius: '20rpx',
});

const bgGreen = acBox('#e8f5d8', 'rgba(120,200,80,0.18)', 'rgba(180,230,120,0.12)', '#b8d890');
const bgSand = acBox('#fdf3d8', 'rgba(220,180,80,0.15)', 'rgba(240,210,120,0.10)', '#e8d090');
const bgCoral = acBox('#fce8e0', 'rgba(240,120,90,0.15)', 'rgba(250,170,140,0.10)', '#e8b0a0');
const bgMint = acBox('#d8f5f0', 'rgba(60,190,170,0.18)', 'rgba(120,230,210,0.12)', '#88d8c8');
const bgLavender = acBox('#ede8f8', 'rgba(160,120,230,0.15)', 'rgba(200,170,250,0.10)', '#c0a8e8');
const bgSky = acBox('#ddf0fa', 'rgba(80,170,230,0.15)', 'rgba(140,210,250,0.10)', '#90cce8');

const TITLE_API = [
  { prop: 'default slot', desc: '标题内容', type: 'slot', defaultVal: '-', required: true },
  { prop: 'size', desc: '尺寸', type: `'small' | 'middle' | 'large'`, defaultVal: "'middle'" },
  { prop: 'color', desc: '配色', type: '13 种配色', defaultVal: "'default'" },
];

const code = `<li-title>斯普拉遁</li-title>
<li-title size="small">小标题</li-title>
<li-title size="large" color="app-pink">大号粉色</li-title>
<li-title color="purple">紫色标题</li-title>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="title" />

      <view class="demo-label">飘带标题</view>
      <view :style="bgGreen"><li-title>斯普拉遁</li-title></view>

      <view class="demo-label">配色变体</view>
      <view :style="{ ...bgSand, display: 'flex', flexWrap: 'wrap', gap: '20rpx' }">
        <li-title color="default">默认绿</li-title>
        <li-title color="app-pink">粉色</li-title>
        <li-title color="purple">紫色</li-title>
        <li-title color="app-blue">蓝色</li-title>
        <li-title color="app-yellow">黄色</li-title>
        <li-title color="app-orange">橙色</li-title>
        <li-title color="app-teal">青色</li-title>
        <li-title color="app-green">绿色</li-title>
        <li-title color="app-red">红色</li-title>
        <li-title color="lime-green">青柠</li-title>
        <li-title color="yellow-green">黄绿</li-title>
        <li-title color="brown">棕色</li-title>
        <li-title color="warm-peach-pink">暖桃粉</li-title>
      </view>

      <view class="demo-label">小尺寸</view>
      <view :style="bgCoral"><li-title size="small">小标题</li-title></view>

      <view class="demo-label">中尺寸（默认）</view>
      <view :style="bgMint"><li-title size="middle">中等标题</li-title></view>

      <view class="demo-label">大尺寸</view>
      <view :style="bgLavender"><li-title size="large">大号标题</li-title></view>

      <view class="demo-label">支持英文与表情</view>
      <view :style="bgSky"><li-title>🎮 LET'S PLAY!</li-title></view>

      <li-code-block title="使用示例" :code="code" />
      <ApiTable :rows="TITLE_API" />
    </view>
  </AppLayout>
</template>
