<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { PAGE_INFO } from '../pageInfo';

const props = defineProps<{ name: string }>();
const info = computed(() => PAGE_INFO[props.name]);

// 通知全局侧边导航高亮当前组件
onMounted(() => {
    uni.$emit('demo-nav', props.name);
});
</script>

<template>
    <view v-if="info">
        <view class="demo-title">
            {{ info.title }}<text class="demo-tag">{{ info.tag }}</text>
        </view>
        <view class="demo-desc">{{ info.desc }}</view>
    </view>
</template>
