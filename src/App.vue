<script setup lang="ts">
// 引入一次 animal-island 全局样式（含 CSS 变量 / reset）
// 注意：H5 端侧边栏由 pages.json 的 leftWindow 配置驱动（响应式布局），
// 非 H5 端（小程序/App）由各页面内的 AppLayout 组件提供布局。
</script>

<template>
  <router-view />
</template>

<style lang="less">
@import './uni_modules/animal-island/index.less';

page,
.app-root {
  background: #f6f3e8;
  min-height: 100vh;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #5f5238;
}

/* ---------- 各 demo 页共享样式（对齐 demo 参考站） ---------- */
/* 组件 demo 页整体作为一张白底卡片，内嵌奶油色 demo-box，形成 demo 的层叠质感 */
.demo-page {
  margin: 24rpx;
  padding: 48rpx 40rpx 56rpx;
  background: #ffffff;
  border: 1px solid #e8e2d6;
  border-radius: 24rpx;
  box-sizing: border-box;
}

/* 页头：组件名 + 标签 chip，对齐 demo 的 sectionTitleStyle */
.demo-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #725d42;
  display: flex;
  align-items: center;
  gap: 12rpx;
  line-height: 1.3;
}
.demo-tag {
  display: inline-block;
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  background: #f0e8d8;
  color: #a08060;
  font-weight: 500;
  vertical-align: middle;
}
.demo-desc {
  font-size: 24rpx;
  color: #a0936e;
  margin: 16rpx 0 8rpx;
  line-height: 1.6;
}

/* 分区小标题，对齐 demo 的 labelStyle */
.demo-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #a0936e;
  margin: 40rpx 0 24rpx;
}

/* 演示内盒：奶油底，对齐 demo 的 demoBoxStyle */
.demo-box {
  background: #faf8f3;
  border: 1px solid #e8e2d6;
  border-radius: 24rpx;
  padding: 32rpx;
  box-sizing: border-box;
}
.demo-dashed {
  border: 1.5px dashed #e0d8c8;
  border-radius: 24rpx;
  padding: 28rpx;
  background: #faf8f3;
}
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  align-items: center;
}
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  max-width: 720rpx;
}
.demo-note {
  font-size: 22rpx;
  line-height: 1.6;
  color: #a0936e;
  background: #faf8f3;
  border-left: 4px solid #e0d8c8;
  border-radius: 12rpx;
  padding: 16rpx 20rpx;
  margin: 16rpx 0 4rpx;
}

/* 代码块：「使用示例」标签已内置于 AiCodeBlock 的 title prop（见 ai-code-block.vue），此处不再引用库内部 class */

/* ========== H5 leftWindow 布局修复：侧边栏固定 + 内容区独立滚动 ========== */
/* 框架的 uni-left-window 默认随页面一起滚动，需改为固定布局 */
/* 注：这些选择器仅对 H5 的 uni-* 自定义元素生效，小程序/App 端无影响 */
uni-layout {
  display: block !important;
  height: 100vh !important;
  overflow: hidden !important;
}

uni-content {
  display: flex !important;
  flex-direction: row !important;
  height: 100% !important;
  overflow: hidden !important;
}

/* 左侧窗口：固定定位，不随内容滚动 */
uni-left-window {
  position: sticky !important;
  top: 0 !important;
  height: 100vh !important;
  max-height: 100vh !important;
  overflow-y: auto !important;
  z-index: 997 !important;
  flex-shrink: 0 !important;
}

/* 右侧主内容区：独立滚动 */
uni-main {
  flex: 1 !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: 100% !important;
}

/* ========== H5 大屏（≥768px）：leftWindow 显示时，隐藏页面内 AppLayout 的侧边栏/状态栏 ==========
 * 框架 leftWindow（≥768px）已提供左侧导航，页面级 AppLayout 的 sidebar 不应重复渲染。
 * 小屏下（<768px）leftWindow 隐藏，AppLayout 正常显示，提供小程序一致的导航体验。
 * 使用 media query 而非 .uni-app--showleftwindow 类选择器，避免框架行为不一致导致导航消失。
 */
@media (min-width: 768px) {
  .app-status-bar,
  .app-sidebar-outer {
    display: none !important;
  }

  .app-root {
    display: block !important;   /* 取消 flex，sidebar 已隐藏 */
    min-height: 100vh;
  }

  .app-main {
    width: 100% !important;     /* 内容区撑满 */
  }
}

/* ========== H5 小屏（<768px）：AppLayout 移动端布局 ==========
 * leftWindow 隐藏，AppLayout 提供小程序一致的导航体验。
 * 关键：让 app-sidebar-outer 占满宽度（mobile-bar 自然撑满顶栏），
 *       side-nav 抽屉由 SideNav 自身 .side-nav.mobile { position:fixed } 控制。
 * 注意：AppLayout.vue 中同名媒体查询被 #ifndef H5 包裹（不编译到 H5），
 *       所以必须在此处用全局 CSS 补偿。
 */
@media (max-width: 767px) {
  /* 恢复标准响应式根字号比例（375px 对应 16px 基准），使用 clamp 限制在 14px~18px 范围，
     确保小屏移动设备上文字大小和谐自然，避免过大导致排版错乱溢出。 */
  html {
    font-size: clamp(14px, calc(100vw / 23.4375), 18px) !important;
  }

  .app-root {
    flex-direction: column !important;
    /* 确保 app-root 不创建会截断 fixed 子元素的 stacking context */
    overflow: visible !important;
  }

  .app-status-bar {
    display: none !important;   /* mobile-bar 自带安全区域内边距，不需要状态栏占位 */
  }

  .app-sidebar-outer {
    flex: 0 0 auto !important;
    width: 100% !important;
    position: static !important;
    overflow: visible !important;   /* 防止抽屉被 clip */
  }

  .app-sidebar {
    position: static !important;
    max-height: none !important;
    overflow: visible !important;
  }

  .app-main {
    flex: 0 0 auto !important;
    width: 100% !important;
    /* 预留出顶部固定定位 mobile-bar 的高度（基础高度 52px + 状态栏高度 + H5安全区域高度） */
    padding-top: calc(52px + var(--status-bar-height, 0px) + env(safe-area-inset-top, 0px)) !important;
    box-sizing: border-box !important;
  }

  /* ---------- 移动端抽屉层级修复 ----------
   * SideNav 组件的 scoped 样式给抽屉设了 z-index:100、遮罩 z-index:90，
   * 但在复杂嵌套（uni-page-wrapper → uni-page-body → AppLayout → SideNav）中可能被框架元素覆盖。
   * 此处用更高 z-index + !important 确保抽屉始终在最上层。 */
  .side-nav.mobile {
    z-index: 99999 !important;
  }
  .backdrop.mobile {
    z-index: 99998 !important;
  }
  .mobile-bar.show {
    z-index: 99997 !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
  }
}
</style>
