<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
import type { SelectOption } from './types';

const attrs = useAttrs();

interface Props {
    modelValue: string;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: '请选择',
    disabled: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'change', value: string): void;
}>();

const open = ref(false);
const hoveredKey = ref<string | null>(null);

const currentLabel = computed(
    () =>
        props.options.find((o) => o.key === props.modelValue)?.label ||
        props.placeholder,
);

function handleToggle() {
    if (props.disabled) return;
    open.value = !open.value;
}

function close() {
    open.value = false;
}

function handleSelect(key: string) {
    emit('update:modelValue', key);
    emit('change', key);
    open.value = false;
}
</script>

<template>
    <view
        class="animal-select"
        :class="{ 'animal-select--disabled': disabled }"
        v-bind="attrs"
    >
        <view
            class="animal-select__trigger"
            :class="{ 'animal-select__trigger--disabled': disabled }"
            @click="handleToggle"
        >
            <text
                class="animal-select__value"
                :class="{ 'animal-select__value--placeholder': !modelValue }"
            >
                {{ currentLabel }}
            </text>
            <view
                class="animal-select__arrow"
                :class="{ 'animal-select__arrow--open': open }"
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </view>
        </view>
        <!-- 点击外部关闭：全屏透明遮罩 -->
        <view
            v-if="open"
            class="animal-select__mask"
            @click.stop="close"
        />
        <view
            v-if="open"
            class="animal-select__dropdown"
        >
            <view
                v-for="option in options"
                :key="option.key"
                class="animal-select__option"
                :class="{
                    'animal-select__option--active': modelValue === option.key,
                    'animal-select__option--hovered': hoveredKey === option.key,
                }"
                @click.stop="handleSelect(option.key)"
                @mouseenter="hoveredKey = option.key"
                @mouseleave="hoveredKey = null"
            >
                <text class="animal-select__spacer" />
                {{ option.label }}
                <view
                    v-if="modelValue === option.key"
                    class="animal-select__highlight"
                />
            </view>
        </view>
    </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.animal-select {
    position: relative;
    display: inline-block;
    min-width: 140px;
    font-family: @font-family;
    user-select: none;

    &__trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: @spacing-sm 13px;
        background: #fff;
        border: 2px solid #e8dcc8;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            border-color: #d4c4a8;
            background: #fffdf7;
        }

        &--disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: #f5f5f0;

            &:hover {
                background: #f5f5f0 !important;
                border-color: #e8dcc8 !important;
            }
        }
    }

    &__value {
        font-size: @font-size-base;
        color: #725d42;
        font-weight: 600;

        &--placeholder {
            color: #a09080;
            font-weight: 400;
        }
    }

    &__arrow {
        display: flex;
        align-items: center;
        color: #a09080;
        transition: transform 0.2s;

        &--open {
            transform: rotate(180deg);
            color: @primary-color;
        }
    }

    // 透明遮罩：点击任意空白处关闭下拉（小程序无 document，用此替代）
    &__mask {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: transparent;
    }

    &__dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 6px;
        min-width: 100%;
        background: #ffeea0;
        border-radius: 28px;
        padding: @spacing-md 0;
        z-index: 100;
        opacity: 0;
        animation: animal-select-fade-in 0.2s ease forwards;
    }

    &__option {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 30px 10px 14px;
        font-size: @font-size-base;
        font-weight: 500;
        color: #725d42;
        cursor: pointer;
        white-space: nowrap;

        &--active {
            z-index: 1;
            font-weight: 700;
        }

        &--hovered {
            font-weight: 700;

            &::before {
                content: '';
                position: absolute;
                left: -12px;
                top: 50%;
                transform: translateY(-50%);
                width: 35px;
                height: 35px;
                background: url('../../assets/img/cursor/select-cursor.svg') no-repeat center / contain;
                animation: animal-select-cursor-in 0.5s ease-out forwards;
            }
        }
    }

    &__spacer {
        width: 16px;
        font-size: 12px;
    }

    &__highlight {
        position: absolute;
        left: 0;
        right: 0;
        top: 56%;
        transform: translateY(-50%);
        height: 14px;
        margin: 0 20px;
        background: #ffcc00;
        border-radius: 7px;
        z-index: -1;
        opacity: 0.3;
    }
}

@keyframes animal-select-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes animal-select-cursor-in {
    0% { opacity: 0; transform: translateY(-50%) translateX(-20px) rotate(-15deg); }
    60% { opacity: 1; transform: translateY(-50%) translateX(5px) rotate(5deg); }
    100% { opacity: 1; transform: translateY(-50%) translateX(0) rotate(0deg); }
}
</style>
