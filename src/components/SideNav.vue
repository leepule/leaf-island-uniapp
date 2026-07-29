<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { PAGE_INFO } from '../pageInfo';

const emit = defineEmits<{ (e: 'nav', key: string): void }>();

const drawerOpen = ref(false);
const current = ref('home');

// 导航项：首页 + 所有组件（顺序与 PAGE_INFO 一致）
const navItems = computed(() => {
    const list: { key: string; title: string; sub: string }[] = [
        { key: 'home', title: '首页', sub: 'Home' },
    ];
    for (const [key, info] of Object.entries(PAGE_INFO)) {
        list.push({ key, title: info.title, sub: info.tag });
    }
    return list;
});

const currentLabel = computed(() => {
    const item = navItems.value.find((i) => i.key === current.value);
    return item ? item.title : 'Animal Island';
});

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
    uni.navigateTo({
        url,
        fail: () => uni.redirectTo({ url }),
    });
    drawerOpen.value = false;
    emit('nav', key);
}

function toggleDrawer() {
    drawerOpen.value = !drawerOpen.value;
}

// 由各 demo 页的 DemoHeader 挂载时广播当前 key，用于高亮
function onNav(key: string) {
    current.value = key;
}

// 移动端检测：JS 双保险，避免某些情况下 CSS media query 不触发
const isMobile = ref(false);
let offResize: (() => void) | null = null;
let offOrientation: (() => void) | null = null;

function checkMobile() {
    // #ifdef H5
    isMobile.value = window.innerWidth <= 767;
    // #endif
    // #ifndef H5
    try {
        const sys = uni.getSystemInfoSync();
        isMobile.value = (sys.windowWidth || sys.screenWidth || 375) <= 767;
    } catch (e) {
        isMobile.value = false;
    }
    // #endif
}

let popHandler: (() => void) | null = null;

onMounted(() => {
    checkMobile();
    syncCurrent();
    uni.$on('demo-nav', onNav);
    // #ifdef H5
    popHandler = () => syncCurrent();
    window.addEventListener('popstate', popHandler);
    const onResize = () => checkMobile();
    const onOrientation = () => setTimeout(checkMobile, 100);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrientation);
    offResize = () => window.removeEventListener('resize', onResize);
    offOrientation = () => window.removeEventListener('orientationchange', onOrientation);
    // #endif
    // #ifndef H5
    offResize = uni.onWindowResize(() => checkMobile());
    // #endif
});

onUnmounted(() => {
    uni.$off('demo-nav', onNav);
    // #ifdef H5
    if (popHandler) window.removeEventListener('popstate', popHandler);
    if (offResize) offResize();
    if (offOrientation) offOrientation();
    // #endif
    // #ifndef H5
    if (offResize) offResize();
    // #endif
});
</script>

<template>
    <!-- 移动端顶部栏（含汉堡按钮），桌面端隐藏 -->
    <view class="mobile-bar" :class="{ show: isMobile }">
        <view class="hamburger" @click="toggleDrawer" aria-label="菜单">
            <view class="hamburger-line" />
            <view class="hamburger-line" />
            <view class="hamburger-line" />
        </view>
        <text class="mobile-bar-title">{{ currentLabel }}</text>
        <text class="mobile-bar-logo">🏝️</text>
    </view>

    <!-- 侧边导航：桌面端常驻，移动端为抽屉 -->
    <view class="side-nav" :class="{ open: drawerOpen, mobile: isMobile }">
        <view class="nav-logo" @click="navigate('home')">
            <text class="nav-logo-emoji">🏝️</text>
            <text class="nav-logo-text">Animal Island</text>
        </view>

        <text class="nav-section-label">导航</text>
        <view class="nav-list">
            <view
                v-for="item in navItems"
                :key="item.key"
                class="nav-item"
                :class="{ active: current === item.key }"
                @click="navigate(item.key)"
            >
                <text v-if="item.key === 'home'" class="nav-emoji">🏠</text>
                <text v-else class="nav-dot" />
                <text class="nav-title">{{ item.title }}</text>
                <text v-if="item.sub" class="nav-sub">{{ item.sub }}</text>
            </view>
        </view>

        <text class="nav-footer">{{ navItems.length - 1 }} 个组件 · Vue 3 + uni-app</text>
    </view>

    <!-- 移动端抽屉遮罩 -->
    <view v-if="drawerOpen && isMobile" class="backdrop mobile" @click="drawerOpen = false" />
</template>

<style lang="less" scoped>
.side-nav {
    flex: 0 0 260px;
    width: 260px;
    position: sticky;
    top: 0;
    align-self: flex-start;
    height: 100vh;
    background: #fffaf2;
    border-right: 1px solid #e8e2d6;
    display: flex;
    flex-direction: column;
    z-index: 50;
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 2px 0 12px rgba(120, 100, 60, 0.04);
}

.nav-logo {
    height: 64px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
    border-bottom: 1px solid #efe7d8;
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
    color: #725d42;
    letter-spacing: 0.5px;
}

.nav-section-label {
    padding: 18px 20px 6px;
    font-size: 12px;
    font-weight: 600;
    color: #b9a986;
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
    color: #7c5734;
    cursor: pointer;
    border-left: 3px solid transparent;
    margin-bottom: 2px;
    transition: background 0.15s ease, color 0.15s ease;
    user-select: none;
}
.nav-item:hover {
    background: #f3ede0;
}
.nav-item.active {
    background: #eaf6f1;
    color: #128a7c;
    border-left-color: #19c8b9;
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
    background: #cdbfa3;
    flex-shrink: 0;
}
.nav-item.active .nav-dot {
    background: #19c8b9;
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

.nav-footer {
    flex-shrink: 0;
    padding: 14px 20px;
    font-size: 12px;
    color: #b9a986;
    border-top: 1px solid #efe7d8;
}

/* ---------- 移动端：顶部栏 + 抽屉 ---------- */
.mobile-bar {
    display: none;
}
.hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20px;
    height: 14px;
    padding: 10px;
    margin-left: -10px;
    box-sizing: content-box;
    cursor: pointer;
    flex-shrink: 0;
}
.hamburger-line {
    width: 100%;
    height: 2px;
    background-color: #725d42;
    border-radius: 2px;
    transition: all 0.2s ease;
}
.mobile-bar-title {
    font-size: 16px;
    font-weight: 700;
    color: #725d42;
    flex: 1;
}
.mobile-bar-logo {
    font-size: 20px;
    flex-shrink: 0;
}
.backdrop {
    display: none;
}

/* 统一抽取移动端样式，同时给 .mobile 类与 media query 兜底 */
.side-nav.mobile {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 80%;
    max-width: 300px;
    transform: translateX(-100%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
    z-index: 100;
}
.side-nav.mobile.open {
    transform: translateX(0);
}

.mobile-bar.show {
    display: flex;
    align-items: center;
    gap: 12px;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    padding: 0 14px;
    padding-top: env(safe-area-inset-top);
    height: calc(52px + env(safe-area-inset-top));
    background: #fffaf2;
    border-bottom: 1px solid #e8e2d6;
    z-index: 60;
}

.backdrop.mobile {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(60, 48, 30, 0.35);
    z-index: 90;
}

@media (max-width: 767px) {
    .side-nav {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        width: 80%;
        max-width: 300px;
        transform: translateX(-100%);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
        z-index: 100;
    }
    .side-nav.open {
        transform: translateX(0);
    }

    .mobile-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        height: 52px;
        padding: 0 14px;
        padding-top: env(safe-area-inset-top);
        height: calc(52px + env(safe-area-inset-top));
        background: #fffaf2;
        border-bottom: 1px solid #e8e2d6;
        z-index: 60;
    }
}
</style>
