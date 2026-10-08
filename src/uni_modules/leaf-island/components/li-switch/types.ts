/** `default` remains as a deprecated alias for `middle`. */
export type SwitchSize = 'small' | 'middle' | 'default';

export interface SwitchProps {
  /** 受控开关状态；未传时组件维护内部状态 */
  modelValue?: boolean;
  /** 非受控模式的初始状态 */
  defaultChecked?: boolean;
  /** Use `middle` for new code; `default` is retained for compatibility. */
  size?: SwitchSize;
  disabled?: boolean;
  loading?: boolean;
}
