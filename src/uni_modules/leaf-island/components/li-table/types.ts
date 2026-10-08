import type { CSSProperties, VNode } from 'vue';

export type TableRecord = Record<string, unknown>;
export type TableFilterValue = string | number | boolean;
export type TableSortOrder = 'ascend' | 'descend' | null;

export interface TableFilter {
  text: string;
  value: TableFilterValue;
}

export interface TableColumn<T extends TableRecord = TableRecord> {
  title: string | (() => VNode | string);
  key?: string;
  dataIndex?: keyof T & string;
  /** Custom cell renderer. Use slot `cell-{dataIndex}` for richer control. */
  render?: (value: unknown, record: T, index: number) => VNode | string | number | null;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  style?: CSSProperties;
  /** Enable local sorting, or provide a record comparator. Fixed columns need an explicit pixel width. */
  sorter?: boolean | ((a: T, b: T) => number);
  /** Filter choices shown in the column filter panel. */
  filters?: TableFilter[];
  /** Use multiple selected filter values; defaults to true. */
  filterMultiple?: boolean;
  /** Custom filter predicate. */
  onFilter?: (value: TableFilterValue, record: T) => boolean;
  /** Keep the column visible at the left or right edge while horizontally scrolling. */
  fixed?: 'left' | 'right';
}

export interface TableProps<T extends TableRecord = TableRecord> {
  columns?: TableColumn<T>[];
  dataSource?: T[];
  rowKey?: string | ((record: T) => string);
  striped?: boolean;
  showHeader?: boolean;
  loading?: boolean;
  emptyText?: string;
  scroll?: { x?: number | string; y?: number | string };
}
