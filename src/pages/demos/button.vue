<script setup lang="ts">
const BUTTON_API = [
    { prop: 'type', desc: '按钮类型', type: `'primary' | 'default' | 'dashed' | 'text' | 'link'`, defaultVal: "'default'" },
    { prop: 'size', desc: '按钮尺寸', type: `'small' | 'middle' | 'large'`, defaultVal: "'middle'" },
    { prop: 'danger', desc: '是否危险按钮', type: 'boolean', defaultVal: 'false' },
    { prop: 'ghost', desc: '是否幽灵按钮（透明背景）', type: 'boolean', defaultVal: 'false' },
    { prop: 'block', desc: '是否块级按钮', type: 'boolean', defaultVal: 'false' },
    { prop: 'loading', desc: '加载状态', type: 'boolean', defaultVal: 'false' },
    { prop: 'disabled', desc: '禁用状态', type: 'boolean', defaultVal: 'false' },
    { prop: '#icon', desc: '图标插槽', type: 'slot', defaultVal: '-' },
];

const code = `<AiButton type="primary">Primary</AiButton>
<AiButton>Default</AiButton>
<AiButton type="dashed">Dashed</AiButton>
<AiButton type="text">Text</AiButton>
<AiButton type="link">Link</AiButton>
<AiButton type="primary" danger>Danger</AiButton>
<AiButton type="primary" ghost>Ghost</AiButton>
<AiButton type="primary" loading>Loading</AiButton>
<AiButton type="primary" size="large">Large</AiButton>
<AiButton type="primary" block>Block</AiButton>`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="button" />

        <view class="demo-label">type 按钮类型</view>
        <view class="demo-box">
            <view class="demo-row">
                <AiButton type="primary">Primary</AiButton>
                <AiButton>Default</AiButton>
                <AiButton type="dashed">Dashed</AiButton>
                <AiButton type="text">Text</AiButton>
                <AiButton type="link">Link</AiButton>
            </view>
        </view>

        <view class="demo-label">danger / ghost / loading / disabled 状态</view>
        <view class="demo-box">
            <view class="demo-row">
                <AiButton type="primary" danger>Danger</AiButton>
                <AiButton type="primary" ghost>Ghost</AiButton>
                <AiButton type="primary" loading>Loading</AiButton>
                <AiButton type="primary" disabled>Disabled</AiButton>
            </view>
        </view>

        <view class="demo-label">size 尺寸</view>
        <view class="demo-box">
            <view class="demo-row">
                <AiButton type="primary" size="small">Small</AiButton>
                <AiButton type="primary" size="middle">Middle</AiButton>
                <AiButton type="primary" size="large">Large</AiButton>
            </view>
        </view>

        <view class="demo-label">icon 图标按钮</view>
        <view class="demo-box">
            <view class="demo-row">
                <AiButton type="primary"><template #icon>🔍</template>搜索</AiButton>
                <AiButton><template #icon>⭐</template>收藏</AiButton>
                <AiButton type="dashed"><template #icon>＋</template>新增</AiButton>
            </view>
        </view>

        <view class="demo-label">block 块级按钮</view>
        <view class="demo-box">
            <view style="max-width: 100%">
                <AiButton type="primary" block>Block Button</AiButton>
            </view>
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="BUTTON_API" />
    </view>
    </AppLayout>
</template>
