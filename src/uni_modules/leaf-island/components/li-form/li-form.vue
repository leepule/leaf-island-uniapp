<script setup lang="ts">
import { computed, provide, reactive } from 'vue';
import { FormContextKey, type FormRule } from './context';
import type { FormProps } from './types';

const props = withDefaults(defineProps<FormProps>(), { rules: () => ({}), layout: 'vertical' });
const emit = defineEmits<{
  (e: 'submit', model: Record<string, unknown>): void;
  (e: 'validate', valid: boolean, errors: Record<string, string>): void;
}>();

const errors = reactive<Record<string, string>>({});
const model = computed(() => props.model);
const rules = computed(() => props.rules);

function validateField(name: string): string {
  const configured = rules.value[name];
  const fieldRules: FormRule[] = configured ? (Array.isArray(configured) ? configured : [configured]) : [];
  const value = model.value[name];
  for (const rule of fieldRules) {
    const empty = value == null || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0);
    if (rule.required && empty) {
      errors[name] = rule.message || '此项为必填项';
      return errors[name];
    }
    if (rule.validator) {
      const result = rule.validator(value, model.value);
      if (result !== true) {
        errors[name] = typeof result === 'string' ? result : rule.message || '输入内容不符合要求';
        return errors[name];
      }
    }
  }
  delete errors[name];
  return '';
}

function clearField(name: string) {
  delete errors[name];
}

function validate(): boolean {
  Object.keys(errors).forEach((name) => delete errors[name]);
  Object.keys(rules.value).forEach(validateField);
  const valid = Object.keys(errors).length === 0;
  emit('validate', valid, { ...errors });
  return valid;
}

function handleSubmit() {
  if (validate()) emit('submit', model.value);
}

provide(FormContextKey, { model, rules, errors, validateField, clearField });
defineExpose({ validate });
</script>

<template>
  <form class="li-form" :class="`li-form--${layout}`" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<style lang="less" scoped>
.li-form { display: flex; flex-direction: column; gap: 24px; width: 100%; }
.li-form--horizontal :deep(.li-form-item) { flex-direction: row; align-items: flex-start; }
.li-form--horizontal :deep(.li-form-item__label) { width: 120px; flex: 0 0 120px; padding-top: 10px; }
.li-form--horizontal :deep(.li-form-item__control) { flex: 1; min-width: 0; }
</style>
