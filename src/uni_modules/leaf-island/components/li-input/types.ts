export type InputSize = 'small' | 'middle' | 'large';
export type InputStatus = 'error' | 'warning';

export interface InputProps {
  modelValue?: string;
  size?: InputSize;
  /** Preferred name for showing the clear control. */
  clearable?: boolean;
  /** @deprecated Use `clearable`. Kept as a backwards-compatible alias. */
  allowClear?: boolean;
  status?: InputStatus;
  shadow?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  readonly?: boolean;
  maxlength?: number;
}
