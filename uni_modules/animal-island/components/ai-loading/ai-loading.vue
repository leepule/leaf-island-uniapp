<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';
import type { LoadingProps } from './types';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<LoadingProps>(), {
    active: true,
    text: '',
    color: '#19c8b9',
    size: 24,
});

const attrs = useAttrs();
const containerRef = ref<HTMLElement | null>(null);

const spinnerSize = computed(() => {
    const s = props.size;
    return typeof s === 'number' ? `${s}px` : s;
});

const spinnerStyle = computed(() => ({
    width: spinnerSize.value,
    height: spinnerSize.value,
    borderColor: 'rgba(0,0,0,0.08)',
    borderTopColor: props.color,
    borderLeftColor: props.color,
}));

watch(
    () => props.active,
    (active) => {
        const container = containerRef.value;
        if (!container) return;
        if (active) {
            container.style.display = 'flex';
            requestAnimationFrame(() => {
                container.style.opacity = '1';
                container.style.transform = 'scale(1)';
            });
        } else {
            container.style.opacity = '0';
            container.style.transform = 'scale(1.1)';
            setTimeout(() => {
                if (containerRef.value && !props.active) {
                    containerRef.value.style.display = 'none';
                }
            }, 280);
        }
    },
    { immediate: true },
);
</script>

<template>
    <view
        ref="containerRef"
        class="animal-loading"
        v-bind="attrs"
    >
        <view class="animal-loading__spinner" :style="spinnerStyle" />
        <text v-if="text || $slots.default" class="animal-loading__text" :style="{ color: color }">
            <slot>{{ text }}</slot>
        </text>
    </view>
</template>

<style lang="less" scoped>
.animal-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.28s ease, transform 0.28s ease;

    &__spinner {
        box-sizing: border-box;
        border-style: solid;
        border-width: 3px;
        border-radius: 50%;
        animation: ai-loading-rotate 0.9s linear infinite;
    }

    &__text {
        font-size: 14px;
        line-height: 1.4;
        text-align: center;
    }
}

@keyframes ai-loading-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
    .animal-loading__spinner {
        animation: none !important;
    }
}
</style>
