export interface CollapseProps {
  question?: string;
  answer?: string;
  /** 非受控模式的初始展开状态 */
  defaultExpanded?: boolean;
  /** 受控展开状态；未传时组件维护内部状态 */
  expanded?: boolean;
  disabled?: boolean;
}
