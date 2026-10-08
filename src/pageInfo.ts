export interface PageInfo {
  title: string;
  tag: string;
  desc: string;
}

export const PAGE_INFO: Record<string, PageInfo> = {
  button: {
    title: 'Button 按钮',
    tag: '6 types',
    desc: '按钮组件 — 支持 primary / default / dashed / text / link 类型，danger / ghost / loading / disabled 状态，icon 图标，block 块级，三种尺寸。',
  },
  title: {
    title: 'Title 标题',
    tag: 'ribbon',
    desc: '装饰性标题组件 — ribbon 飘带风格，三种尺寸，13 种配色，适用于游戏化页面、活动 Banner 与场景分组。',
  },
  input: {
    title: 'Input 输入框',
    tag: '3 sizes',
    desc: '输入框组件 — 支持三种尺寸、clearable 清除、prefix / suffix 插槽、error / warning 校验状态、disabled 禁用。',
  },
  search: {
    title: 'Search 搜索框',
    tag: 'history',
    desc: '搜索输入组件 — 支持清除、按钮/键盘提交、受控关键词和可自定义的历史关键词插槽。',
  },
  steps: {
    title: 'Steps 步骤条',
    tag: 'workflow',
    desc: '流程步骤组件 — 支持横向/纵向排列、当前与完成状态，并可标记步骤错误。',
  },
  'action-sheet': {
    title: 'ActionSheet 操作菜单',
    tag: 'mobile',
    desc: '移动端底部操作菜单 — 支持取消、遮罩关闭、禁用操作项和危险操作样式。',
  },
  cascader: {
    title: 'Cascader 级联选择器',
    tag: 'multi-level',
    desc: '多级联动选择组件 — 支持树形选项、禁用节点、受控路径和清除。',
  },
  switch: {
    title: 'Switch 开关',
    tag: '2 sizes',
    desc: '开关组件 — 支持受控 / 非受控、自定义文案、small 尺寸、loading 状态。',
  },
  card: {
    title: 'Card 卡片',
    tag: 'colors',
    desc: '卡片容器组件 — 支持 default / dashed 两种类型，13 种背景颜色与花纹。',
  },
  collapse: { title: 'Collapse 折叠面板', tag: 'FAQ', desc: '折叠面板组件 — 支持展开/收起、默认展开、禁用状态。' },
  cursor: {
    title: 'Cursor 光标',
    tag: 'h5-only',
    desc: '光标组件 — 自定义手指光标，支持自定义尺寸、点击动画。仅 H5 生效，小程序 / App 自动不影响布局。',
  },
  modal: {
    title: 'Modal 弹窗',
    tag: 'dialog',
    desc: '模态弹窗组件 — SVG 有机形状裁切、支持标题、关闭按钮、自定义 Footer、ESC / 遮罩关闭（全平台）。',
  },
  typewriter: {
    title: 'Typewriter 打字机',
    tag: 'effect',
    desc: '打字机组件 — 按字符逐个显示文本，支持多行与富内容，不改变原有样式。',
  },
  divider: { title: 'Divider 分割线', tag: '9 types', desc: '分割线组件 — 实线 / 波浪 / 虚线，多配色装饰性分割。' },
  icon: {
    title: 'Icon 图标',
    tag: '10 icons',
    desc: '图标组件 — 全量 Lucide 图标，支持自定义尺寸、颜色与弹跳动画。',
  },
  select: {
    title: 'Select 选择器',
    tag: 'dropdown',
    desc: '下拉选择器组件 — 支持自定义选项列表，高亮当前选中项；全平台用 absolute + 遮罩关闭。',
  },
  checkbox: {
    title: 'Checkbox 多选框',
    tag: 'group',
    desc: '多选框组件 — 支持受控/非受控、水平/垂直排列、三种尺寸、禁用单项或全部禁用。',
  },
  radio: {
    title: 'Radio 单选框',
    tag: 'group',
    desc: '单选框组件 — 支持受控/非受控、水平/垂直排列、三种尺寸、禁用单项或全部禁用。',
  },
  tooltip: {
    title: 'Tooltip 气泡提示',
    tag: '12 dirs',
    desc: '气泡提示组件 — 支持 12 个方向、hover/click/focus 三种触发，default/island 两种风格，bordered 边框可配置。',
  },
  tabs: { title: 'Tabs 标签页', tag: 'animated', desc: '标签页组件 — 支持受控/非受控、动画切换、叶子装饰。' },
  footer: { title: 'Footer 底部装饰', tag: 'decor', desc: '页面底部装饰图片，支持树和海两种类型。' },
  codeblock: {
    title: 'CodeBlock 代码高亮',
    tag: 'syntax',
    desc: '代码高亮组件 — 语法高亮显示，支持自定义样式和类名。',
  },
  loading: {
    title: 'Loading 加载',
    tag: 'island',
    desc: '自然风小岛 Loading 动画组件；纯 CSS 旋转 + opacity/scale 显隐，全平台一致。',
  },
  table: { title: 'Table 表格', tag: 'data', desc: '表格组件 — 支持本地排序、筛选、固定列、横向滚动、加载态与空态。' },
  time: { title: 'Time 时间', tag: 'hud', desc: '经典 HUD 风格的时间显示组件，实时更新时间。' },
  toast: { title: 'Toast 轻提示', tag: 'feedback', desc: '展示自动消失的成功、失败、警告或普通操作反馈，附交互示例和完整 API。' },
  notification: { title: 'Notification 通知', tag: 'feedback', desc: '展示持续可见、可关闭的页面通知，附状态示例和完整 API。' },
  form: { title: 'Form 表单', tag: 'validation', desc: '基于表单模型和规则的字段校验、错误提示与提交示例。' },
  'form-item': { title: 'FormItem 表单项', tag: 'form', desc: '演示字段标签、必填标记、输入控件和错误提示布局。' },
  empty: { title: 'Empty 空状态', tag: 'display', desc: '展示空列表和无搜索结果页面状态，支持自定义操作插槽。' },
  progress: { title: 'Progress 进度条', tag: 'feedback', desc: '展示任务进度、成功失败状态和不确定进度，支持交互调整。' },
  drawer: { title: 'Drawer 抽屉', tag: 'overlay', desc: '展示右侧和底部操作面板、标题、内容和底部操作插槽。' },
  popover: { title: 'Popover 气泡菜单', tag: 'overlay', desc: '展示点击触发的浮层菜单和方向设置，附使用方式与 API。' },
  badge: { title: 'Badge 角标', tag: 'display', desc: '展示数字角标、最大值和圆点状态标记。' },
  tag: { title: 'Tag 标签', tag: 'status / filter', desc: '展示语义状态标签，支持多色、可关闭及可选中筛选标签。' },
  rate: { title: 'Rate 评分', tag: 'rating', desc: '支持整星/半星评分、清除、键盘操作以及只读展示。' },
  avatar: { title: 'Avatar 头像', tag: 'display', desc: '展示圆形、方形、不同尺寸和姓名回退头像。' },
  skeleton: { title: 'Skeleton 骨架屏', tag: 'loading', desc: '切换加载占位与真实内容，展示头像和多行骨架。' },
  pagination: { title: 'Pagination 分页', tag: 'data', desc: '交互切换当前页并查看分页器 API。' },
  'date-picker': { title: 'DatePicker 日期选择', tag: 'picker', desc: '展示日期范围、年份粒度和 v-model 选择结果。' },
  upload: { title: 'Upload 图片上传', tag: 'media', desc: '展示本地图片选择、文件列表绑定和可选上传说明。' },
  image: { title: 'Image 图片', tag: 'media', desc: '展示图片尺寸、裁剪、懒加载、加载与错误占位，并支持点击预览。' },
  navbar: { title: 'Navbar 导航栏', tag: 'top navigation', desc: '页面顶部导航，支持返回入口、标题、左右插槽、固定定位和安全区适配。' },
  tabbar: { title: 'Tabbar 标签栏', tag: 'app navigation', desc: '移动端底部一级导航，支持图标、角标、禁用状态、安全区和受控选中项。' },
  breadcrumb: { title: 'Breadcrumb 面包屑', tag: 'hierarchy', desc: '展示页面层级路径，支持自定义分隔符、插槽和上级点击事件。' },
  backtop: { title: 'Backtop 返回顶部', tag: 'scroll', desc: '页面滚动后显示快捷回顶入口，H5 自动监听，小程序接收页面滚动值。' },
};

/** 组件导航分组。每组按英文组件名首字母排序，侧栏和首页共用此顺序。 */
export const PAGE_GROUPS = [
  {
    title: '基础组件',
    keys: ['button', 'card', 'divider', 'icon', 'title'],
  },
  {
    title: '表单组件',
    keys: ['cascader', 'checkbox', 'date-picker', 'form', 'form-item', 'input', 'radio', 'rate', 'search', 'select', 'switch', 'upload'],
  },
  {
    title: '数据展示',
    keys: ['avatar', 'badge', 'empty', 'image', 'pagination', 'progress', 'skeleton', 'table', 'tag', 'time'],
  },
  {
    title: '导航组件',
    keys: ['action-sheet', 'backtop', 'breadcrumb', 'collapse', 'drawer', 'navbar', 'popover', 'steps', 'tabbar', 'tabs'],
  },
  {
    title: '反馈提示',
    keys: ['loading', 'modal', 'notification', 'toast', 'tooltip'],
  },
  {
    title: '视觉效果',
    keys: ['codeblock', 'cursor', 'footer', 'typewriter'],
  },
] as const;
