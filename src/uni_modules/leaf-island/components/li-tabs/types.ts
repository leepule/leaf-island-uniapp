export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  /** 受控激活标签；未传时组件维护内部状态 */
  modelValue?: string;
  /** 非受控模式的初始激活标签 */
  defaultActiveKey?: string;
  leafAnimation?: boolean;
  shadow?: boolean;
}
