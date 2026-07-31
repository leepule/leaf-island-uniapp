export interface CursorProps {
  /**
   * 是否让容器内的常见交互控件继承自定义光标。默认 `true`。
   * - `true`：容器与常见交互控件使用自定义光标，显式业务样式仍可覆盖
   * - `false`：仅容器自身设置自定义光标，交互元素保留 `pointer`、文本输入保留 `text`、禁用态保留 `not-allowed`
   */
  forceAll?: boolean;
}
