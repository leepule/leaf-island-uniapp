<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { PAGE_INFO } from '../../pageInfo';

const items = Object.entries(PAGE_INFO).map(([key, info]) => ({ key, ...info }));

const features = [
    { icon: '🎨', title: 'Animal 风格', desc: 'SVG 有机形状裁切，3D 按压按钮，温暖质朴的自然 UI 质感' },
    { icon: '🧩', title: '22 个组件', desc: 'Button / Input / Switch / Modal / Typewriter / Card / Collapse / Cursor / Time / Phone / Footer …' },
    { icon: '🎨', title: '主题定制', desc: '基于 Less 变量 + CSS 自定义属性，运行时换肤无需重新构建' },
    { icon: '📦', title: '开箱即用', desc: 'uni-app 跨端输出，H5 / 微信小程序 / App 全平台一致体验' },
];

const cols = ref(1);

function calcCols() {
    const width = uni.getSystemInfoSync().windowWidth || 375;
    const w = typeof window !== 'undefined' ? window.innerWidth : width;
    if (w >= 1024) cols.value = 4;
    else if (w >= 768) cols.value = 3;
    else if (w >= 480) cols.value = 2;
    else cols.value = 1;
}

let resizeHandler: (() => void) | null = null;
let offWindowResize: (() => void) | null = null;

onMounted(() => {
    calcCols();
    // 通知全局侧边导航高亮「首页」
    uni.$emit('demo-nav', 'home');
    // #ifdef H5
    resizeHandler = () => calcCols();
    window.addEventListener('resize', resizeHandler);
    // #endif
    // #ifndef H5
    offWindowResize = uni.onWindowResize(() => calcCols());
    // #endif
});

onUnmounted(() => {
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    if (offWindowResize) offWindowResize();
});

function go(key: string) {
    uni.navigateTo({
        url: `/pages/demos/${key}`,
        fail: () => uni.redirectTo({ url: `/pages/demos/${key}` }),
    });
}
</script>

<template>
    <AppLayout>
    <view class="home">
        <!-- Hero -->
        <view class="hero">
            <view class="hero-title">动物之岛<br />组件库</view>
            <view class="hero-subtitle">
                Animal 风格的 uni-app 组件库，基于 TypeScript + Vue 3 + Less 构建，让跨端应用充满温暖质感
            </view>
            <view class="hero-actions">
                <AiButton type="primary" size="large" @click="go('button')">开始使用 →</AiButton>
            </view>
        </view>

        <!-- 特性 -->
        <view class="section">
            <view class="section-title">特性</view>
            <view class="section-desc">为什么选择 animal-island</view>
            <view class="features">
                <view v-for="f in features" :key="f.title" class="feature-card">
                    <view class="feature-icon">{{ f.icon }}</view>
                    <view class="feature-title">{{ f.title }}</view>
                    <view class="feature-desc">{{ f.desc }}</view>
                </view>
            </view>
        </view>

        <!-- 组件一览 -->
        <view class="section">
            <view class="section-title">组件一览</view>
            <view class="section-desc">点击卡片查看详细文档和在线演示</view>
            <view class="comp-grid" :class="`comp-grid--cols-${cols}`">
                <view
                    v-for="item in items"
                    :key="item.key"
                    class="comp-card"
                    hover-class="comp-card--hover"
                    :hover-stay-time="150"
                    @click="go(item.key)"
                >
                    <view class="comp-name">{{ item.title }}</view>
                    <view class="comp-desc">{{ item.desc }}</view>
                </view>
            </view>
        </view>

        <view class="page-footer">
            <view class="footer-links">
                <text class="footer-link" @click="go('button')">组件文档</text>
            </view>
            <view>MIT License · Vue 3 + TypeScript + uni-app</view>
        </view>
    </view>
    </AppLayout>
</template>

<style lang="less" scoped>
.home {
    padding: 24rpx 24rpx 80rpx;
    box-sizing: border-box;

    /* Hero（对齐 demo 的 Hero 区） */
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 80rpx 32rpx 64rpx;
        background: #7dc395;
        border-radius: 24rpx;
        margin-bottom: 48rpx;

        .hero-title {
            font-size: 64rpx;
            font-weight: 800;
            line-height: 1.15;
            color: #fff9e6;
            text-shadow: 0 4rpx 1rpx rgba(0, 0, 0, 0.25);
            margin-bottom: 24rpx;
        }

        .hero-subtitle {
            font-size: 28rpx;
            color: #f3ead6;
            line-height: 1.7;
            max-width: 640rpx;
            margin-bottom: 40rpx;
        }

        .hero-actions {
            display: flex;
            gap: 16rpx;
        }
    }

    /* 通用 section（对齐 demo 的 section / section-title / section-desc） */
    .section {
        width: 100%;
        margin-bottom: 48rpx;
        padding: 0 8rpx;
        box-sizing: border-box;

        .section-title {
            font-size: 44rpx;
            font-weight: 700;
            color: #725d42;
            text-align: center;
            margin-bottom: 12rpx;
        }

        .section-desc {
            font-size: 26rpx;
            color: #7c5734;
            text-align: center;
            margin-bottom: 40rpx;
        }
    }

    /* 特性卡片 */
    .features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24rpx;

        .feature-card {
            background: #fff;
            border: 1px solid #e8e2d6;
            border-radius: 24rpx;
            padding: 32rpx;
            box-sizing: border-box;

            .feature-icon {
                font-size: 48rpx;
                margin-bottom: 16rpx;
            }

            .feature-title {
                font-size: 30rpx;
                font-weight: 700;
                color: #725d42;
                margin-bottom: 12rpx;
            }

            .feature-desc {
                font-size: 24rpx;
                line-height: 1.55;
                color: #7c5734;
            }
        }
    }

    /* 组件一览网格（对齐 demo 的 comp-grid / comp-card） */
    .comp-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 24rpx;
        box-sizing: border-box;

        &--cols-2 { grid-template-columns: repeat(2, 1fr); }
        &--cols-3 { grid-template-columns: repeat(3, 1fr); }
        &--cols-4 { grid-template-columns: repeat(4, 1fr); }

        .comp-card {
            background: #fff;
            border: 1px solid #e8e2d6;
            border-radius: 24rpx;
            padding: 32rpx 40rpx;
            transition: transform 0.15s ease;
            display: flex;
            flex-direction: column;

            &--hover {
                transform: translateY(-4rpx) scale(1.01);
            }

            .comp-name {
                font-size: 30rpx;
                font-weight: 700;
                color: #725d42;
                margin-bottom: 12rpx;
            }

            .comp-desc {
                font-size: 24rpx;
                line-height: 1.5;
                color: #7c5734;
            }
        }
    }

    /* 页脚 */
    .page-footer {
        text-align: center;
        font-size: 24rpx;
        color: #7c5734;
        margin-top: 32rpx;

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 20rpx;
            margin-bottom: 12rpx;

            .footer-link {
                font-size: 26rpx;
                color: #7c5734;
            }
        }
    }
}
</style>
