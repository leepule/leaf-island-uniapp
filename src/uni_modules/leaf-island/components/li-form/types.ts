import type { FormRule } from './context';

export type FormModel = Record<string, unknown>;
export type FormRules = Record<string, FormRule | FormRule[]>;
export type FormLayout = 'vertical' | 'horizontal';

export interface FormProps {
  model: FormModel;
  rules?: FormRules;
  layout?: FormLayout;
}
