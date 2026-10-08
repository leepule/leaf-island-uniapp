export type StepsDirection = 'horizontal' | 'vertical';
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  title: string;
  description?: string;
  status?: StepStatus;
}

export interface StepsProps {
  steps: StepItem[];
  current?: number;
  direction?: StepsDirection;
  status?: 'process' | 'error';
}
