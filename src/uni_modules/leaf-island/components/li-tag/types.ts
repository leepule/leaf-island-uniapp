export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type TagSize = 'small' | 'middle' | 'large';

export interface TagProps {
  type?: TagType;
  size?: TagSize;
  closable?: boolean;
  checkable?: boolean;
  modelValue?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
}
