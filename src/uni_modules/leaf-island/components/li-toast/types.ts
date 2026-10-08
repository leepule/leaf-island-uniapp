export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'center' | 'bottom';

export interface ToastProps {
  show?: boolean;
  message?: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}
