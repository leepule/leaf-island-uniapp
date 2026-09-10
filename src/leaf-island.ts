// 演示工程统一导入入口（对应原 demo 的 `from '../../src'`）
// 仅再导出「类型与常量」供显式引用（如 TabItem / ICON_LIST / TableColumn）；
// 组件本身一律走 easycom 自动引入，不在此处再导出（避免死代码与重复路径）。

export type { ButtonType, ButtonSize, ButtonHTMLType } from './uni_modules/leaf-island/components/li-button/types';
export type { TitleColor, TitleSize } from './uni_modules/leaf-island/components/li-title/types';
export type { CardColor, CardType, CardPattern } from './uni_modules/leaf-island/components/li-card/types';
export type { SelectOption } from './uni_modules/leaf-island/components/li-select/types';
export type { CheckboxOption, CheckboxSize } from './uni_modules/leaf-island/components/li-checkbox/types';
export type { RadioOption, RadioSize } from './uni_modules/leaf-island/components/li-radio/types';
export type { TabItem } from './uni_modules/leaf-island/components/li-tabs/types';
export type { IconName } from './uni_modules/leaf-island/components/li-icon/types';
export { ICON_LIST, ICON_NAMES } from './uni_modules/leaf-island/components/li-icon/icon-catalog';
export type {
  TooltipPlacement,
  TooltipVariant,
  TooltipTrigger,
} from './uni_modules/leaf-island/components/li-tooltip/types';
export type { TableColumn, TableRecord } from './uni_modules/leaf-island/components/li-table/types';
export type { FooterType } from './uni_modules/leaf-island/components/li-footer/types';
