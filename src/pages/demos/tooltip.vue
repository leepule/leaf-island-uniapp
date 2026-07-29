<script setup lang="ts">

const TOOLTIP_API = [
    { prop: 'title', desc: '提示文本（或使用 #title 插槽）', type: 'string', defaultVal: '-' },
    { prop: 'placement', desc: '位置', type: '12 个方向', defaultVal: "'top'" },
    { prop: 'trigger', desc: '触发方式', type: "'hover' | 'focus' | 'click'", defaultVal: "'hover'" },
    { prop: 'variant', desc: '视觉风格', type: "'default' | 'island'", defaultVal: "'default'" },
    { prop: 'bordered', desc: '是否显示边框', type: 'boolean', defaultVal: 'true' },
];

const code = `<!-- 基础用法 -->
<AiTooltip title="提示文字">
    <AiButton>Hover 我</AiButton>
</AiTooltip>

<!-- 动森 island 风格 -->
<AiTooltip variant="island" bordered title="有边框有机气泡">
    <AiButton>Island</AiButton>
</AiTooltip>

<!-- 12 个方向 -->
<AiTooltip title="我在上方" placement="top">
    <AiButton>Top</AiButton>
</AiTooltip>

<!-- Click 触发 -->
<AiTooltip title="点击触发" trigger="click">
    <AiButton>Click</AiButton>
</AiTooltip>`;
</script>

<template>
    <AppLayout>
    <view class="demo-page">
        <DemoHeader name="tooltip" />

        <view class="demo-label">基础用法 — hover 触发</view>
        <view class="demo-box">
            <view style="display: flex; gap: 20rpx; align-items: center; flex-wrap: wrap">
                <AiTooltip title="提示文字">
                    <AiButton type="primary" size="small">Hover 我</AiButton>
                </AiTooltip>
            </view>
        </view>

        <view class="demo-label">风格 — island 动森不规则气泡</view>
        <view class="demo-box">
            <view style="display: flex; gap: 20rpx; align-items: center; flex-wrap: wrap">
                <AiTooltip title="标准矩形气泡" placement="top">
                    <AiButton size="small">default</AiButton>
                </AiTooltip>
                <AiTooltip title="无边框矩形" placement="top" :bordered="false">
                    <AiButton size="small">default 无边框</AiButton>
                </AiTooltip>
                <AiTooltip variant="island" :bordered="true" placement="top">
                    <template #title>
                        钓到<text style="color: #d4834a">石头</text>了！<br />竟然连这种都能钓起来…
                    </template>
                    <AiButton size="small">island 有边框</AiButton>
                </AiTooltip>
                <AiTooltip variant="island" :bordered="false" placement="top">
                    <template #title>
                        无边框有机气泡<br />圆点指示方向
                    </template>
                    <AiButton size="small">island 无边框</AiButton>
                </AiTooltip>
            </view>
        </view>

        <view class="demo-label">12 个方向（部分示例）</view>
        <view class="demo-box" style="display: flex; flex-direction: column; gap: 24rpx; align-items: center">
            <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
                <AiTooltip title="top-start" placement="top-start"><AiButton size="small">top-start</AiButton></AiTooltip>
                <AiTooltip title="top" placement="top"><AiButton size="small">top</AiButton></AiTooltip>
                <AiTooltip title="top-end" placement="top-end"><AiButton size="small">top-end</AiButton></AiTooltip>
            </view>
            <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
                <AiTooltip placement="left"><template #title>left<br />箭头在右侧</template><AiButton size="small">left</AiButton></AiTooltip>
                <AiTooltip placement="right"><template #title>right<br />箭头在左侧</template><AiButton size="small">right</AiButton></AiTooltip>
            </view>
            <view style="display: flex; gap: 24rpx; flex-wrap: wrap; justify-content: center">
                <AiTooltip title="bottom-start" placement="bottom-start"><AiButton size="small">bottom-start</AiButton></AiTooltip>
                <AiTooltip title="bottom" placement="bottom"><AiButton size="small">bottom</AiButton></AiTooltip>
                <AiTooltip title="bottom-end" placement="bottom-end"><AiButton size="small">bottom-end</AiButton></AiTooltip>
            </view>
        </view>

        <view class="demo-label">Click 触发</view>
        <view class="demo-box">
            <AiTooltip title="点击触发我才显示" trigger="click">
                <AiButton size="small">Click 我</AiButton>
            </AiTooltip>
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="TOOLTIP_API" />
    </view>
    </AppLayout>
</template>
