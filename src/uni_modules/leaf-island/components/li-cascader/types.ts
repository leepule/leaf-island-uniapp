export type CascaderValue = string | number;

export interface CascaderOption {
  label: string;
  value: CascaderValue;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface CascaderProps {
  options: CascaderOption[];
  modelValue?: CascaderValue[];
  open?: boolean;
  title?: string;
  placeholder?: string;
  separator?: string;
  clearable?: boolean;
  disabled?: boolean;
}
