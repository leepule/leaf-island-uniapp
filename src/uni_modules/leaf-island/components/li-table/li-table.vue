<script setup lang="ts" generic="T extends TableRecord">
import { computed, type CSSProperties, type VNode } from 'vue';
import type { TableColumn, TableRecord } from './types';

const props = withDefaults(
  defineProps<{
    columns?: TableColumn<T>[];
    dataSource?: T[];
    rowKey?: string | ((record: T) => string);
    striped?: boolean;
    showHeader?: boolean;
    loading?: boolean;
    emptyText?: string;
    scroll?: { x?: number | string; y?: number | string };
  }>(),
  {
    columns: () => [] as TableColumn<T>[],
    dataSource: () => [] as T[],
    rowKey: 'key',
    striped: true,
    showHeader: true,
    loading: false,
    emptyText: '暂无数据',
  }
);

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

// uni-app 无 <table> 标签，用 flex 模拟单元格布局：
// 固定宽度列 -> flex: 0 0 auto + width；自适应列 -> flex: 1 1 0%（保证表头与表体列对齐）
function cellStyle(c: TableColumn<T>): CSSProperties {
  const style: CSSProperties = {
    flex: c.width ? '0 0 auto' : '1 1 0%',
    minWidth: 0,
    textAlign: cellAlign(c),
  };
  if (c.width) {
    style.width = typeof c.width === 'number' ? c.width + 'px' : c.width;
  }
  return { ...style, ...c.style };
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

const wrapperStyle = computed<CSSProperties>(() => ({
  overflowX: props.scroll?.x ? 'auto' : undefined,
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
    <view class="animal-table" :class="{ 'animal-table--loading': loading }" :style="tableStyle">
      <view v-if="showHeader" class="animal-table__head">
        <view class="animal-table__row animal-table__head-row">
          <view v-for="(col, i) in columns" :key="i" class="animal-table__th" :style="cellStyle(col)">
            <!-- #ifndef MP -->
            <view v-if="typeof col.title === 'function'" class="animal-table__th-inner">
              <component :is="col.title" />
            </view>
            <text v-else class="animal-table__th-inner">{{ col.title }}</text>
            <!-- #endif -->
            <!-- #ifdef MP -->
            <!-- 小程序端无法渲染函数返回的 VNode，函数式 title 退化为其字符串返回值 -->
            <text class="animal-table__th-inner">{{ titleText(col) }}</text>
            <!-- #endif -->
          </view>
        </view>
      </view>

      <view class="animal-table__body">
        <view v-if="dataSource.length === 0" class="animal-table__row">
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
          v-for="(record, index) in dataSource"
          v-else
          :key="getRowKey(record, index)"
          class="animal-table__row"
          :class="{ 'animal-table__row--striped': striped && index % 2 === 1 }"
        >
          <view v-for="(col, ci) in columns" :key="ci" class="animal-table__cell" :style="cellStyle(col)">
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
  background: rgb(247, 243, 223);
  border-radius: 20px;
  padding: 6px;
  box-sizing: border-box;
}

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
    background: rgb(247, 243, 223);
  }

  &__head-row {
    position: relative;
  }

  &__th {
    padding: 16px 20px;
    font-size: @font-size-base;
    font-weight: 700;
    color: #725d42;
    white-space: nowrap;
    letter-spacing: 0.02em;
    background: transparent;
  }

  &__th-inner {
    display: inline-block;
  }

  &__body {
    display: flex;
    flex-direction: column;
    background: rgb(247, 243, 223);
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
    color: #9f927d;
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
        color: #3d2e1e;
      }
    }
  }

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
    color: #725d42;
    line-height: 1.6;
    transition: all 0.25s @motion-ease;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  &__loader {
    position: absolute;
    inset: 0;
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
    border: 4px solid fade(@primary-color, 25%);
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
