# Leaf Island UI（uni-app 版）

一款专为 UniApp 打造的自然治愈系 / 卡通风格轻量组件库。目前声明支持 H5 / Web 和微信小程序；其他平台尚未纳入支持范围。

> **免责声明**：本项目所有组件及素材均为原创或采用合法开源协议，与任何商业游戏作品无关。

> 组件前缀统一为 `li-`（如 `Button` → `li-button`）。

---

## ✨ 平台支持

| 平台        | 支持情况 | 说明 |
| ----------- | -------- | ---- |
| H5 / Web | 支持 | `li-cursor` 等 Web 能力可用 |
| 微信小程序 | 支持 | Web 专属能力会降级或隐藏 |
| 支付宝 / 百度 / 抖音 / QQ / 快手小程序 | 未验证 | 当前包元数据未声明支持 |
| App（iOS / Android） | 未验证 | 当前包元数据未声明支持 |

平台支持范围以 `package.json` 中的 `uni_modules.platforms` 声明为准。其他平台需完成编译和运行验证后再加入支持列表。

---

## 📦 安装

### npm 安装

在 uni-app CLI 项目中安装：

```sh
npm install leaf-island-uniapp
```

然后在 `pages.json` 中配置 Easycom 路径：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^li-(.*)": "leaf-island-uniapp/components/li-$1/li-$1.vue"
    }
  }
}
```

本包将 `vue`、`@lucide/vue` 和 `lucide-static` 声明为 peer dependencies，请确保宿主项目使用 Vue 3，并安装图标依赖：

```sh
npm install @lucide/vue lucide-static
```

### uni_modules 安装

也可以把整个 `leaf-island` 目录放进 uni-app 项目根目录的 `uni_modules/` 下：

```
your-uni-app-project/
├── uni_modules/
│   └── leaf-island/        <-- 复制这里
│       ├── components/
│       ├── styles/
│       ├── assets/
│       ├── index.less
│       ├── package.json
│       └── readme.md
├── pages.json
├── App.vue
└── main.js
```

放入后 **无需额外配置** 即可使用 `li-` 开头的任意组件（已内置 `easycom` 规则）。

> 若你把自己的项目 `easycom` 配置成 `autoscan: true`，也能自动识别；本包在 `package.json` 中已声明 `easycom.custom` 规则，放进 `uni_modules` 即生效。

图标组件依赖 Lucide 官方包：H5 端使用 `@lucide/vue` 渲染组件，小程序端通过 `lucide-static` 的 `?raw` SVG 字符串生成 data URI 后交给 `image` 渲染。请一并安装：

```sh
npm install @lucide/vue lucide-static
```

`li-icon` 支持当前 `lucide-static` 版本的全部图标；小程序端为支持运行时任意图标名，会将全量 SVG 字符串编入包内。若后续对包体要求极高，可改回显式图标映射。

---

## 🎨 全局样式

组件样式使用 Less 设计 token 与 CSS 自定义属性。全局样式需在 `App.vue` 中引入一次：

```vue
<!-- App.vue -->
<style lang="less">
@import 'leaf-island-uniapp/index.less';
</style>
```

如果通过 `uni_modules` 目录安装，则使用 `@import '@/uni_modules/leaf-island/index.less';`。

- `:root` 与小程序 `page` 根节点会注入默认浅色 CSS 变量。
- **运行时切换**：用 `<li-theme-provider :theme="theme">...</li-theme-provider>` 包裹内容，并把 `theme` 设为 `light` 或 `dark`。主题值可绑定 Vue 响应式状态；容器内的组件会继承对应主题色。
- **自定义主题**：可在容器或其祖先覆盖 `--animal-*` CSS 变量。Less token 和组件色值映射见 `styles/variables.less` 与 `styles/themes/`。
- **字体**：默认使用系统字体。如需自定义字体，用 `uni.loadFontFace` 注入后覆盖变量 `--animal-font-family`。完整示例见仓库 `docs/theming-and-bundle.md`。

---

## 🧩 组件清单（47 个）

| 分类 | 组件 | 说明 | 强 Web 特性降级说明 |
| ---- | ---- | ---- | ---- |
| 基础组件 | `li-button` | 按钮 | — |
|  | `li-card` | 卡片 | — |
|  | `li-divider` | 分割线 | — |
|  | `li-icon` | 全量 Lucide 图标（H5 使用 `@lucide/vue`，小程序用 `lucide-static` SVG 生成 data URI） | — |
|  | `li-title` | 标题 | — |
|  | `li-theme-provider` | 浅色/暗色主题容器，支持运行时切换 | 通过 CSS 自定义属性继承主题色 |
| 表单组件 | `li-cascader` | 树形多级选择，支持路径绑定、清除和禁用节点 | PC 下拉面板、移动端底部面板；flex + scroll-view 列，不测量 DOM |
|  | `li-checkbox` | 复选框 | — |
|  | `li-date-picker` | 单日期/范围选择，支持禁用日期及月历/周历 | PC 使用日历/年月选择弹层，移动端滚轮选择开始和结束日期 |
|  | `li-form` | 表单布局与同步规则校验 | 基于 Vue provide/inject 与 UniApp form 提交 |
|  | `li-form-item` | 表单项、标签和校验反馈 | 基于 Vue provide/inject 与 UniApp form 提交 |
|  | `li-input` | 输入框 | — |
|  | `li-radio` | 单选框 | — |
|  | `li-search` | 搜索输入、清除、提交和历史关键词插槽 | 使用 UniApp input 与原生搜索确认事件 |
|  | `li-select` | 下拉选择 | 移除 `getBoundingClientRect` 定位，改用 `position: absolute` + 全屏透明遮罩关闭 |
|  | `li-switch` | 开关 | — |
|  | `li-upload` | 图片选择、预览与可选上传 | 共享多图预览入口，支持切换和缩放；配置上传地址后展示实时进度，失败可重试，移除前二次确认 |
| 数据展示 | `li-avatar` | 图片或文字头像 | 使用 UniApp image，失败时回退 initials |
|  | `li-badge` | 数量/圆点角标 | 普通布局组件 |
|  | `li-empty` | 空数据状态 | 普通布局组件 |
|  | `li-image` | 图片展示 | 支持裁剪、懒加载、占位/错误状态及自定义图片组预览 |
|  | `li-pagination` | 简易分页 | 按页码触发 change，不处理数据切片 |
|  | `li-progress` | 进度展示 | CSS 动画 |
|  | `li-rate` | 整星/半星评分与只读展示 | 点击半星区域进行评分 |
|  | `li-skeleton` | 加载占位 | CSS 渐变动画 |
|  | `li-table` | 排序、筛选、固定列与横向滚动表格 | 固定列使用 sticky 定位；横向滚动通过 scroll.x 设置 |
|  | `li-tag` | 状态展示、筛选和可关闭标签 | 普通布局组件 |
|  | `li-time` | 时间 | — |
| 导航组件 | `li-action-sheet` | 移动端底部操作菜单，支持取消、禁用项和危险项 | 固定定位遮罩 + 安全区适配 |
|  | `li-navbar` | 顶部标题、返回入口及左右操作插槽 | 支持固定定位和顶部安全区 |
|  | `li-tabbar` | 底部一级页面导航、图标和角标 | 支持固定定位及底部安全区 |
|  | `li-breadcrumb` | 当前页面层级路径 | 由业务响应点击并执行路由跳转 |
|  | `li-backtop` | 页面滚动后快捷回顶 | H5 自动监听；小程序通过 scrollTop 属性接入 onPageScroll |
|  | `li-collapse` | 折叠面板 | — |
|  | `li-drawer` | 抽屉面板 | 固定视图遮罩 + scroll-view 内容区 |
|  | `li-popover` | 点击气泡 | H5 传送到 body 并限制在视口内；小程序使用组件内定位，需验证父容器裁切 |
|  | `li-steps` | 流程步骤条，支持横向/纵向和完成/错误状态 | CSS 布局 |
|  | `li-tabs` | 标签页 | — |
| 反馈提示 | `li-loading` | 岛屿加载动画 | 纯 CSS 旋转动画 + opacity/scale 显隐，全平台一致（含 `prefers-reduced-motion` 降级） |
|  | `li-modal` | 模态框 | 移除 `Teleport`，改用 `position: fixed` 根容器 + 透明遮罩关闭 |
|  | `li-notification` | 持续状态通知 | 普通布局组件 |
|  | `li-toast` | 自动关闭的轻提示 | 固定定位视图，不依赖原生 Toast API |
|  | `li-tooltip` | 文字提示 | — |
| 视觉效果 | `li-code-block` | 代码块 | — |
|  | `li-cursor` | 跟随光标 | **仅 H5** 生效；小程序 / App 自动隐藏，不影响布局 |
|  | `li-footer` | 页脚 | — |
|  | `li-typewriter` | 打字机 | — |

> 图标来源：[Lucide Icons](https://lucide.dev)，ISC License。

---

## 🚀 快速使用

```vue
<template>
  <view>
    <li-title>自然小岛</li-title>
    <li-divider />
    <li-button type="primary" @click="sayHi">上岛啦</li-button>
    <li-card title="今日天气">
      <li-typewriter text="晴，适合散步和观察自然～" />
    </li-card>
    <li-modal :open="showModal" title="欢迎" @close="showModal = false">
      <p>欢迎来到自然小岛！</p>
    </li-modal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LiModal from 'leaf-island-uniapp/components/li-modal/li-modal.vue';

const showModal = ref(false);
function sayHi() {
  showModal.value = true;
}
</script>
```

> 使用 npm 安装时，Easycom 路径指向 `node_modules` 中的包；若 IDE 提示找不到，可按上面的 npm 包路径显式导入。使用 `uni_modules` 安装时，路径改为 `@/uni_modules/leaf-island/...`。

---

## 🧱 目录结构

```
leaf-island/
├── components/        # 47 个组件，目录名 = 组件名（li-xxx）
│   └── li-xxx/
│       ├── li-xxx.vue
│       └── types.ts   # 组件 props / emits 类型
├── area-data/         # 内置省、市、区县数据与级联选项工厂
├── styles/            # 主题变量、reset、全局样式（:root + page 双根注入）
├── assets/            # SVG / PNG / JPG 等静态资源
├── index.less         # 全局样式入口（@import 一次）
├── package.json       # uni_modules 元数据 + easycom 规则
└── readme.md
```

---

## 📄 License

见仓库 LICENSE。
