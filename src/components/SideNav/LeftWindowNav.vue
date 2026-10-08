<script setup lang="ts">
/**
 * H5 左侧窗口组件（用于 uni-app leftWindow 响应式布局）
 * 仅在 H5 桌面端（>=768px）显示，由框架根据 matchMedia 自动控制显隐
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { PAGE_GROUPS, PAGE_INFO } from '../../pageInfo';
import { useDemoTheme } from '../../composables/demo-theme';

const current = ref('home');
const { theme } = useDemoTheme();
const homeItem = { key: 'home', title: '首页', sub: 'Home' };

const navGroups = computed(() => PAGE_GROUPS.map((group) => ({
  title: group.title,
  items: group.keys.map((key) => ({ key, ...PAGE_INFO[key] })),
})));
const componentCount = Object.keys(PAGE_INFO).length;

function syncCurrent() {
  const pages = getCurrentPages() as any[];
  const cur = pages[pages.length - 1];
  if (cur && cur.route) {
    if (cur.route === 'pages/demo/demo') current.value = 'home';
    else if (cur.route.startsWith('pages/demos/')) current.value = cur.route.split('/').pop();
  }
}

function navigate(key: string) {
  const url = key === 'home' ? '/pages/demo/demo' : `/pages/demos/${key}`;
  uni.redirectTo({
    url,
    fail: (err) => console.error('[left-nav] redirectTo failed', url, err),
  });
}

function onNav(key: string) {
  current.value = key;
}

let popHandler: (() => void) | null = null;

onMounted(() => {
  syncCurrent();
  uni.$on('demo-nav', onNav);
  popHandler = () => syncCurrent();
  window.addEventListener('popstate', popHandler);
});

onUnmounted(() => {
  uni.$off('demo-nav', onNav);
  if (popHandler) window.removeEventListener('popstate', popHandler);
});
</script>

<template>
  <li-theme-provider :theme="theme">
    <view class="left-window-nav">
      <view class="nav-logo" @click="navigate('home')">
        <text class="nav-logo-emoji">🍃</text>
        <text class="nav-logo-text">Leaf Island</text>
      </view>

      <text class="nav-section-label">导航</text>
      <view class="nav-list">
        <view class="nav-item" :class="{ active: current === homeItem.key }" @click="navigate(homeItem.key)">
          <text class="nav-emoji">🏠</text>
          <text class="nav-title">{{ homeItem.title }}</text>
          <text class="nav-sub">{{ homeItem.sub }}</text>
        </view>
        <view v-for="group in navGroups" :key="group.title" class="nav-group">
          <text class="nav-group-label">{{ group.title }}</text>
          <view
            v-for="item in group.items"
            :key="item.key"
            class="nav-item"
            :class="{ active: current === item.key }"
            @click="navigate(item.key)"
          >
            <text class="nav-dot" />
            <text class="nav-title">{{ item.title }}</text>
            <text v-if="item.sub" class="nav-sub">{{ item.sub }}</text>
          </view>
        </view>
      </view>

      <text class="nav-footer">{{ componentCount }} 个组件 · Vue 3 + uni-app</text>
    </view>
  </li-theme-provider>
</template>

<style lang="less" scoped>
.left-window-nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--animal-bg-color, #fffaf2);
  color: var(--animal-text-color, #794f27);
  border-right: 1px solid var(--animal-border-color-light, #e8e2d6);
  box-sizing: border-box;
}

.nav-logo {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  border-bottom: 1px solid var(--animal-border-color-light, #efe7d8);
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
}
.nav-logo-emoji {
  font-size: 24px;
}
.nav-logo-text {
  font-size: 18px;
  font-weight: 800;
  color: var(--animal-warm-color-soft, #725d42);
  letter-spacing: 0.5px;
}

.nav-section-label {
  padding: 18px 20px 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--animal-text-color-secondary, #b9a986);
  letter-spacing: 1px;
  text-transform: uppercase;
  flex-shrink: 0;
}

.nav-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 12px 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  color: var(--animal-text-color, #7c5734);
  cursor: pointer;
  border-left: 3px solid transparent;
  margin-bottom: 2px;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  user-select: none;
}
.nav-item:hover {
  background: var(--animal-bg-color-secondary, #f3ede0);
}
.nav-item.active {
  background: var(--animal-primary-color-bg, #eaf6f1);
  color: var(--animal-primary-color-active, #128a7c);
  border-left-color: var(--animal-primary-color, #19c8b9);
  font-weight: 600;
}
.nav-emoji {
  font-size: 15px;
  flex-shrink: 0;
}
.nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--animal-border-color, #cdbfa3);
  flex-shrink: 0;
}
.nav-item.active .nav-dot {
  background: var(--animal-primary-color, #19c8b9);
}
.nav-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav-sub {
  font-size: 11px;
  color: #b9a986;
  flex-shrink: 0;
}
.nav-item.active .nav-sub {
  color: #5fae9d;
}

.nav-group-label {
  display: block;
  padding: 18px 14px 6px;
  color: #b9a986;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
}

.nav-footer {
  flex-shrink: 0;
  padding: 14px 20px;
  font-size: 12px;
  color: #b9a986;
  border-top: 1px solid #efe7d8;
}
</style>
