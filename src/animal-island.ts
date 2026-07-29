// 演示工程统一导入入口（对应原 demo 的 `from '../../src'`）
// 实际指向 uni_modules/animal-island 包，便于 easycom 之外显式引用。
export { default as AiButton } from '../uni_modules/animal-island/components/ai-button/ai-button.vue';
export { default as AiTitle } from '../uni_modules/animal-island/components/ai-title/ai-title.vue';
export { default as AiInput } from '../uni_modules/animal-island/components/ai-input/ai-input.vue';
export { default as AiSwitch } from '../uni_modules/animal-island/components/ai-switch/ai-switch.vue';
export { default as AiCard } from '../uni_modules/animal-island/components/ai-card/ai-card.vue';
export { default as AiCollapse } from '../uni_modules/animal-island/components/ai-collapse/ai-collapse.vue';
export { default as AiCursor } from '../uni_modules/animal-island/components/ai-cursor/ai-cursor.vue';
export { default as AiModal } from '../uni_modules/animal-island/components/ai-modal/ai-modal.vue';
export { default as AiTypewriter } from '../uni_modules/animal-island/components/ai-typewriter/ai-typewriter.vue';
export { default as AiDivider } from '../uni_modules/animal-island/components/ai-divider/ai-divider.vue';
export { default as AiIcon } from '../uni_modules/animal-island/components/ai-icon/ai-icon.vue';
export { default as AiSelect } from '../uni_modules/animal-island/components/ai-select/ai-select.vue';
export { default as AiCheckbox } from '../uni_modules/animal-island/components/ai-checkbox/ai-checkbox.vue';
export { default as AiRadio } from '../uni_modules/animal-island/components/ai-radio/ai-radio.vue';
export { default as AiTooltip } from '../uni_modules/animal-island/components/ai-tooltip/ai-tooltip.vue';
export { default as AiTabs } from '../uni_modules/animal-island/components/ai-tabs/ai-tabs.vue';
export { default as AiFooter } from '../uni_modules/animal-island/components/ai-footer/ai-footer.vue';
export { default as AiCodeBlock } from '../uni_modules/animal-island/components/ai-code-block/ai-code-block.vue';
export { default as AiLoading } from '../uni_modules/animal-island/components/ai-loading/ai-loading.vue';
export { default as AiTable } from '../uni_modules/animal-island/components/ai-table/ai-table.vue';
export { default as AiTime } from '../uni_modules/animal-island/components/ai-time/ai-time.vue';
export { default as AiPhone } from '../uni_modules/animal-island/components/ai-phone/ai-phone.vue';

export type { ButtonType, ButtonSize, ButtonHTMLType } from '../uni_modules/animal-island/components/ai-button/types';
export type { TitleColor, TitleSize } from '../uni_modules/animal-island/components/ai-title/types';
export type { CardColor, CardType, CardPattern } from '../uni_modules/animal-island/components/ai-card/types';
export type { SelectOption } from '../uni_modules/animal-island/components/ai-select/types';
export type { CheckboxOption, CheckboxSize } from '../uni_modules/animal-island/components/ai-checkbox/types';
export type { RadioOption, RadioSize } from '../uni_modules/animal-island/components/ai-radio/types';
export type { TabItem } from '../uni_modules/animal-island/components/ai-tabs/types';
export type { IconName } from '../uni_modules/animal-island/components/ai-icon/types';
export { ICON_LIST } from '../uni_modules/animal-island/components/ai-icon/types';
export type { TooltipPlacement, TooltipVariant, TooltipTrigger } from '../uni_modules/animal-island/components/ai-tooltip/types';
export type { TableColumn, TableRecord } from '../uni_modules/animal-island/components/ai-table/types';
export type { FooterType } from '../uni_modules/animal-island/components/ai-footer/types';
