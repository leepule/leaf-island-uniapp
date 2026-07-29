<script setup lang="ts">

const COLLAPSE_API = [
    { prop: 'question', desc: '问题标题（slot 或 prop）', type: 'string | slot', defaultVal: '-', required: true },
    { prop: 'default', desc: '答案内容（默认 slot）', type: 'slot', defaultVal: '-', required: true },
    { prop: 'defaultExpanded', desc: '是否默认展开', type: 'boolean', defaultVal: 'false' },
    { prop: 'disabled', desc: '是否禁用', type: 'boolean', defaultVal: 'false' },
];

const code = `<AiCollapse question="问题">
    <text>回答内容</text>
</AiCollapse>
<AiCollapse question="默认展开" default-expanded>
    <text>答案</text>
</AiCollapse>
<AiCollapse question="禁用" disabled>
    <text>答案</text>
</AiCollapse>`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="collapse" />

        <view class="demo-label">基础用法</view>
        <view style="max-width: 100%">
            <AiCollapse question="1個島嶼可以登錄多少名用戶?">
                <text>1座島嶼最多可以容納8位居民（用戶）。</text>
            </AiCollapse>
            <AiCollapse question="可以多少人一起玩?">
                <text>同住1個島的居民可以最多4人一起遊玩。透過通訊最多8人一起遊玩。</text>
            </AiCollapse>
        </view>

        <view class="demo-label">defaultExpanded 默认展开</view>
        <view style="max-width: 100%">
            <AiCollapse question="这个问题默认展开" default-expanded>
                <text>答案已经展示出来了！可以点击收起。</text>
            </AiCollapse>
        </view>

        <view class="demo-label">disabled 禁用状态</view>
        <view style="max-width: 100%">
            <AiCollapse question="这个问题已被禁用（无法展开）" disabled>
                <text>这段文字不应该被看到。</text>
            </AiCollapse>
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="COLLAPSE_API" />
    </view>
    </AppLayout>
</template>
