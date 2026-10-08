<script setup lang="ts">
import { computed } from 'vue';
import { useControlled } from '../../composables/useControlled';
import type { RateProps } from './types';

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: undefined,
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: false,
  disabled: false,
  readonly: false,
  showText: false,
  texts: () => ['很差', '较差', '一般', '不错', '很好'],
  character: '★',
  color: '#f2b544',
  voidColor: '#ded8cb',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
}>();

const starIndexes = computed(() => Array.from({ length: Math.max(1, Math.floor(props.count)) }, (_, index) => index));
const { value: rawValue, setValue } = useControlled(
  () => props.modelValue,
  props.defaultValue,
  (value) => emit('update:modelValue', value),
);
const rating = computed(() => Math.min(starIndexes.value.length, Math.max(0, Number(rawValue.value) || 0)));
const textLabel = computed(() => {
  if (!rating.value) return '';
  return props.texts[Math.ceil(rating.value) - 1] || String(rating.value);
});

function starFill(index: number): string {
  return `${Math.min(100, Math.max(0, (rating.value - index) * 100))}%`;
}

function submit(value: number) {
  if (props.disabled || props.readonly) return;
  const next = props.allowClear && rating.value === value ? 0 : value;
  setValue(next);
  emit('change', next);
}

function handleKeydown(event: KeyboardEvent) {
  if (props.disabled || props.readonly) return;
  const step = props.allowHalf ? .5 : 1;
  let next: number | null = null;
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.min(starIndexes.value.length, rating.value + step);
  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = Math.max(0, rating.value - step);
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = starIndexes.value.length;
  if (next === null) return;
  event.preventDefault();
  setValue(next);
  emit('change', next);
}
</script>

<template>
  <view
    class="li-rate"
    :class="{ 'li-rate--disabled': disabled, 'li-rate--readonly': readonly }"
    role="slider"
    :aria-label="`评分 ${rating} / ${starIndexes.length}`"
    :aria-valuenow="rating"
    aria-valuemin="0"
    :aria-valuemax="starIndexes.length"
    :aria-disabled="disabled || readonly"
    :tabindex="disabled ? -1 : 0"
    @keydown="handleKeydown"
  >
    <view v-for="index in starIndexes" :key="index" class="li-rate__star">
      <text class="li-rate__character" :style="{ color: voidColor }">{{ character }}</text>
      <text class="li-rate__fill" :style="{ width: starFill(index), color }">{{ character }}</text>
      <template v-if="!disabled && !readonly">
        <view v-if="allowHalf" class="li-rate__hit li-rate__hit--left" :aria-label="`${index + 0.5} 星`" @click="submit(index + 0.5)" />
        <view v-if="allowHalf" class="li-rate__hit li-rate__hit--right" :aria-label="`${index + 1} 星`" @click="submit(index + 1)" />
        <view v-else class="li-rate__hit li-rate__hit--full" :aria-label="`${index + 1} 星`" @click="submit(index + 1)" />
      </template>
    </view>
    <text v-if="showText && textLabel" class="li-rate__text">{{ textLabel }}</text>
  </view>
</template>

<style lang="less" scoped>
.li-rate { display: inline-flex; align-items: center; gap: 3px; outline: none; }
.li-rate:focus-visible { border-radius: 4px; box-shadow: 0 0 0 2px var(--animal-primary-color, #19c8b9); }
.li-rate__star { position: relative; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; line-height: 1; }
.li-rate__character, .li-rate__fill { display: block; }
.li-rate__fill { position: absolute; top: 0; left: 0; overflow: hidden; white-space: nowrap; pointer-events: none; }
.li-rate__hit { position: absolute; z-index: 1; top: 0; bottom: 0; cursor: pointer; }
.li-rate__hit--left { left: 0; width: 50%; }
.li-rate__hit--right { right: 0; width: 50%; }
.li-rate__hit--full { inset: 0; }
.li-rate--disabled, .li-rate--readonly { cursor: default; }
.li-rate--disabled { opacity: .5; }
.li-rate__text { margin-left: 7px; color: var(--animal-text-color-secondary, #8b7b66); font-size: 12px; }
</style>
