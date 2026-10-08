<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { CascaderOption, CascaderProps, CascaderValue } from './types';

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: () => [],
  open: undefined,
  title: '请选择地区',
  placeholder: '请选择',
  separator: ' / ',
  clearable: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: CascaderValue[]): void;
  (e: 'change', value: CascaderValue[], selectedOptions: CascaderOption[]): void;
  (e: 'clear'): void;
  (e: 'update:open', value: boolean): void;
}>();

const internalOpen = ref(false);
const visible = computed(() => props.open ?? internalOpen.value);
const selectedPath = ref<CascaderOption[]>([]);
const activeTab = ref(0);

function findPath(values: CascaderValue[]): CascaderOption[] {
  const result: CascaderOption[] = [];
  let options = props.options;
  for (const value of values) {
    const item = options.find((option) => option.value === value);
    if (!item) break;
    result.push(item);
    options = item.children ?? [];
  }
  return result;
}

const columns = computed(() => {
  const result: CascaderOption[][] = [props.options];
  for (const item of selectedPath.value) {
    if (!item.children?.length) break;
    result.push(item.children);
  }
  return result;
});

const tabs = computed(() => {
  const result = selectedPath.value.map((item) => item.label);
  const lastItem = selectedPath.value[selectedPath.value.length - 1];
  if (!lastItem || lastItem.children?.length) result.push(props.placeholder);
  return result;
});
const activeOptions = computed(() => columns.value[activeTab.value] ?? []);
const activeSelected = computed(() => selectedPath.value[activeTab.value]);
const selectedOptionId = computed(() => activeSelected.value
  ? `li-cascader-option-${String(activeSelected.value.value)}`
  : '');

const displayValue = computed(() => findPath(props.modelValue).map((item) => item.label).join(props.separator));
const showClear = computed(() => props.clearable && !!props.modelValue.length && !props.disabled);

function syncActiveTab() {
  const lastItem = selectedPath.value[selectedPath.value.length - 1];
  activeTab.value = lastItem?.children?.length
    ? selectedPath.value.length
    : Math.max(0, selectedPath.value.length - 1);
}

watch(() => props.modelValue, (value) => {
  selectedPath.value = findPath(value);
  if (visible.value) syncActiveTab();
}, { deep: true });
watch(visible, (isOpen) => {
  if (isOpen) {
    selectedPath.value = findPath(props.modelValue);
    syncActiveTab();
  }
}, { immediate: true });
watch(() => props.options, () => {
  selectedPath.value = findPath(props.modelValue);
  if (visible.value) syncActiveTab();
}, { deep: true });

function setOpen(next: boolean) {
  if (props.disabled) return;
  internalOpen.value = next;
  emit('update:open', next);
  if (next) {
    selectedPath.value = findPath(props.modelValue);
    syncActiveTab();
  }
}

function selectOption(option: CascaderOption, columnIndex: number) {
  if (props.disabled || option.disabled) return;
  const nextPath = selectedPath.value.slice(0, columnIndex);
  nextPath.push(option);
  if (option.children?.length) {
    selectedPath.value = nextPath;
    activeTab.value = columnIndex + 1;
    return;
  }
  const values = nextPath.map((item) => item.value);
  selectedPath.value = nextPath;
  emit('update:modelValue', values);
  emit('change', values, nextPath);
  setOpen(false);
}

function closePanel() {
  setOpen(false);
}

function clear(event: Event) {
  event.stopPropagation();
  if (props.disabled) return;
  selectedPath.value = [];
  emit('update:modelValue', []);
  emit('change', [], []);
  emit('clear');
}
</script>

<template>
  <view class="li-cascader" :class="{ 'li-cascader--disabled': disabled }">
    <view class="li-cascader__trigger" :class="{ 'li-cascader__trigger--open': visible }" @click="setOpen(!visible)">
      <text class="li-cascader__value" :class="{ 'li-cascader__placeholder': !displayValue }">{{ displayValue || placeholder }}</text>
      <text v-if="showClear" class="li-cascader__clear" role="button" @click="clear">×</text>
      <view class="li-cascader__arrow" :class="{ 'li-cascader__arrow--open': visible }" aria-hidden="true" />
    </view>
    <view v-if="visible" class="li-cascader__mask" @click="setOpen(false)" />
    <view v-if="visible" class="li-cascader__panel" @click.stop>
      <view class="li-cascader__header">
        <text class="li-cascader__title">{{ title }}</text>
        <text class="li-cascader__close" role="button" aria-label="关闭" @click="closePanel">×</text>
      </view>
      <scroll-view class="li-cascader__tabs" scroll-x :show-scrollbar="false">
        <view class="li-cascader__tabs-inner">
          <view
            v-for="(tab, tabIndex) in tabs"
            :key="tabIndex"
            class="li-cascader__tab"
            :class="{
              'li-cascader__tab--active': activeTab === tabIndex,
              'li-cascader__tab--placeholder': tabIndex === selectedPath.length,
            }"
            @click="activeTab = tabIndex"
          >{{ tab }}</view>
        </view>
      </scroll-view>
      <scroll-view :key="activeTab" class="li-cascader__options" :scroll-into-view="selectedOptionId" scroll-y>
        <view
          v-for="option in activeOptions"
          :key="String(option.value)"
          :id="activeSelected?.value === option.value ? selectedOptionId : undefined"
          class="li-cascader__option"
          :class="{
            'li-cascader__option--selected': activeSelected?.value === option.value,
            'li-cascader__option--disabled': option.disabled,
          }"
          @click="selectOption(option, activeTab)"
        >
          <text class="li-cascader__option-label">{{ option.label }}</text>
          <text v-if="activeSelected?.value === option.value" class="li-cascader__option-check">✓</text>
          <text v-else-if="option.children?.length" class="li-cascader__option-arrow">›</text>
        </view>
        <view v-if="!activeOptions.length" class="li-cascader__empty">暂无选项</view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.li-cascader { position: relative; width: 100%; color: @warm-color-soft; }
.li-cascader__trigger { display: flex; align-items: center; min-height: @height-base; padding: 0 16px; border: 2px solid @border-color-light; border-radius: 16px; background: var(--animal-surface-color, #fffdf7); transition: border-color @motion-duration-base @motion-ease, box-shadow @motion-duration-base @motion-ease; }
.li-cascader__trigger--open { border-color: @primary-color-active; box-shadow: 0 0 0 3px var(--animal-primary-color-12, rgba(25, 200, 185, 0.12)); }
.li-cascader__value { flex: 1; min-width: 0; overflow: hidden; color: @warm-color; font-size: @font-size-base; text-overflow: ellipsis; white-space: nowrap; }
.li-cascader__placeholder { color: @text-color-disabled; }
.li-cascader__clear { display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; margin-right: 8px; border-radius: 50%; background: var(--animal-warm-color-soft-12, rgba(114, 93, 66, 0.12)); color: @warm-color-soft; font-size: 18px; line-height: 1; }
.li-cascader__arrow { flex: 0 0 8px; width: 8px; height: 8px; margin: 0 3px 0 12px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; box-sizing: border-box; color: @text-color-secondary; transform: translateY(-2px) rotate(45deg); transition: color @motion-duration-fast @motion-ease, transform @motion-duration-fast @motion-ease; }
.li-cascader__arrow--open { color: @primary-color-active; transform: translateY(2px) rotate(225deg); }
.li-cascader__mask { position: fixed; z-index: 1449; top: 0; right: 0; bottom: 0; left: 0; background: transparent; }
.li-cascader__panel { position: absolute; z-index: 1450; top: calc(100% + 8px); right: 0; left: 0; display: flex; flex-direction: column; overflow: hidden; border: 1px solid @border-color-light; border-radius: 16px; background: var(--animal-surface-color, #fffdf7); box-shadow: 0 8px 24px rgba(61, 52, 40, .16); }
.li-cascader__header { display: flex; flex: 0 0 52px; align-items: center; justify-content: space-between; min-width: 0; padding: 0 16px; border-bottom: 1px solid var(--animal-border-color-light); box-sizing: border-box; }
.li-cascader__title { overflow: hidden; color: @warm-color; font-size: @font-size-lg; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
.li-cascader__close { display: flex; flex: 0 0 36px; align-items: center; justify-content: flex-end; height: 40px; color: @text-color-disabled; font-size: 30px; font-weight: 300; line-height: 1; }
.li-cascader__tabs { flex: 0 0 48px; width: 100%; border-bottom: 1px solid @border-color-light; box-sizing: border-box; }
.li-cascader__tabs-inner { display: flex; align-items: stretch; min-width: 100%; min-height: 48px; padding: 0 16px; box-sizing: border-box; }
.li-cascader__tab { position: relative; display: flex; flex: 0 0 auto; align-items: center; justify-content: center; min-height: 48px; margin-right: 24px; color: @warm-color; font-size: @font-size-sm; font-weight: 600; white-space: nowrap; }
.li-cascader__tab--placeholder { color: @text-color-secondary; font-weight: 400; }
.li-cascader__tab--active { color: @primary-color-active; }
.li-cascader__tab--active::after { position: absolute; right: 0; bottom: 0; left: 0; height: 3px; border-radius: 3px 3px 0 0; background: @primary-color-active; content: ''; }
.li-cascader__options { width: 100%; height: 252px; padding: 6px 0; box-sizing: border-box; }
.li-cascader__option { display: flex; align-items: center; justify-content: space-between; min-height: 42px; padding: 10px 16px; color: @warm-color-soft; font-size: @font-size-base; line-height: 22px; box-sizing: border-box; }
.li-cascader__option:active { background: var(--animal-primary-color-bg-60, rgba(230, 249, 246, 0.6)); }
.li-cascader__option--selected { color: @primary-color-active; font-weight: 700; }
.li-cascader__option--disabled { color: @text-color-disabled; }
.li-cascader__option-label { flex: 1; min-width: 0; }
.li-cascader__option-arrow { margin-left: 8px; color: @text-color-secondary; font-size: 22px; line-height: 1; }
.li-cascader__option-check { margin-left: 12px; color: @primary-color-active; font-size: 20px; font-weight: 700; }
.li-cascader__empty { padding: 18px 10px; color: @text-color-secondary; font-size: @font-size-sm; text-align: center; }
.li-cascader--disabled { opacity: .58; }
@media (max-width: 520px) {
  .li-cascader__mask { background: rgba(35, 31, 25, .28); }
  .li-cascader__panel { position: fixed; top: auto; right: 0; bottom: 0; left: 0; height: 78vh; max-height: 640px; padding-bottom: env(safe-area-inset-bottom, 0px); border: 0; border-radius: 20px 20px 0 0; box-shadow: 0 -10px 32px rgba(61, 52, 40, .18); box-sizing: border-box; }
  .li-cascader__options { flex: 1 1 auto; height: auto; min-height: 0; padding: 8px 0 12px; }
  .li-cascader__option { min-height: 48px; padding: 12px 20px; }
}
</style>
