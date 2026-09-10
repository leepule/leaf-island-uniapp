export type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'small' | 'middle' | 'large';
export type ButtonHTMLType = 'submit' | 'reset' | 'button';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  danger?: boolean;
  ghost?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: ButtonHTMLType;
  openType?: string;
  hoverClass?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;
  appParameter?: string;
  sendMessageTitle?: string;
  sendMessagePath?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
}

export function resolveFormType(htmlType: ButtonHTMLType): 'submit' | 'reset' | undefined {
  return htmlType === 'button' ? undefined : htmlType;
}
