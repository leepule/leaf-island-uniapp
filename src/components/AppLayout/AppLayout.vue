<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SideNav from '../SideNav.vue';
import { useDemoTheme } from '../../composables/demo-theme';

const statusBarHeight = ref(0);
const { theme, toggleTheme } = useDemoTheme();

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
  <li-theme-provider :theme="theme" :style="{ '--status-bar-height': statusBarHeight + 'px' }">
    <view class="app-root">
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
    <view class="theme-toggle" role="button" :aria-label="theme === 'dark' ? '切换浅色主题' : '切换暗色主题'" @click="toggleTheme">
      <text class="theme-toggle__icon">{{ theme === 'dark' ? '☀️' : '🌙' }}</text>
      <text>{{ theme === 'dark' ? '浅色模式' : '暗色模式' }}</text>
    </view>
  </li-theme-provider>
</template>

<style lang="less" scoped>
.app-root {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  min-height: 100vh;
}
.theme-toggle {
  position: fixed;
  z-index: 900;
  top: calc(var(--status-bar-height, 0px) + 16rpx);
  right: 24rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
  min-height: 68rpx;
  padding: 0 22rpx;
  border: 1px solid var(--animal-border-color-light, #e8e2d6);
  border-radius: 999rpx;
  background: var(--animal-surface-color, #fffdf7);
  color: var(--animal-text-color, #794f27);
  box-shadow: var(--animal-shadow-base, 0 6rpx 20rpx rgba(61, 52, 40, 0.1));
  font-size: 24rpx;
}
.theme-toggle__icon { font-size: 28rpx; }
.app-status-bar {
  flex: 0 0 100%;
  width: 100%;
  /* 背景色与导航栏 mobile-bar 保持一致 */
  background-color: var(--animal-bg-color, #fffaf2);
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
  .theme-toggle {
    top: calc(var(--status-bar-height, 0px) + 60px);
  }

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
