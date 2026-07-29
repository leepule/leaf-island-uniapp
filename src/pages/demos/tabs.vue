<script setup lang="ts">
import { ref } from 'vue';
import type { TabItem } from '../../animal-island';

const items: TabItem[] = [
    { key: 'tab1', label: '岛屿概况' },
    { key: 'tab2', label: '商店' },
    { key: 'tab3', label: '服务台' },
];

const activeKey = ref('tab1');

const TABS_API = [
    { prop: 'items', desc: '标签页配置列表', type: 'TabItem[]', defaultVal: '-', required: true },
    { prop: 'modelValue', desc: '当前激活标签 (v-model)', type: 'string', defaultVal: '第一个标签' },
    { prop: 'shadow', desc: '是否显示选中状态阴影', type: 'boolean', defaultVal: 'true' },
    { prop: 'leafAnimation', desc: '是否启用叶子动画', type: 'boolean', defaultVal: 'true' },
    { prop: 'slot[item.key]', desc: '通过同名 slot 提供每个 tab 内容', type: 'slot', defaultVal: '-' },
];

const code = `<script setup lang="ts">
const items: TabItem[] = [
    { key: 'tab1', label: '标签一' },
    { key: 'tab2', label: '标签二' },
];
const active = ref('tab1');
<\/script>

<template>
    <AppLayout>
    <AiTabs v-model="active" :items="items">
        <template #tab1><text>内容一</text></template>
        <template #tab2><text>内容二</text></template>
    </AiTabs>
    </AppLayout>
</template>`;
</script>

<template>
    <view class="demo-page">
        <DemoHeader name="tabs" />

        <view class="demo-label">基础用法（受控）</view>
        <view class="demo-box">
            <AiTabs v-model="activeKey" :items="items">
                <template #tab1><text>岛上有 10 位居民，今天天气晴朗，适合钓鱼。</text></template>
                <template #tab2><text>Nook 商店今日特惠：大头菜 99 铃钱。</text></template>
                <template #tab3><text>服务台可以办理居民登记与素材领取。</text></template>
            </AiTabs>
        </view>

        <view class="demo-label">关闭叶子动画</view>
        <view class="demo-box">
            <AiTabs v-model="activeKey" :items="items" :leaf-animation="false">
                <template #tab1><text>关闭动画后的标签切换。</text></template>
                <template #tab2><text>关闭动画后的标签切换。</text></template>
                <template #tab3><text>关闭动画后的标签切换。</text></template>
            </AiTabs>
        </view>

        <AiCodeBlock :code="code" />
        <ApiTable :rows="TABS_API" />
    </view>
</template>
