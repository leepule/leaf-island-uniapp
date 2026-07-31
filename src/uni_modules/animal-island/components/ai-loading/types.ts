export interface LoadingProps {
  /** 是否显示加载动画 */
  active?: boolean;
  /** 加载提示文字，支持默认 slot 自定义 */
  text?: string;
  /** 弧线颜色，默认 #2b8cf0 */
  color?: string;
  /** 旋转图标大小，默认 24（数字为 px，也支持 '48rpx' 等字符串） */
  size?: number | string;
}
