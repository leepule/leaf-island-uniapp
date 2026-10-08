export interface ActionSheetAction {
  text: string;
  description?: string;
  value?: unknown;
  disabled?: boolean;
  danger?: boolean;
}

export interface ActionSheetProps {
  open?: boolean;
  actions: ActionSheetAction[];
  title?: string;
  cancelText?: string;
  maskClosable?: boolean;
}
