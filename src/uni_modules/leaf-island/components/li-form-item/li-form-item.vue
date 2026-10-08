<script setup lang="ts">
import { computed, inject, watch } from 'vue';
import { FormContextKey } from '../li-form/context';
import type { FormItemProps } from './types';

const props = withDefaults(defineProps<FormItemProps>(), { label: '', required: false, error: '' });
const form = inject(FormContextKey, null);
const errorMessage = computed(() => props.error || form?.errors[props.prop] || '');
const hasErrorSlot = computed(() => Boolean(errorMessage.value || props.required || form?.rules.value[props.prop]));

if (form) {
  watch(() => form.model.value[props.prop], () => form.clearField(props.prop));
}
</script>

<template>
  <view class="li-form-item" :class="{ 'li-form-item--error': errorMessage }">
    <text v-if="label" class="li-form-item__label">
      <text v-if="required" class="li-form-item__required">*</text>{{ label }}
    </text>
    <view class="li-form-item__control">
      <slot />
      <text
        v-if="hasErrorSlot"
        class="li-form-item__error"
        :class="{ 'li-form-item__error--placeholder': !errorMessage }"
        :aria-hidden="!errorMessage"
      >{{ errorMessage || '\u00a0' }}</text>
    </view>
  </view>
</template>

<style lang="less" scoped>
.li-form-item { display: flex; flex-direction: column; gap: 10px; width: 100%; }
.li-form-item__label { color: var(--animal-text-color, #594a37); font-size: 15px; font-weight: 700; line-height: 1.45; }
.li-form-item__required, .li-form-item__error { color: #d95b51; }
.li-form-item__control { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.li-form-item__error { display: block; height: 24px; box-sizing: border-box; overflow: hidden; color: #d95b51; font-size: 13px; line-height: 24px; white-space: nowrap; text-overflow: ellipsis; }
.li-form-item__error--placeholder { visibility: hidden; }
</style>
