export type DatePickerFields = 'year' | 'month' | 'day';
export type DatePickerView = 'month' | 'week';
export type DatePickerValue = string | [string, string];

export interface DatePickerProps {
  modelValue?: DatePickerValue;
  start?: string;
  end?: string;
  fields?: DatePickerFields;
  /** Select one date or a start/end range. */
  mode?: 'single' | 'range';
  /** Desktop selection granularity. Week mode shows a full month and selects the clicked date's week. */
  view?: DatePickerView;
  /** Disabled calendar dates, formatted as yyyy-MM-dd. */
  disabledDates?: string[];
  /** Custom date disabling rule; receives yyyy-MM-dd. */
  disabledDate?: (date: string) => boolean;
  valueFormat?: string;
  placeholder?: string;
  disabled?: boolean;
}
