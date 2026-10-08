export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationProps {
  open?: boolean;
  type?: NotificationType;
  title?: string;
  description?: string;
  closable?: boolean;
}
