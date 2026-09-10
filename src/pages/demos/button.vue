<script setup lang="ts">
const BUTTON_API = [
  {
    prop: 'type',
    desc: '按钮类型',
    type: `'primary' | 'default' | 'dashed' | 'text' | 'link'`,
    defaultVal: "'default'",
  },
  { prop: 'size', desc: '按钮尺寸', type: `'small' | 'middle' | 'large'`, defaultVal: "'middle'" },
  { prop: 'danger', desc: '是否危险按钮', type: 'boolean', defaultVal: 'false' },
  { prop: 'ghost', desc: '是否幽灵按钮（透明背景）', type: 'boolean', defaultVal: 'false' },
  { prop: 'block', desc: '是否块级按钮', type: 'boolean', defaultVal: 'false' },
  { prop: 'loading', desc: '加载状态', type: 'boolean', defaultVal: 'false' },
  { prop: 'disabled', desc: '禁用状态', type: 'boolean', defaultVal: 'false' },
  { prop: '#icon', desc: '图标插槽', type: 'slot', defaultVal: '-' },
];

const code = `<li-button type="primary">Primary</li-button>
<li-button>Default</li-button>
<li-button type="dashed">Dashed</li-button>
<li-button type="text">Text</li-button>
<li-button type="link">Link</li-button>
<li-button type="primary" danger>Danger</li-button>
<li-button type="primary" ghost>Ghost</li-button>
<li-button type="primary" loading>Loading</li-button>
<li-button type="primary" size="large">Large</li-button>
<li-button type="primary" block>Block</li-button>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="button" />

      <view class="demo-label">type 按钮类型</view>
      <view class="demo-box">
        <view class="demo-row">
          <li-button type="primary">Primary</li-button>
          <li-button>Default</li-button>
          <li-button type="dashed">Dashed</li-button>
          <li-button type="text">Text</li-button>
          <li-button type="link">Link</li-button>
        </view>
      </view>

      <view class="demo-label">danger / ghost / loading / disabled 状态</view>
      <view class="demo-box">
        <view class="demo-row">
          <li-button type="primary" danger>Danger</li-button>
          <li-button type="primary" ghost>Ghost</li-button>
          <li-button type="primary" loading>Loading</li-button>
          <li-button type="primary" disabled>Disabled</li-button>
        </view>
      </view>

      <view class="demo-label">size 尺寸</view>
      <view class="demo-box">
        <view class="demo-row">
          <li-button type="primary" size="small">Small</li-button>
          <li-button type="primary" size="middle">Middle</li-button>
          <li-button type="primary" size="large">Large</li-button>
        </view>
      </view>

      <view class="demo-label">icon 图标按钮</view>
      <view class="demo-box">
        <view class="demo-row">
          <li-button type="primary"><template #icon>🔍</template>搜索</li-button>
          <li-button><template #icon>⭐</template>收藏</li-button>
          <li-button type="dashed"><template #icon>＋</template>新增</li-button>
        </view>
      </view>

      <view class="demo-label">block 块级按钮</view>
      <view class="demo-box">
        <view style="max-width: 100%">
          <li-button type="primary" block>Block Button</li-button>
        </view>
      </view>

      <li-code-block title="使用示例" :code="code" />
      <ApiTable :rows="BUTTON_API" />
    </view>
  </AppLayout>
</template>
