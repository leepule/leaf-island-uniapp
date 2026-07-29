# animal-island-vue → uni-app 组件改造指南（给转换子代理用）

目标：把 `src/components/<Name>/` 下的每个组件，改造为可在 uni-app（H5 / 小程序 / App）中使用的 `.vue` 文件，
放到 `uni_modules/animal-island/components/ai-<name>/ai-<name>.vue`。

## 0. 文件布局与命名
- 源：`src/components/<Name>/<Name>.vue`（及其 `types.ts`）
- 目标：`uni_modules/animal-island/components/ai-<name>/ai-<name>.vue`
  - `<Name>` 全部转成 kebab + `ai-` 前缀：Button→ai-button, Icon→ai-icon, Tabs→ai-tabs, ……
  - **无需移植的组件：WeddingInvitation / WeddingInvitationExportButton**（强 Web 导出场景，本次迁移不在范围内，忽略即可）。
- 如果该组件有 `types.ts`，也复制到 `uni_modules/animal-island/components/ai-<name>/types.ts`（内容原样，因为 uni-app 仍支持 TS）。
- 组件内**不要**依赖 easycom 自动导入其它库组件；需要用到兄弟组件时，用相对路径显式 import：
  - 例：在 ai-modal 中需要 ai-button → `import Button from '../ai-button/ai-button.vue';`
  - ai-icon → `'../ai-icon/ai-icon.vue'`，ai-typewriter → `'../ai-typewriter/ai-typewriter.vue'`，ai-cursor → `'../ai-cursor/ai-cursor.vue'`

## 1. 路径规则（最重要）
- 把所有 `@/styles/variables.less` 改为 `@import '../../styles/variables.less';`
  （因为目标文件在 `components/ai-x/ai-x.vue`，向上两级到包根，再进 styles/）
- 组件里引用 assets 的相对路径**原样保留**（原始就是 `../../assets/...`，层级一致）：
  - 例如 `url('../../assets/img/icons/icon-miles.svg')` 保持不变。
  - 但原始里若有 `@/assets/...` 这种写法（如 Phone 用了 `@/assets/img/animalisland_1440_2560.JPG`），
    要改成 `../../assets/img/animalisland_1440_2560.JPG`。
- 不要使用 `@` 别名，uni-app 在库里解析不到。

## 2. 模板（template）规则
- **禁止 `<Teleport>`**：uni-app 小程序不支持。直接写普通节点（用 `position: fixed` 即可覆盖全屏，uni-app 支持）。
- **禁止 `v-html`**：uni-app 小程序不支持。若原组件用 `v-html` 注入 SVG/HTML（如 Loading），把那段 HTML/SVG **原样写进 template**（不要字符串化）。
- **禁止 HTML 表格标签（`<table>/<thead>/<tbody>/<tr>/<th>/<td>/<caption>`）**：uni-app 小程序不支持（非原生组件，编译期不转换，会直接编译失败或渲染异常）。一律用 `view + flex` 模拟——表格容器 `display:flex; flex-direction:column`；每一行 `display:flex`；单元格用 `flex: 1 1 0%`（自适应列）或 `flex: 0 0 auto` + `width`（固定列宽），保证表头与表体列对齐。参考 `ai-table` 的 `cellStyle()` 实现。
- 事件：`@click` 在 uni-app 各端都可用（小程序映射为 tap）。`@mouseenter`/`@mouseleave` 在小程序不会触发，可保留（PC/H5 生效），但不要用它们做关键交互；hover 视觉效果尽量用 CSS `:hover` 或 `:active` 表达。`@keydown` 仅 H5 有意义。
- `<style>` 中 `:deep()` 在 uni-app 可用（vue3）。`scoped` 保留。
- 不要用 `document`/`window`/`navigator`/`localStorage`/`getComputedStyle`/`MutationObserver`/`IntersectionObserver`/`requestAnimationFrame`（见第 3 条）。
- SVG 内联写法不变。SVG 中 `url(#id)` 引用同文件内的 `<defs>` 片段是正常的，可保留。

## 3. 脚本（script）规则：浏览器 API 处理
uni-app 在**小程序**没有 DOM。需按以下方式处理浏览器 API：
- `typeof document !== 'undefined'` 包裹：任何直接访问 `document.xxx` 的代码都要先判断；或者在**函数内部**用 `if (typeof document === 'undefined') return;` 提前返回。
- `window.innerWidth / window.innerHeight / getBoundingClientRect` 等：小程序没有。需要“视口定位/测量”的逻辑（如 Select 的下拉定位），
  改成**不依赖视口**的布局：下拉用 `position: absolute` 相对 trigger 容器定位（默认显示在下方即可），不要用 `getBoundingClientRect` 计算。
- `document.addEventListener('mousedown'/'keydown')` 做“点击外部关闭/ESC 关闭”：
  - 小程序端用**透明遮罩层**方式实现点击外部关闭（在弹层外放一个全屏透明 `<view @click="close">`）。
  - ESC 用 `#ifdef H5` 包起来（仅 H5 注册 keydown）。
- `requestAnimationFrame`：小程序没有，用 `setTimeout(fn, 0)` 或 `nextTick` 替代，或直接去掉（用 CSS 过渡）。
- **GSAP / modern-screenshot / @fontsource 等 DOM 依赖库一律不要 import**。这些只在 H5 用：
  - 用 uni-app 条件编译注释 `#ifdef H5` … `#endif` 包裹仅 H5 的代码块（导入与调用）。
  - 非 H5 端提供纯 CSS 兜底动画（如旋转/淡入）。
- 注意：`#ifdef H5` 是**编译期**注释，必须写成：
  ```
  // #ifdef H5
  import { gsap } from './island/gsap.min.js';
  // #endif
  ```
  这种注释对原 web 构建无害（web 构建会忽略它们）。

## 4. 字体
- 不要 import `@fontsource/*`（uni-app 不支持）。字体由全局样式 `--animal-font-family` 控制，默认系统字体即可。
- 若组件脚本里有通过 `document` 注入 @font-face 的逻辑（如原 `WeddingInvitation/fonts.ts` 的 `injectWeddingFonts()`），需用 `typeof document !== 'undefined'` 包裹，或在 `#ifdef H5` 内执行。该组件本次不移植，此处仅作通用提醒。

## 5. 样式（style）规则
- `@import '../../styles/variables.less';` 放在 `<style lang="less" scoped>` 第一行（原来有 `@/styles/...` 的直接替换）。
- 保留所有 less 嵌套与变量；uni-app 支持 less（需在 consumer 项目装 less，或本包已编译——本包是源码分发，consumer 需支持 less；HBuilderX / cli 默认支持）。
- 避免小程序不支持的 CSS：
  - 不用 `@property`（小程序不支持），直接普通 CSS 变量。
  - `mask-image` / `-webkit-mask-image` 在小程序支持有限；若原组件用 mask 做动画（Loading），改为在 **H5 用 mask，非 H5 用普通透明度/缩放过渡兜底**（用条件类名或 `#ifdef H5` 控制 class）。
  - `cursor: url(...)`（Cursor 组件）保留即可，小程序忽略该属性，无副作用。
  - `position: fixed` 可用；`position: sticky` 小程序部分支持，尽量避免。
  - `filter`、`backdrop-filter` 小程序支持有限，保留但注明。
  - `100vw`/`100vh`：小程序里可用 `100%` 或改用 uni-app 的 `100vh`（H5/App 用 `100vh`，小程序用 `100%` 更稳）。建议用 `100%` + 父容器定高，或直接保留 `100vw/vh`（H5/App 正常，小程序可能偏差，注明即可）。
- 保留 `@keyframes` 动画（小程序支持）。

## 6. 组件 API 兼容
- 保持 `defineProps` / `defineEmits` / `defineSlots` 的 TS 写法不变（uni-app 支持 `<script setup lang="ts">`）。
- `defineEmits` 里事件类型如 `event: MouseEvent`、`event: Event` 保留不报错（仅 TS 类型）。
- `withDefaults(defineProps<...>(), {...})` 保留。
- 不需要 `export default` / `name` 选项，但可加 `defineOptions({ name: 'AiXxx' })` 便于调试（可选，不强制）。

## 7. 自检清单（每个组件完成后对照）
- [ ] 文件位于 `components/ai-<name>/ai-<name>.vue`
- [ ] 没有 `@/` 别名（全局搜 `@/` 应为 0）
- [ ] 没有 `import ... from 'modern-screenshot'` / `gsap` / `@fontsource`（除非在 `#ifdef H5` 内）
- [ ] 没有 `<Teleport>`、没有 `v-html`
- [ ] 没有 HTML 表格标签（`<table>/<tr>/<td>/<th>/<thead>/<tbody>`），全部使用 `view + flex` 模拟
- [ ] 没有裸 `document.` / `window.`（除非在 `typeof document !== 'undefined'` 或 `#ifdef H5` 保护内）
- [ ] `../styles/variables.less` 用相对路径
- [ ] 交互（下拉/弹层/关闭）不依赖 `getBoundingClientRect` 视口测量
- [ ] 兄弟组件用相对路径 import（如 `'../ai-icon/ai-icon.vue'`）

## 8. 组件 → 目标名 映射表
Button→ai-button, Icon→ai-icon, Divider→ai-divider, Cursor→ai-cursor, Loading→ai-loading,
Title→ai-title, Input→ai-input, Switch→ai-switch, Checkbox→ai-checkbox, Radio→ai-radio,
Tooltip→ai-tooltip, Select→ai-select, Tabs→ai-tabs, Card→ai-card, Collapse→ai-collapse,
Modal→ai-modal, Footer→ai-footer, Time→ai-time, Typewriter→ai-typewriter, CodeBlock→ai-code-block,
Table→ai-table, Phone→ai-phone。

## 8. 主代理亲自处理的强 Web 组件
- `Loading`（GSAP / v-html → 内联 SVG）、`Modal`（Teleport → fixed 根容器）由主代理亲自处理。
- `WeddingInvitation` / `WeddingInvitationExportButton` **不在本次移植范围**，子代理无需处理。
