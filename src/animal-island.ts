// 演示工程统一导入入口（对应原 demo 的 `from '../../src'`）
// 仅再导出「类型与常量」供显式引用（如 TabItem / ICON_LIST / TableColumn）；
// 组件本身一律走 easycom 自动引入，不在此处再导出（避免死代码与重复路径）。

export type { ButtonType, ButtonSize, ButtonHTMLType } from './uni_modules/animal-island/components/ai-button/types';
export type { TitleColor, TitleSize } from './uni_modules/animal-island/components/ai-title/types';
export type { CardColor, CardType, CardPattern } from './uni_modules/animal-island/components/ai-card/types';
export type { SelectOption } from './uni_modules/animal-island/components/ai-select/types';
export type { CheckboxOption, CheckboxSize } from './uni_modules/animal-island/components/ai-checkbox/types';
export type { RadioOption, RadioSize } from './uni_modules/animal-island/components/ai-radio/types';
export type { TabItem } from './uni_modules/animal-island/components/ai-tabs/types';
export type { IconName } from './uni_modules/animal-island/components/ai-icon/types';
export { ICON_LIST } from './uni_modules/animal-island/components/ai-icon/types';
export type {
  TooltipPlacement,
  TooltipVariant,
  TooltipTrigger,
} from './uni_modules/animal-island/components/ai-tooltip/types';
export type { TableColumn, TableRecord } from './uni_modules/animal-island/components/ai-table/types';
export type { FooterType } from './uni_modules/animal-island/components/ai-footer/types';
