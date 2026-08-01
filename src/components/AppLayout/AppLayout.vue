<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SideNav from '../SideNav.vue';

const statusBarHeight = ref(0);

onMounted(() => {
  // #ifndef H5
  try {
    const info = (uni.getWindowInfo && uni.getWindowInfo()) || (uni.getSystemInfoSync && uni.getSystemInfoSync()) || {};
    statusBarHeight.value = info.statusBarHeight || 0;
  } catch (e) {
    console.warn('[AppLayout] 获取状态栏高度失败', e);
  }
  // #endif
});
</script>

<template>
  <view class="app-root" :style="{ '--status-bar-height': statusBarHeight + 'px' }">
    <!-- 桌面端：状态栏占位（背景色与导航栏 mobile-bar 保持一致） -->
    <view class="app-status-bar" />
    <!-- 侧边导航 -->
    <view class="app-sidebar-outer">
      <view class="app-sidebar">
        <SideNav />
      </view>
    </view>
    <!-- 主内容区 -->
    <view class="app-main">
      <slot />
    </view>
  </view>
</template>

<style lang="less" scoped>
.app-root {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  min-height: 100vh;
}
.app-status-bar {
  flex: 0 0 100%;
  width: 100%;
  /* 背景色与导航栏 mobile-bar 保持一致 */
  background-color: #fffaf2;
  /* #ifndef H5 */
  padding-top: var(--status-bar-height, 0);
  /* #endif */
}
.app-sidebar-outer {
  flex: 0 0 260px;
  width: 260px;
  position: relative;
}
.app-sidebar {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.app-main {
  flex: 1;
  min-width: 0; /* 防止内容撑破 flex 容器 */
  overflow-x: hidden;
}

/* 移动端（≤767px） */
@media (max-width: 767px) {
  .app-sidebar-outer {
    position: static;
    overflow: visible;
  }
  .app-sidebar {
    position: static;
    max-height: none;
    overflow: visible;
    overscroll-behavior: auto;
  }
}
</style>
