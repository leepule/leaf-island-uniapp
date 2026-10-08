<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { DatePickerFields, DatePickerProps } from './types';

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  start: '',
  end: '',
  fields: 'day',
  mode: 'single',
  view: 'month',
  disabledDates: () => [],
  disabledDate: undefined,
  valueFormat: '',
  placeholder: '请选择日期',
  disabled: false,
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | [string, string]): void;
  (e: 'change', value: string | [string, string]): void;
}>();

type DateParts = { year: number; month: number; day: number };
type PickerColumn = { key: DatePickerFields; values: number[]; selectedIndex: number; suffix: string };

function formatDate({ year, month, day }: DateParts): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const dateFormatToken = /yyyy|YYYY|MM|M|dd|DD|d|D/g;

function formatValue(parts: DateParts, format: string): string {
  return format.replace(dateFormatToken, (token) => {
    if (token === 'yyyy' || token === 'YYYY') return String(parts.year).padStart(4, '0');
    if (token === 'MM') return String(parts.month).padStart(2, '0');
    if (token === 'M') return String(parts.month);
    if (token === 'dd' || token === 'DD') return String(parts.day).padStart(2, '0');
    return String(parts.day);
  });
}

function parseFormattedValue(value: string, format: string): DateParts | null {
  const tokens: Array<{ index: number; token: string }> = [];
  const tokenMatcher = new RegExp(dateFormatToken.source, 'g');
  let tokenMatch: RegExpExecArray | null;
  while ((tokenMatch = tokenMatcher.exec(format))) tokens.push({ index: tokenMatch.index, token: tokenMatch[0] });
  if (!tokens.length) return null;
  let pattern = '^';
  let cursor = 0;
  const fields: Array<'year' | 'month' | 'day'> = [];
  for (const match of tokens) {
    const index = match.index;
    pattern += format.slice(cursor, index).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const token = match.token;
    if (token === 'yyyy' || token === 'YYYY') {
      pattern += '(\\d{4})';
      fields.push('year');
    } else if (token === 'MM' || token === 'M') {
      pattern += token === 'MM' ? '(\\d{2})' : '(\\d{1,2})';
      fields.push('month');
    } else {
      pattern += token === 'dd' || token === 'DD' ? '(\\d{2})' : '(\\d{1,2})';
      fields.push('day');
    }
    cursor = index + token.length;
  }
  pattern += format.slice(cursor).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$';
  const match = new RegExp(pattern).exec(value);
  if (!match) return null;
  const parts: DateParts = { year: 0, month: 1, day: 1 };
  fields.forEach((field, index) => { parts[field] = Number(match[index + 1]); });
  if (!parts.year || parts.month < 1 || parts.month > 12 || parts.day < 1 || parts.day > monthDays(parts.year, parts.month)) return null;
  return parts;
}

function parseDate(value: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const parts = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
  const date = new Date(parts.year, parts.month - 1, parts.day);
  return date.getFullYear() === parts.year && date.getMonth() === parts.month - 1 && date.getDate() === parts.day ? parts : null;
}

function todayParts(): DateParts {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

function monthDays(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function normalizeBoundary(value: string, fallback: string): string {
  const parts = parseDate(value);
  return parts ? formatDate(parts) : fallback;
}

const currentYear = new Date().getFullYear();
const startDate = computed(() => normalizeBoundary(props.start, `${currentYear - 100}-01-01`));
const endDate = computed(() => normalizeBoundary(props.end, `${currentYear + 100}-12-31`));
const resolvedValueFormat = computed(() => props.valueFormat || (props.fields === 'year' ? 'yyyy' : props.fields === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'));
function parseModelValue(value: string): DateParts | null {
  return parseFormattedValue(value, resolvedValueFormat.value) || parseDate(value);
}
const modelStart = computed(() => Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue || '');
const modelEnd = computed(() => Array.isArray(props.modelValue) ? props.modelValue[1] : '');
const minYear = computed(() => Number(startDate.value.slice(0, 4)));
const maxYear = computed(() => Math.max(minYear.value, Number(endDate.value.slice(0, 4))));
const years = computed(() => Array.from({ length: maxYear.value - minYear.value + 1 }, (_, i) => minYear.value + i));

function clampDate(parts: DateParts): DateParts {
  const month = Math.min(12, Math.max(1, parts.month));
  const day = Math.min(monthDays(parts.year, month), Math.max(1, parts.day));
  const date = formatDate({ year: parts.year, month, day });
  if (date < startDate.value) return parseDate(startDate.value)!;
  if (date > endDate.value) return parseDate(endDate.value)!;
  return { year: parts.year, month, day };
}

function monthValues(year: number): number[] {
  const min = year === minYear.value ? Number(startDate.value.slice(5, 7)) : 1;
  const max = year === maxYear.value ? Number(endDate.value.slice(5, 7)) : 12;
  return Array.from({ length: Math.max(0, max - min + 1) }, (_, i) => min + i);
}

function dayValues(year: number, month: number): number[] {
  let min = 1;
  let max = monthDays(year, month);
  if (formatDate({ year, month, day: 1 }).slice(0, 7) === startDate.value.slice(0, 7)) min = Number(startDate.value.slice(8, 10));
  if (formatDate({ year, month, day: 1 }).slice(0, 7) === endDate.value.slice(0, 7)) max = Number(endDate.value.slice(8, 10));
  return Array.from({ length: Math.max(0, max - min + 1) }, (_, i) => min + i)
    .filter((day) => !isDisabledDate(formatDate({ year, month, day })));
}

function isDisabledDate(value: string): boolean {
  return value < startDate.value || value > endDate.value
    || props.disabledDates.includes(value)
    || Boolean(props.disabledDate?.(value));
}

const open = ref(false);
const draft = ref(formatDate(clampDate(parseModelValue(modelStart.value) || todayParts())));
const rangeStartDraft = ref('');
const rangeEndDraft = ref('');
const rangeEndpoint = ref<'start' | 'end'>('start');
const selected = computed(() => clampDate(parseDate(draft.value) || todayParts()));
const calendarMonth = ref<DateParts>(selected.value);
const yearPageStart = ref(Math.floor(selected.value.year / 12) * 12);
const columns = computed<PickerColumn[]>(() => {
  const date = selected.value;
  const result: PickerColumn[] = [{ key: 'year', values: years.value, selectedIndex: Math.max(0, years.value.indexOf(date.year)), suffix: '年' }];
  if (props.fields !== 'year') {
    const values = monthValues(date.year);
    result.push({ key: 'month', values, selectedIndex: Math.max(0, values.indexOf(date.month)), suffix: '月' });
  }
  if (props.fields === 'day') {
    const values = dayValues(date.year, date.month);
    result.push({ key: 'day', values, selectedIndex: Math.max(0, values.indexOf(date.day)), suffix: '日' });
  }
  return result;
});
const pickerValue = computed(() => columns.value.map((column) => column.selectedIndex));
const desktopWeekdays = ['一', '二', '三', '四', '五', '六', '日'];
const desktopMonths = computed(() => Array.from({ length: 12 }, (_, index) => index + 1).filter((month) => {
  const value = `${calendarMonth.value.year}-${String(month).padStart(2, '0')}-01`;
  if (value.slice(0, 7) < startDate.value.slice(0, 7) || value.slice(0, 7) > endDate.value.slice(0, 7)) return false;
  return Array.from({ length: monthDays(calendarMonth.value.year, month) }, (_, day) => day + 1)
    .some((day) => !isDisabledDate(formatDate({ year: calendarMonth.value.year, month, day })));
}));
const desktopYears = computed(() => Array.from({ length: 12 }, (_, index) => yearPageStart.value + index).filter((year) => year >= minYear.value && year <= maxYear.value));
const rangeStartDate = computed(() => parseDate(rangeStartDraft.value));
const rangeEndDate = computed(() => parseDate(rangeEndDraft.value));
const displayValue = computed(() => {
  if (props.mode !== 'range') return typeof props.modelValue === 'string' ? props.modelValue : '';
  const start = modelStart.value;
  const end = modelEnd.value;
  return [start, end].filter(Boolean).join(' 至 ');
});
const desktopDays = computed(() => {
  const first = new Date(calendarMonth.value.year, calendarMonth.value.month - 1, 1);
  const firstOffset = (first.getDay() + 6) % 7;
  const gridStart = new Date(first.getFullYear(), first.getMonth(), first.getDate() - firstOffset);
  const dayCount = 42;
  return Array.from({ length: dayCount }, (_, index) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
    const parts = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    const value = formatDate(parts);
    const start = rangeStartDate.value ? formatDate(rangeStartDate.value) : '';
    const end = rangeEndDate.value ? formatDate(rangeEndDate.value) : '';
    return {
      ...parts,
      value,
      inMonth: parts.year === calendarMonth.value.year && parts.month === calendarMonth.value.month,
      disabled: isDisabledDate(value),
      inRange: Boolean(start && end && value > start && value < end),
      rangeStart: Boolean(start && value === start),
      rangeEnd: Boolean(end && value === end),
    };
  });
});
const calendarTitle = computed(() => {
  if (props.fields === 'year') return `${desktopYears.value[0] || yearPageStart.value} — ${desktopYears.value[desktopYears.value.length - 1] || yearPageStart.value + 11}`;
  if (props.fields === 'month') return `${calendarMonth.value.year} 年`;
  return `${calendarMonth.value.year} 年 ${calendarMonth.value.month} 月`;
});

const pickerHeading = computed(() => props.mode === 'range'
  ? (rangeEndpoint.value === 'start' ? '选择开始日期' : '选择结束日期')
  : '选择日期');

watch(() => props.modelValue, () => {
  if (open.value) return;
  const start = parseModelValue(modelStart.value);
  if (start) draft.value = formatDate(clampDate(start));
  rangeStartDraft.value = parseModelValue(modelStart.value) ? formatDate(clampDate(parseModelValue(modelStart.value)!)) : '';
  rangeEndDraft.value = parseModelValue(modelEnd.value) ? formatDate(clampDate(parseModelValue(modelEnd.value)!)) : '';
});

function showPicker() {
  if (props.disabled) return;
  const start = parseModelValue(modelStart.value);
  const end = parseModelValue(modelEnd.value);
  if (props.mode === 'range') {
    rangeStartDraft.value = start ? formatDate(clampDate(start)) : '';
    rangeEndDraft.value = end ? formatDate(clampDate(end)) : '';
    rangeEndpoint.value = 'start';
  }
  draft.value = formatDate(clampDate(start || todayParts()));
  calendarMonth.value = selected.value;
  yearPageStart.value = Math.floor(selected.value.year / 12) * 12;
  open.value = true;
}

function closePicker() {
  open.value = false;
}

function handleWheelChange(event: { detail?: { value?: number[] } }) {
  const indexes = event.detail?.value || [];
  const previous = selected.value;
  const year = years.value[Math.max(0, Math.min(years.value.length - 1, indexes[0] || 0))] ?? previous.year;
  const months = props.fields === 'year' ? [previous.month] : monthValues(year);
  const monthColumnIndex = 1;
  const monthIndex = props.fields === 'year' ? 0 : (indexes[monthColumnIndex] || 0);
  const month = months[Math.max(0, Math.min(months.length - 1, monthIndex))] ?? previous.month;
  const days = props.fields === 'day' ? dayValues(year, month) : [previous.day];
  const dayIndex = props.fields === 'day' ? (indexes[2] || 0) : 0;
  const day = days[Math.max(0, Math.min(days.length - 1, dayIndex))] ?? previous.day;
  draft.value = formatDate(clampDate({ year, month, day }));
  if (props.mode === 'range') {
    if (rangeEndpoint.value === 'start') rangeStartDraft.value = draft.value;
    else rangeEndDraft.value = draft.value;
  }
}

function confirmPicker() {
  if (props.mode === 'range') {
    const start = parseDate(rangeStartDraft.value) || selected.value;
    const end = parseDate(rangeEndDraft.value) || start;
    completeRange(start, end);
    return;
  }
  const selectedValue = formatDate(selected.value);
  if (props.fields === 'day' && isDisabledDate(selectedValue)) return;
  const value = formatValue(selected.value, resolvedValueFormat.value);
  emit('update:modelValue', value);
  emit('change', value);
  open.value = false;
}

function completeRange(first: DateParts, second: DateParts) {
  let start = first;
  let end = second;
  if (formatDate(start) > formatDate(end)) [start, end] = [end, start];
  const startValue = formatDate(start);
  const endValue = formatDate(end);
  if (isDisabledDate(startValue) || isDisabledDate(endValue)) return;
  for (let cursor = new Date(start.year, start.month - 1, start.day); cursor <= new Date(end.year, end.month - 1, end.day); cursor.setDate(cursor.getDate() + 1)) {
    const value = formatDate({ year: cursor.getFullYear(), month: cursor.getMonth() + 1, day: cursor.getDate() });
    if (isDisabledDate(value)) return;
  }
  const value: [string, string] = [
    formatValue(start, resolvedValueFormat.value),
    formatValue(end, resolvedValueFormat.value),
  ];
  rangeStartDraft.value = formatDate(start);
  rangeEndDraft.value = formatDate(end);
  emit('update:modelValue', value);
  emit('change', value);
  open.value = false;
}

function chooseRangeEndpoint(endpoint: 'start' | 'end') {
  rangeEndpoint.value = endpoint;
  const value = endpoint === 'start'
    ? rangeStartDraft.value
    : rangeEndDraft.value || rangeStartDraft.value;
  if (!value) return;
  draft.value = value;
  calendarMonth.value = parseDate(value) || todayParts();
}

function moveCalendar(direction: number, granularity: 'primary' | 'secondary' = 'primary') {
  if (!canMoveCalendar(direction, granularity)) return;
  if (props.fields === 'year') {
    const nextStart = yearPageStart.value + direction * 12;
    yearPageStart.value = nextStart;
    return;
  }
  if (props.fields === 'month' || (props.fields === 'day' && granularity === 'primary')) {
    const year = calendarMonth.value.year + direction;
    const month = calendarMonth.value.month;
    calendarMonth.value = { year, month, day: Math.min(calendarMonth.value.day, monthDays(year, month)) };
    return;
  }
  const target = new Date(calendarMonth.value.year, calendarMonth.value.month - 1 + direction, 1);
  calendarMonth.value = { ...calendarMonth.value, year: target.getFullYear(), month: target.getMonth() + 1 };
}

function canMoveCalendar(direction: number, granularity: 'primary' | 'secondary' = 'primary'): boolean {
  if (props.fields === 'year') {
    const nextStart = yearPageStart.value + direction * 12;
    return nextStart + 11 >= minYear.value && nextStart <= maxYear.value;
  }
  if (props.fields === 'month' || (props.fields === 'day' && granularity === 'primary')) {
    const targetYear = calendarMonth.value.year + direction;
    const targetYearMonth = `${targetYear}-${String(calendarMonth.value.month).padStart(2, '0')}`;
    return targetYearMonth >= startDate.value.slice(0, 7) && targetYearMonth <= endDate.value.slice(0, 7);
  }
  const target = new Date(calendarMonth.value.year, calendarMonth.value.month - 1 + direction, 1);
  const targetYearMonth = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}`;
  return targetYearMonth >= startDate.value.slice(0, 7) && targetYearMonth <= endDate.value.slice(0, 7);
}

function selectDesktopDate(parts: DateParts) {
  draft.value = formatDate(clampDate(parts));
  confirmPicker();
}

function chooseDesktopDay(day: (typeof desktopDays.value)[number]) {
  if (day.disabled) return;
  if (props.mode === 'range' && props.view === 'week') {
    const selectedDate = parseDate(day.value)!;
    const selectedDateObject = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const offset = (selectedDateObject.getDay() + 6) % 7;
    const monday = new Date(selectedDateObject.getFullYear(), selectedDateObject.getMonth(), selectedDateObject.getDate() - offset);
    const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    completeRange(
      { year: monday.getFullYear(), month: monday.getMonth() + 1, day: monday.getDate() },
      { year: sunday.getFullYear(), month: sunday.getMonth() + 1, day: sunday.getDate() },
    );
    return;
  }
  if (props.mode === 'range') {
    if (!rangeStartDraft.value || rangeEndDraft.value) {
      rangeStartDraft.value = day.value;
      rangeEndDraft.value = '';
      rangeEndpoint.value = 'end';
      draft.value = day.value;
      calendarMonth.value = day;
      return;
    }
    completeRange(parseDate(rangeStartDraft.value)!, day);
    return;
  }
  selectDesktopDate(day);
}

function chooseDesktopMonth(month: number) {
  selectDesktopDate({ ...selected.value, year: calendarMonth.value.year, month });
}

function chooseDesktopYear(year: number) {
  selectDesktopDate({ ...selected.value, year });
}
</script>

<template>
  <view class="li-date-picker__wrap">
    <view class="li-date-picker" :class="{ 'li-date-picker--disabled': disabled, 'li-date-picker--open': open }" :aria-disabled="disabled" @click="showPicker">
      <text :class="{ 'li-date-picker__placeholder': !displayValue }">{{ displayValue || placeholder }}</text>
      <text class="li-date-picker__icon" aria-hidden="true">▦</text>
    </view>

    <view v-if="open" class="li-date-picker__mask" @click="closePicker" />
    <view v-if="open" class="li-date-picker__desktop" @click.stop>
      <view class="li-date-picker__desktop-header">
        <view class="li-date-picker__nav" :class="{ 'li-date-picker__nav--disabled': !canMoveCalendar(-1) }" @click="moveCalendar(-1)">{{ props.fields === 'month' ? '‹' : '«' }}</view>
        <view v-if="props.fields === 'day'" class="li-date-picker__nav" :class="{ 'li-date-picker__nav--disabled': !canMoveCalendar(-1, 'secondary') }" @click="moveCalendar(-1, 'secondary')">‹</view>
        <view class="li-date-picker__desktop-title">{{ calendarTitle }}</view>
        <view v-if="props.fields === 'day'" class="li-date-picker__nav" :class="{ 'li-date-picker__nav--disabled': !canMoveCalendar(1, 'secondary') }" @click="moveCalendar(1, 'secondary')">›</view>
        <view class="li-date-picker__nav" :class="{ 'li-date-picker__nav--disabled': !canMoveCalendar(1) }" @click="moveCalendar(1)">{{ props.fields === 'month' ? '›' : '»' }}</view>
      </view>
      <view v-if="props.fields === 'day'" class="li-date-picker__calendar">
        <view v-for="weekday in desktopWeekdays" :key="weekday" class="li-date-picker__weekday">{{ weekday }}</view>
        <view
          v-for="day in desktopDays"
          :key="day.value"
          class="li-date-picker__day"
          :class="{
            'li-date-picker__day--outside': !day.inMonth,
            'li-date-picker__day--selected': day.value === draft,
            'li-date-picker__day--disabled': day.disabled,
            'li-date-picker__day--in-range': day.inRange,
            'li-date-picker__day--range-start': props.mode === 'range' && day.rangeStart,
            'li-date-picker__day--range-end': props.mode === 'range' && day.rangeEnd,
          }"
          @click="chooseDesktopDay(day)"
        >{{ day.day }}</view>
      </view>
      <view v-else-if="props.fields === 'month'" class="li-date-picker__grid li-date-picker__grid--months">
        <view v-for="month in desktopMonths" :key="month" class="li-date-picker__grid-item" :class="{ 'li-date-picker__grid-item--selected': calendarMonth.year === selected.year && month === selected.month }" @click="chooseDesktopMonth(month)">{{ month }}月</view>
      </view>
      <view v-else class="li-date-picker__grid li-date-picker__grid--years">
        <view v-for="year in desktopYears" :key="year" class="li-date-picker__grid-item" :class="{ 'li-date-picker__grid-item--selected': year === selected.year }" @click="chooseDesktopYear(year)">{{ year }}</view>
      </view>
    </view>
    <view v-if="open" class="li-date-picker__panel" @click.stop>
      <view class="li-date-picker__handle" />
      <view class="li-date-picker__header">
        <view class="li-date-picker__action li-date-picker__action--cancel" @click="closePicker">取消</view>
        <view class="li-date-picker__heading"><text class="li-date-picker__leaf">🍃</text>{{ pickerHeading }}</view>
        <view class="li-date-picker__action li-date-picker__action--confirm" @click="confirmPicker">完成</view>
      </view>
      <view v-if="props.mode === 'range'" class="li-date-picker__range-fields">
        <view
          class="li-date-picker__range-field"
          :class="{ 'li-date-picker__range-field--active': rangeEndpoint === 'start' }"
          @click="chooseRangeEndpoint('start')"
        >开始：{{ rangeStartDraft || '请选择' }}</view>
        <view
          class="li-date-picker__range-field"
          :class="{ 'li-date-picker__range-field--active': rangeEndpoint === 'end' }"
          @click="chooseRangeEndpoint('end')"
        >结束：{{ rangeEndDraft || '请选择' }}</view>
      </view>
      <picker-view class="li-date-picker__wheel" :value="pickerValue" indicator-style="height: 48px;" @change="handleWheelChange">
        <picker-view-column v-for="column in columns" :key="column.key" class="li-date-picker__column">
          <view v-for="value in column.values" :key="value" class="li-date-picker__option">{{ String(value).padStart(2, '0') }}{{ column.suffix }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.li-date-picker { display: flex; align-items: center; justify-content: space-between; min-height: 44px; padding: 0 14px; border: 2px solid var(--animal-border-color-light, #e2d8c6); border-radius: 14px; background: var(--animal-surface-color, #fffdf7); color: var(--animal-text-color, #594a37); }
.li-date-picker__wrap { position: relative; }
.li-date-picker__placeholder { color: #9d907c; }
.li-date-picker__icon { margin-left: 10px; color: #639b79; }
.li-date-picker--open { border-color: #19c8b9; box-shadow: 0 0 0 2px rgba(25, 200, 185, .12); }
.li-date-picker--disabled { opacity: .55; }
.li-date-picker__mask { position: fixed; z-index: 1398; top: 0; right: 0; bottom: 0; left: 0; background: rgba(61, 52, 40, .38); }
.li-date-picker__panel { position: fixed; z-index: 1399; right: 0; bottom: 0; left: 0; padding: 10px 20px calc(20px + env(safe-area-inset-bottom, 0px)); border: 1px solid var(--animal-border-color-light, #e8e2d6); border-bottom: 0; border-radius: 28px 28px 0 0; background: var(--animal-surface-color, #fffdf7); color: var(--animal-warm-color, #794f27); box-shadow: 0 -12px 36px rgba(61, 52, 40, .18); }
.li-date-picker__handle { width: 42px; height: 5px; margin: 2px auto 8px; border-radius: 5px; background: #d9cfba; }
.li-date-picker__header { display: flex; align-items: center; justify-content: space-between; height: 54px; border-bottom: 1px solid var(--animal-border-color-light, #e8e2d6); }
.li-date-picker__range-fields { display: flex; gap: 10px; margin: 14px 0 2px; }
.li-date-picker__range-field { flex: 1; padding: 10px 12px; border: 1px solid var(--animal-border-color-light, #e8e2d6); border-radius: 12px; color: var(--animal-text-color-secondary, #8b7b66); font-size: 12px; text-align: center; }
.li-date-picker__range-field--active { border-color: var(--animal-primary-color, #19c8b9); background: var(--animal-primary-color-bg, #e6f9f6); color: var(--animal-text-color, #594a37); }
.li-date-picker__heading { display: flex; align-items: center; gap: 7px; color: var(--animal-warm-color-soft, #725d42); font-size: 16px; font-weight: 800; }
.li-date-picker__leaf { color: #6fba2c; font-size: 15px; }
.li-date-picker__action { display: flex; align-items: center; justify-content: center; min-width: 56px; min-height: 34px; border-radius: 18px; font-size: 14px; }
.li-date-picker__action--cancel { color: var(--animal-text-color-secondary, #8b7b66); }
.li-date-picker__action--confirm { padding: 0 14px; border: 1px solid var(--animal-border-color-light, #e0d8c8); background: var(--animal-bg-color, #f8f8f0); color: var(--animal-warm-color, #794f27); font-weight: 800; box-shadow: 0 3px 0 #bdaea0; }
.li-date-picker__wheel { display: flex; width: 100%; height: 240px; }
.li-date-picker__column { flex: 1; min-width: 0; }
.li-date-picker__wheel :deep(.uni-picker-view-wrapper) { width: 100%; }
.li-date-picker__wheel :deep(.uni-picker-view-indicator) { border-top: 1px solid #d8cfba; border-bottom: 1px solid #d8cfba; background: rgba(25, 200, 185, .06); }
.li-date-picker__option { display: flex; align-items: center; justify-content: center; height: 46px; color: var(--animal-text-color, #594a37); font-size: 18px; line-height: 46px; }
.li-date-picker__desktop { display: none; }

@media (min-width: 768px) {
  .li-date-picker__mask { background: transparent; }
  .li-date-picker__panel { display: none; }
  .li-date-picker__desktop { display: block; position: absolute; z-index: 1400; top: calc(100% + 12px); left: 0; width: 340px; padding: 12px 14px 14px; border: 1px solid var(--animal-border-color-light, #e8e2d6); border-radius: 14px; background: var(--animal-surface-color, #fffdf7); color: var(--animal-text-color, #594a37); box-shadow: 0 8px 24px rgba(61, 52, 40, .16); }
  .li-date-picker__desktop::before { position: absolute; top: -7px; left: 38px; width: 12px; height: 12px; border-top: 1px solid var(--animal-border-color-light, #e8e2d6); border-left: 1px solid var(--animal-border-color-light, #e8e2d6); background: var(--animal-surface-color, #fffdf7); content: ''; transform: rotate(45deg); }
  .li-date-picker__desktop-header { position: relative; display: flex; align-items: center; justify-content: space-between; height: 42px; margin-bottom: 8px; }
  .li-date-picker__desktop-title { flex: 1; color: var(--animal-warm-color-soft, #725d42); font-size: 16px; font-weight: 800; text-align: center; }
  .li-date-picker__nav { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; color: var(--animal-warm-color-soft, #725d42); font-size: 20px; cursor: pointer; user-select: none; }
  .li-date-picker__nav:hover { background: #f3eee4; color: var(--animal-primary-color-active, #19a89d); }
  .li-date-picker__nav--disabled { color: #c8bda9; cursor: not-allowed; }
  .li-date-picker__calendar { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); }
  .li-date-picker__weekday, .li-date-picker__day { display: flex; align-items: center; justify-content: center; height: 40px; font-size: 14px; }
  .li-date-picker__weekday { border-bottom: 1px solid var(--animal-border-color-light, #e8e2d6); color: #9d907c; font-weight: 700; }
  .li-date-picker__day { margin: 2px 0; border-radius: 50%; color: var(--animal-text-color, #594a37); cursor: pointer; }
  .li-date-picker__day:hover { color: var(--animal-primary-color-active, #138d82); background: var(--animal-primary-color-bg, #e9f7f3); }
  .li-date-picker__day--outside { color: #c8bda9; }
  .li-date-picker__day--in-range { border-radius: 0; background: var(--animal-primary-color-bg, #e9f7f3); }
  .li-date-picker__day--selected { color: #fff; background: var(--animal-primary-color-active, #19a89d); }
  .li-date-picker__day--range-start { border-radius: 50% 0 0 50%; color: #fff; background: var(--animal-primary-color-active, #19a89d); }
  .li-date-picker__day--range-end { border-radius: 0 50% 50% 0; color: #fff; background: var(--animal-primary-color-active, #19a89d); }
  .li-date-picker__day--selected:hover { color: #fff; background: var(--animal-primary-color-active, #138d82); }
  .li-date-picker__day--disabled { color: #d8d0c3; background: transparent; cursor: not-allowed; }
  .li-date-picker__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 10px 4px 4px; }
  .li-date-picker__grid--years { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .li-date-picker__grid-item { display: flex; align-items: center; justify-content: center; height: 42px; border-radius: 8px; color: var(--animal-warm-color-soft, #725d42); cursor: pointer; }
  .li-date-picker__grid-item:hover { color: var(--animal-primary-color-active, #138d82); background: var(--animal-primary-color-bg, #e9f7f3); }
  .li-date-picker__grid-item--selected { color: var(--animal-primary-color-active, #138d82); font-weight: 800; }
}
</style>
