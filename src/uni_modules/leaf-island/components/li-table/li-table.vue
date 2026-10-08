<script setup lang="ts" generic="T extends TableRecord">
import { computed, ref, type CSSProperties, type VNode } from 'vue';
import type { TableColumn, TableFilterValue, TableProps, TableRecord, TableSortOrder } from './types';

const props = withDefaults(defineProps<TableProps<T>>(), {
  columns: () => [] as TableColumn<T>[],
  dataSource: () => [] as T[],
  rowKey: 'key',
  striped: true,
  showHeader: true,
  loading: false,
  emptyText: '暂无数据',
});

const emit = defineEmits<{
  (e: 'sort-change', payload: { column: TableColumn<T>; order: TableSortOrder }): void;
  (e: 'filter-change', payload: Record<string, TableFilterValue[]>): void;
}>();

defineSlots<{
  [key: `cell-${string}`]: (scope: { value: unknown; record: T; index: number }) => unknown;
  [key: `header-${string}`]: (scope: { column: TableColumn<T> }) => unknown;
  empty?: () => unknown;
}>();

function getRowKey(record: T, index: number): string {
  if (typeof props.rowKey === 'function') return props.rowKey(record);
  const v = (record as TableRecord)[props.rowKey];
  return v != null ? String(v) : String(index);
}

function cellAlign(c: TableColumn<T>): CSSProperties['textAlign'] {
  return c.align ?? 'left';
}

function columnKey(c: TableColumn<T>, index: number): string {
  return c.dataIndex || c.key || String(index);
}

function widthInPixels(width: string | number | undefined): number {
  if (typeof width === 'number') return width;
  if (!width) return 0;
  const match = /^(\d+(?:\.\d+)?)px$/.exec(width.trim());
  return match ? Number(match[1]) : 0;
}

function fixedOffset(c: TableColumn<T>, index: number, side: 'left' | 'right'): number {
  if (side === 'left') {
    return props.columns.slice(0, index).reduce((total, column) => total + (column.fixed === 'left' ? widthInPixels(column.width) : 0), 0);
  }
  return props.columns.slice(index + 1).reduce((total, column) => total + (column.fixed === 'right' ? widthInPixels(column.width) : 0), 0);
}

// uni-app 无 <table> 标签，用 flex 模拟单元格布局：
// 固定宽度列 -> flex: 0 0 auto + width；自适应列 -> flex: 1 1 0%（保证表头与表体列对齐）
function cellStyle(c: TableColumn<T>, index: number, header = false): CSSProperties {
  const style: CSSProperties = {
    flex: c.width ? '0 0 auto' : '1 1 0%',
    minWidth: 0,
    textAlign: cellAlign(c),
  };
  if (c.width) {
    style.width = typeof c.width === 'number' ? c.width + 'px' : c.width;
  }
  if (c.fixed) {
    style.position = 'sticky';
    const offset = `${fixedOffset(c, index, c.fixed)}px`;
    if (c.fixed === 'left') style.left = offset;
    else style.right = offset;
    style.zIndex = header ? 4 : 2;
  }
  return { ...style, ...c.style };
}

function fixedClass(c: TableColumn<T>, header = false): string[] {
  return c.fixed ? [
    `animal-table__fixed--${c.fixed}`,
    header ? 'animal-table__fixed--header' : 'animal-table__fixed--body',
  ] : [];
}

function renderCustom(col: TableColumn<T>, record: T, index: number): VNode | string | number | null {
  if (!col.render) return null;
  const value = col.dataIndex ? (record as TableRecord)[col.dataIndex] : undefined;
  return col.render(value, record, index);
}

// 以下两个函数仅用于小程序端：WXML 无法渲染运行时 VNode，
// 函数式 title / render 只能退化为其字符串（或数字）返回值，返回 VNode 时输出空字符串。
function titleText(col: TableColumn<T>): string {
  const t = typeof col.title === 'function' ? col.title() : col.title;
  return typeof t === 'string' ? t : '';
}

function renderText(col: TableColumn<T>, record: T, index: number): string {
  const r = renderCustom(col, record, index);
  return typeof r === 'string' || typeof r === 'number' ? String(r) : '';
}

const sortColumn = ref('');
const sortOrder = ref<TableSortOrder>(null);
const activeFilters = ref<Record<string, TableFilterValue[]>>({});
const draftFilters = ref<Record<string, TableFilterValue[]>>({});
const activeFilterKey = ref('');
const activeFilterColumn = computed(() => props.columns.find((column, index) => columnKey(column, index) === activeFilterKey.value));

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
}

const visibleData = computed(() => {
  let records = [...props.dataSource];
  for (const [key, values] of Object.entries(activeFilters.value)) {
    if (!values.length) continue;
    const columnIndex = props.columns.findIndex((column, index) => columnKey(column, index) === key);
    const column = props.columns[columnIndex];
    if (!column) continue;
    records = records.filter((record) => values.some((value) => column.onFilter
      ? column.onFilter(value, record)
      : column.dataIndex ? (record as TableRecord)[column.dataIndex] === value : false));
  }
  const columnIndex = props.columns.findIndex((column, index) => columnKey(column, index) === sortColumn.value);
  const column = props.columns[columnIndex];
  if (column && sortOrder.value && column.sorter) {
    const direction = sortOrder.value === 'ascend' ? 1 : -1;
    records = records
      .map((record, originalIndex) => ({ record, originalIndex }))
      .sort((a, b) => {
        const order = typeof column.sorter === 'function'
          ? column.sorter(a.record, b.record)
          : column.dataIndex ? compareValues((a.record as TableRecord)[column.dataIndex], (b.record as TableRecord)[column.dataIndex]) : 0;
        return order === 0 ? a.originalIndex - b.originalIndex : order * direction;
      })
      .map(({ record }) => record);
  }
  return records;
});

function toggleSort(column: TableColumn<T>, index: number) {
  if (!column.sorter) return;
  const key = columnKey(column, index);
  const nextOrder: TableSortOrder = sortColumn.value !== key
    ? 'ascend'
    : sortOrder.value === null ? 'ascend' : sortOrder.value === 'ascend' ? 'descend' : null;
  sortColumn.value = nextOrder ? key : '';
  sortOrder.value = nextOrder;
  emit('sort-change', { column, order: nextOrder });
}

function openFilter(column: TableColumn<T>, index: number) {
  const key = columnKey(column, index);
  if (activeFilterKey.value === key) {
    activeFilterKey.value = '';
    return;
  }
  activeFilterKey.value = key;
  draftFilters.value = { ...draftFilters.value, [key]: [...(activeFilters.value[key] || [])] };
}

function isFilterSelected(value: TableFilterValue): boolean {
  return (draftFilters.value[activeFilterKey.value] || []).includes(value);
}

function toggleFilter(value: TableFilterValue) {
  const key = activeFilterKey.value;
  const column = activeFilterColumn.value;
  const current = draftFilters.value[key] || [];
  const next = current.includes(value) ? current.filter((item) => item !== value)
    : column?.filterMultiple === false ? [value] : [...current, value];
  draftFilters.value = { ...draftFilters.value, [key]: next };
}

function applyFilters() {
  const key = activeFilterKey.value;
  const next = { ...activeFilters.value };
  const values = draftFilters.value[key] || [];
  if (values.length) next[key] = values;
  else delete next[key];
  activeFilters.value = next;
  emit('filter-change', { ...next });
  activeFilterKey.value = '';
}

function clearFilters() {
  draftFilters.value = { ...draftFilters.value, [activeFilterKey.value]: [] };
  applyFilters();
}

function isFiltered(column: TableColumn<T>, index: number): boolean {
  return Boolean(activeFilters.value[columnKey(column, index)]?.length);
}

function sortIndicator(column: TableColumn<T>, index: number): string {
  if (sortColumn.value !== columnKey(column, index) || !sortOrder.value) return '↕';
  return sortOrder.value === 'ascend' ? '↑' : '↓';
}

const wrapperStyle = computed<CSSProperties>(() => ({
  overflowX: 'auto',
  overflowY: props.scroll?.y ? 'auto' : undefined,
  maxHeight: typeof props.scroll?.y === 'number' ? `${props.scroll.y}px` : props.scroll?.y,
}));

// 横向滚动时给内部表格一个最小宽度，超出 wrapper 才出现滚动条
const tableStyle = computed<CSSProperties>(() => ({
  minWidth: typeof props.scroll?.x === 'number' ? `${props.scroll.x}px` : props.scroll?.x,
}));
</script>

<template>
  <view class="animal-table-wrapper" :style="wrapperStyle">
    <view v-if="activeFilterColumn" class="animal-table__filter-panel">
      <view class="animal-table__filter-title">筛选：{{ titleText(activeFilterColumn) }}</view>
      <view class="animal-table__filter-options">
        <view
          v-for="option in activeFilterColumn.filters"
          :key="String(option.value)"
          class="animal-table__filter-option"
          :class="{ 'animal-table__filter-option--selected': isFilterSelected(option.value) }"
          role="checkbox"
          :aria-checked="isFilterSelected(option.value)"
          @click="toggleFilter(option.value)"
        >
          <view class="animal-table__filter-check">{{ isFilterSelected(option.value) ? '✓' : '' }}</view>
          <text>{{ option.text }}</text>
        </view>
      </view>
      <view class="animal-table__filter-actions">
        <view class="animal-table__filter-action" @click="activeFilterKey = ''">取消</view>
        <view class="animal-table__filter-action" @click="clearFilters">重置</view>
        <view class="animal-table__filter-action animal-table__filter-action--primary" @click="applyFilters">确定</view>
      </view>
    </view>
    <view class="animal-table" :class="{ 'animal-table--loading': loading }" :style="tableStyle">
      <view v-if="showHeader" class="animal-table__head">
        <view class="animal-table__row animal-table__head-row">
          <view
            v-for="(col, i) in columns"
            :key="i"
            class="animal-table__th"
            :class="[
              fixedClass(col, true),
              { 'animal-table__th--sortable': !!col.sorter },
            ]"
            :style="cellStyle(col, i, true)"
            @click="toggleSort(col, i)"
          >
            <view class="animal-table__th-content">
              <slot v-if="col.dataIndex && $slots[`header-${col.dataIndex}`]" :name="`header-${col.dataIndex}`" :column="col" />
            <!-- #ifndef MP -->
              <view v-else-if="typeof col.title === 'function'" class="animal-table__th-inner">
                <component :is="col.title" />
              </view>
              <text v-else class="animal-table__th-inner">{{ col.title }}</text>
            <!-- #endif -->
            <!-- #ifdef MP -->
            <!-- 小程序端无法渲染函数返回的 VNode，函数式 title 退化为其字符串返回值 -->
              <text v-else class="animal-table__th-inner">{{ titleText(col) }}</text>
            <!-- #endif -->
            </view>
            <view v-if="col.sorter || col.filters?.length" class="animal-table__th-actions" @click.stop>
              <view
                v-if="col.sorter"
                class="animal-table__sort-trigger"
                :class="{ 'animal-table__sort-trigger--active': sortColumn === columnKey(col, i) && sortOrder }"
                role="button"
                :aria-label="`按${titleText(col)}排序`"
                @click.stop="toggleSort(col, i)"
              >{{ sortIndicator(col, i) }}</view>
              <view
                v-if="col.filters?.length"
                class="animal-table__filter-trigger"
                :class="{
                  'animal-table__filter-trigger--active': isFiltered(col, i),
                  'animal-table__filter-trigger--open': activeFilterKey === columnKey(col, i),
                }"
                role="button"
                :aria-label="`筛选${titleText(col)}`"
                @click.stop="openFilter(col, i)"
              >▼</view>
            </view>
          </view>
        </view>
      </view>

      <view class="animal-table__body">
        <view v-if="visibleData.length === 0" class="animal-table__row">
          <view class="animal-table__empty-cell">
            <view class="animal-table__empty">
              <slot name="empty">
                <view class="animal-table__empty-icon" aria-hidden="true" />
                <text>{{ emptyText }}</text>
              </slot>
            </view>
          </view>
        </view>
        <view
          v-for="(record, index) in visibleData"
          v-else
          :key="getRowKey(record, index)"
          class="animal-table__row"
          :class="{ 'animal-table__row--striped': striped && index % 2 === 1 }"
        >
          <view
            v-for="(col, ci) in columns"
            :key="ci"
            class="animal-table__cell"
            :class="fixedClass(col)"
            :style="cellStyle(col, ci)"
          >
            <slot
              v-if="col.dataIndex && $slots[`cell-${col.dataIndex}`]"
              :name="`cell-${col.dataIndex}`"
              :value="(record as TableRecord)[col.dataIndex]"
              :record="record"
              :index="index"
            />
            <!-- #ifndef MP -->
            <component v-else-if="col.render" :is="() => renderCustom(col, record, index)" />
            <!-- #endif -->
            <!-- #ifdef MP -->
            <!-- 小程序端无法渲染函数返回的 VNode，render 仅支持字符串/数字返回值 -->
            <text v-else-if="col.render">{{ renderText(col, record, index) }}</text>
            <!-- #endif -->
            <text v-else>{{ col.dataIndex ? (record as TableRecord)[col.dataIndex] : '' }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="loading" class="animal-table__loader">
      <view class="animal-table__spinner" aria-hidden="true" />
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.animal-table-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: var(--animal-bg-color-input, #f7f3df);
  border-radius: 20px;
  padding: 6px;
  box-sizing: border-box;
}

.animal-table__filter-panel {
  margin: 2px 2px 8px;
  padding: 14px;
  border: 1px solid var(--animal-border-color-light, #e8e2d6);
  border-radius: 12px;
  background: var(--animal-surface-color, #fffdf7);
  box-shadow: 0 4px 12px rgba(61, 52, 40, .08);
}
.animal-table__filter-title { margin-bottom: 10px; color: var(--animal-warm-color-soft, #725d42); font-size: 13px; font-weight: 700; }
.animal-table__filter-options { display: flex; flex-wrap: wrap; gap: 8px; }
.animal-table__filter-option { display: inline-flex; align-items: center; gap: 6px; padding: 5px 8px; border: 1px solid var(--animal-border-color-light, #e8e2d6); border-radius: 8px; color: var(--animal-text-color-secondary, #8b7b66); font-size: 12px; cursor: pointer; }
.animal-table__filter-option--selected { border-color: var(--animal-primary-color, #19c8b9); background: var(--animal-primary-color-bg, #e6f9f6); color: var(--animal-primary-color-active, #138d82); }
.animal-table__filter-check { display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; border: 1px solid currentColor; border-radius: 4px; font-size: 10px; line-height: 1; }
.animal-table__filter-option--selected .animal-table__filter-check { border-color: var(--animal-primary-color, #19c8b9); background: var(--animal-primary-color, #19c8b9); color: var(--animal-surface-color, #fffdf7); }
.animal-table__filter-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
.animal-table__filter-action { padding: 6px 12px; border: 1px solid var(--animal-border-color-light, #e8e2d6); border-radius: 8px; color: var(--animal-text-color-secondary, #8b7b66); font-size: 12px; }
.animal-table__filter-action--primary { border-color: var(--animal-primary-color, #19c8b9); background: var(--animal-primary-color, #19c8b9); color: #fff; }

.animal-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: @font-family;

  &--loading {
    opacity: 0.7;
    pointer-events: none;
  }

  &__head {
    display: flex;
    flex-direction: column;
    background: var(--animal-bg-color-input, #f7f3df);
  }

  &__head-row {
    position: relative;
  }

  &__th {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 16px 20px;
    font-size: @font-size-base;
    font-weight: 700;
    color: var(--animal-warm-color-soft, #725d42);
    white-space: nowrap;
    letter-spacing: 0.02em;
    background: transparent;
  }

  &__th-inner {
    display: inline-block;
  }

  &__th-content { display: flex; align-items: center; flex: 1 1 auto; min-width: 0; }
  &__th-actions { display: inline-flex; align-items: center; gap: 5px; flex: 0 0 auto; margin-left: 8px; }
  &__th--sortable { cursor: pointer; }
  &__sort-trigger, &__filter-trigger { display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 20px; border-radius: 5px; color: var(--animal-text-color-secondary, #9f927d); font-size: 12px; line-height: 1; cursor: pointer; }
  &__sort-trigger:hover, &__filter-trigger:hover, &__sort-trigger--active, &__filter-trigger--active, &__filter-trigger--open { background: var(--animal-primary-color-bg, #e6f9f6); color: var(--animal-primary-color-active, #138d82); }
  &__filter-trigger { font-size: 9px; }
  &__fixed--left, &__fixed--right { background: var(--animal-bg-color-input, #f7f3df); }
  &__fixed--header { background: var(--animal-bg-color-input, #f7f3df); }

  &__body {
    display: flex;
    flex-direction: column;
    background: var(--animal-bg-color-input, #f7f3df);
  }

  &__empty-cell {
    flex: 1 1 auto;
    padding: 60px 20px;
    text-align: center;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: var(--animal-text-color-secondary, #9f927d);
    font-size: @font-size-base;
  }

  &__empty-icon {
    width: 48px;
    height: 48px;
    background: url('../../assets/img/icons/table-empty.svg') no-repeat center / contain;
    opacity: 0.5;
  }

  &__row {
    position: relative;
    display: flex;
    align-items: stretch;
    transition: all 0.25s @motion-ease;

    &--striped {
      background: rgba(248, 248, 240, 0.6);
    }

    &:hover {
      background-image: repeating-linear-gradient(
        -45deg,
        rgba(25, 200, 185, 0.6),
        rgba(25, 200, 185, 0.6) 10px,
        rgba(14, 196, 182, 0.6) 10px,
        rgba(14, 196, 182, 0.6) 20px
      );
      background-size: 28.28px 28.28px;
      clip-path: inset(0 0 0 0 round 30px);

      .animal-table__cell {
        color: var(--animal-warm-color, #3d2e1e);
      }
    }
  }

  &__row--striped &__fixed--body { background: rgba(248, 248, 240, 0.98); }

  &__head-row::after,
  &__row::after {
    content: '';
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 0;
    height: 1px;
    background: repeating-linear-gradient(
      90deg,
      rgb(240, 232, 216) 0,
      rgb(240, 232, 216) 6px,
      transparent 6px,
      transparent 12px
    );
    transition: opacity 0.25s @motion-ease;
  }

  &__row:last-child::after {
    display: none;
  }

  &__row:hover::after {
    opacity: 0;
  }

  &__cell {
    padding: 14px 20px;
    font-size: @font-size-base;
    font-weight: 500;
    color: var(--animal-warm-color-soft, #725d42);
    line-height: 1.6;
    transition: all 0.25s @motion-ease;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  &__loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(247, 243, 223, 0.8);
    backdrop-filter: blur(2px);
  }

  &__spinner {
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border: 4px solid var(--animal-primary-color-25, rgba(25, 200, 185, 0.25));
    border-top-color: @primary-color;
    border-radius: 50%;
    animation: animal-table-spin 1s linear infinite;
  }
}

@keyframes animal-table-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
