export interface PageInfo {
    title: string;
    tag: string;
    desc: string;
}

export const PAGE_INFO: Record<string, PageInfo> = {
    button: { title: 'Button 按钮', tag: '6 types', desc: '按钮组件 — 支持 primary / default / dashed / text / link 类型，danger / ghost / loading / disabled 状态，icon 图标，block 块级，三种尺寸。' },
    title: { title: 'Title 标题', tag: 'ribbon', desc: '装饰性标题组件 — ribbon 飘带风格，三种尺寸，13 种配色，适用于游戏化页面、活动 Banner 与场景分组。' },
    input: { title: 'Input 输入框', tag: '3 sizes', desc: '输入框组件 — 支持三种尺寸、clearable 清除、prefix / suffix 前后缀、error / warning 校验状态、disabled 禁用。' },
    switch: { title: 'Switch 开关', tag: '2 sizes', desc: '开关组件 — 支持受控 / 非受控、自定义文案、small 尺寸、loading 状态。' },
    card: { title: 'Card 卡片', tag: 'colors', desc: '卡片容器组件 — 支持 default / dashed 两种类型，13 种背景颜色与花纹。' },
    collapse: { title: 'Collapse 折叠面板', tag: 'FAQ', desc: '折叠面板组件 — 支持展开/收起、默认展开、禁用状态。' },
    cursor: { title: 'Cursor 光标', tag: 'h5-only', desc: '光标组件 — 自定义手指光标，支持自定义尺寸、点击动画。仅 H5 生效，小程序 / App 自动不影响布局。' },
    modal: { title: 'Modal 弹窗', tag: 'dialog', desc: '模态弹窗组件 — SVG 有机形状裁切、支持标题、关闭按钮、自定义 Footer、ESC / 遮罩关闭（全平台）。' },
    typewriter: { title: 'Typewriter 打字机', tag: 'effect', desc: '打字机组件 — 按字符逐个显示文本，支持多行与富内容，不改变原有样式。' },
    divider: { title: 'Divider 分割线', tag: '9 types', desc: '分割线组件 — 实线 / 波浪 / 虚线，多配色装饰性分割。' },
    icon: { title: 'Icon 图标', tag: '10 icons', desc: '图标组件 — 动森风格图标集，包含 10 个可爱图标，支持自定义尺寸与弹跳动画。' },
    select: { title: 'Select 选择器', tag: 'dropdown', desc: '下拉选择器组件 — 支持自定义选项列表，高亮当前选中项；全平台用 absolute + 遮罩关闭。' },
    checkbox: { title: 'Checkbox 多选框', tag: 'group', desc: '多选框组件 — 支持受控/非受控、水平/垂直排列、三种尺寸、禁用单项或全部禁用。' },
    radio: { title: 'Radio 单选框', tag: 'group', desc: '单选框组件 — 支持受控/非受控、水平/垂直排列、三种尺寸、禁用单项或全部禁用。' },
    tooltip: { title: 'Tooltip 气泡提示', tag: '12 dirs', desc: '气泡提示组件 — 支持 12 个方向、hover/click/focus 三种触发，default/island 两种风格，bordered 边框可配置。' },
    tabs: { title: 'Tabs 标签页', tag: 'animated', desc: '标签页组件 — 支持受控/非受控、动画切换、叶子装饰。' },
    footer: { title: 'Footer 底部装饰', tag: 'decor', desc: '页面底部装饰图片，支持树和海两种类型。' },
    codeblock: { title: 'CodeBlock 代码高亮', tag: 'syntax', desc: '代码高亮组件 — 语法高亮显示，支持自定义样式和类名。' },
    loading: { title: 'Loading 加载', tag: 'island', desc: '动森风格小岛 Loading 动画组件；H5=GSAP 动画，非 H5 降级 opacity+scale。' },
    table: { title: 'Table 表格', tag: 'data', desc: '表格组件 — 支持泛型、列定义、悬浮动画、加载、空态。' },
    time: { title: 'Time 时间', tag: 'hud', desc: '经典 HUD 风格的时间显示组件，实时更新时间。' },
    phone: { title: 'Phone 手机', tag: 'ui', desc: '动森风格手机界面，包含对话框和背包功能。' },
};
