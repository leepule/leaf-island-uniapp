<script setup lang="ts">
import { ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';

const scrollTop = ref(0);
onPageScroll((event) => { scrollTop.value = event.scrollTop; });
const apiRows = [
  { prop: 'visibilityHeight', desc: '超过该滚动距离后显示', type: 'number', defaultVal: '300' },
  { prop: 'scrollTop', desc: '当前页面滚动位置；小程序页面需在 onPageScroll 中传入', type: 'number', defaultVal: 'H5 自动检测' },
  { prop: 'duration', desc: '滚动到顶部的时长；H5 使用平滑滚动', type: 'number', defaultVal: '300' },
  { prop: 'right / bottom', desc: '按钮距视口右侧和底部距离', type: 'string', defaultVal: '32rpx' },
  { prop: 'text / showText', desc: '按钮文字及是否显示文字', type: 'string / boolean', defaultVal: '顶部 / true' },
  { prop: 'click', desc: '点击回到顶部事件', type: 'event', defaultVal: '-' },
];
const code = `const scrollTop = ref(0);
onPageScroll((event) => { scrollTop.value = event.scrollTop; });

<li-backtop :scroll-top="scrollTop" :visibility-height="240" />`;
function handleBacktop() {
  console.log('已返回顶部');
}
</script>

<template>
  <ComponentDemoPage name="backtop" use-case="长列表或长文章可提供快速回顶入口。H5 自动监听滚动；小程序页面需把 onPageScroll 的 scrollTop 传给组件。" :code="code" :api-rows="apiRows">
    <text>向下滚动页面，超过 240px 后右下角会出现返回顶部按钮。</text>
    <view v-for="index in 18" :key="index" class="scroll-row">岛屿观察记录 {{ index }}</view>
    <li-backtop :scroll-top="scrollTop" :visibility-height="240" @click="handleBacktop" />
  </ComponentDemoPage>
</template>

<style scoped>
.scroll-row { display: flex; align-items: center; min-height: 88rpx; padding: 0 24rpx; border-bottom: 1px solid var(--animal-border-color-light); color: var(--animal-text-color); }
</style>
