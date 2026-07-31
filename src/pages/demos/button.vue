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

const code = `<ai-button type="primary">Primary</ai-button>
<ai-button>Default</ai-button>
<ai-button type="dashed">Dashed</ai-button>
<ai-button type="text">Text</ai-button>
<ai-button type="link">Link</ai-button>
<ai-button type="primary" danger>Danger</ai-button>
<ai-button type="primary" ghost>Ghost</ai-button>
<ai-button type="primary" loading>Loading</ai-button>
<ai-button type="primary" size="large">Large</ai-button>
<ai-button type="primary" block>Block</ai-button>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="button" />

      <view class="demo-label">type 按钮类型</view>
      <view class="demo-box">
        <view class="demo-row">
          <ai-button type="primary">Primary</ai-button>
          <ai-button>Default</ai-button>
          <ai-button type="dashed">Dashed</ai-button>
          <ai-button type="text">Text</ai-button>
          <ai-button type="link">Link</ai-button>
        </view>
      </view>

      <view class="demo-label">danger / ghost / loading / disabled 状态</view>
      <view class="demo-box">
        <view class="demo-row">
          <ai-button type="primary" danger>Danger</ai-button>
          <ai-button type="primary" ghost>Ghost</ai-button>
          <ai-button type="primary" loading>Loading</ai-button>
          <ai-button type="primary" disabled>Disabled</ai-button>
        </view>
      </view>

      <view class="demo-label">size 尺寸</view>
      <view class="demo-box">
        <view class="demo-row">
          <ai-button type="primary" size="small">Small</ai-button>
          <ai-button type="primary" size="middle">Middle</ai-button>
          <ai-button type="primary" size="large">Large</ai-button>
        </view>
      </view>

      <view class="demo-label">icon 图标按钮</view>
      <view class="demo-box">
        <view class="demo-row">
          <ai-button type="primary"><template #icon>🔍</template>搜索</ai-button>
          <ai-button><template #icon>⭐</template>收藏</ai-button>
          <ai-button type="dashed"><template #icon>＋</template>新增</ai-button>
        </view>
      </view>

      <view class="demo-label">block 块级按钮</view>
      <view class="demo-box">
        <view style="max-width: 100%">
          <ai-button type="primary" block>Block Button</ai-button>
        </view>
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="BUTTON_API" />
    </view>
  </AppLayout>
</template>
