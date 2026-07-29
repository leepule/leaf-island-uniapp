<script setup lang="ts">
interface ApiRow {
    prop: string;
    desc: string;
    type?: string;
    defaultVal?: string;
    required?: boolean;
}

defineProps<{ rows: ApiRow[] }>();
</script>

<template>
    <view class="api-wrap">
        <view class="api-label">API</view>
        <view class="api-box">
            <view class="api-head">
                <text class="api-th">参数</text>
                <text class="api-th">说明</text>
                <text class="api-th">类型</text>
                <text class="api-th">默认值</text>
            </view>
            <view
                v-for="(row, i) in rows"
                :key="row.prop + i"
                class="api-row"
            >
                <text class="api-td api-prop">{{ row.prop }}</text>
                <text class="api-td">{{ row.desc }}{{ row.required ? ' *' : '' }}</text>
                <text class="api-td api-type">{{ row.type ?? '-' }}</text>
                <text class="api-td">{{ row.defaultVal ?? '-' }}</text>
            </view>
        </view>
    </view>
</template>

<style lang="less" scoped>
/* 对齐 demo 参考站：深色底 + 顶部「API」标签条 */
.api-wrap {
    margin-top: 40rpx;
}
.api-label {
    font-size: 28rpx;
    font-weight: 600;
    color: #e7e4e0;
    padding: 12rpx 24rpx;
    background: #3d3028;
    border-radius: 20rpx 20rpx 0 0;
    display: inline-block;
}
.api-box {
    background: #2b2118;
    border-radius: 0 20rpx 20rpx 20rpx;
    overflow: hidden;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
.api-head,
.api-row {
    display: flex;
    min-width: 680rpx;
}
.api-head {
    background: #3d3028;
    color: #e8d5bc;
}
.api-row {
    color: #c8bba8;
    border-top: 1px solid #3d3028;

    &:nth-child(even) {
        background: rgba(61, 48, 40, 0.4);
    }
}
.api-th,
.api-td {
    flex: 1;
    padding: 18rpx 20rpx;
    font-size: 24rpx;
    line-height: 1.5;
    word-break: break-all;
}
.api-th {
    font-weight: 700;
    color: #e8d5bc;
}
.api-prop {
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
    color: #e8c87a;
}
.api-type {
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
    color: #d4a0e0;
}
</style>
