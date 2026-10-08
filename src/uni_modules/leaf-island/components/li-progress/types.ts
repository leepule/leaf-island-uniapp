export type ProgressStatus = 'normal' | 'success' | 'exception';

export interface ProgressProps {
  percent?: number;
  status?: ProgressStatus;
  showInfo?: boolean;
  strokeColor?: string;
  indeterminate?: boolean;
}
