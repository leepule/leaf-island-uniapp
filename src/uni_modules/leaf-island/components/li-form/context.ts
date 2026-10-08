import type { ComputedRef, InjectionKey } from 'vue';

export interface FormRule {
  required?: boolean;
  message?: string;
  validator?: (value: unknown, model: Record<string, unknown>) => true | false | string;
}

export interface FormContext {
  model: ComputedRef<Record<string, unknown>>;
  rules: ComputedRef<Record<string, FormRule | FormRule[]>>;
  errors: Record<string, string>;
  validateField: (name: string) => string;
  clearField: (name: string) => void;
}

export const FormContextKey: InjectionKey<FormContext> = Symbol('LeafIslandForm');
