/** Lucide icon name, such as `leaf`, `icon-leaf`, or `MessageCircle`. */
export type IconName = string;

export interface IconProps {
  name: IconName;
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeWidth?: number | string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  class?: string;
  /** H5 传给 Lucide；其他端用于设置 image 尺寸。 */
  size?: number | string;
  bounce?: boolean;
  variant?: 'dark' | 'light';
}
