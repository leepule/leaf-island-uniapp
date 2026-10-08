export interface TabbarItem {
  key: string;
  label: string;
  icon?: string;
  activeIcon?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabbarProps {
  items: TabbarItem[];
  modelValue?: string;
  defaultActiveKey?: string;
  fixed?: boolean;
  safeArea?: boolean;
  bordered?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}
