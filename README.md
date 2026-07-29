# 🏝 Animal-Island-UniApp (demo-uni)

<div align="center">
    <img src="https://raw.githubusercontent.com/guokaigdg/animal-island-vue/main/docs/img/readme-home.png" alt="animal-island-uniapp" style="border-radius: 12px; width: 40%; display: block; margin: 0 auto;" />
</div>
<div align="center">
一款参考《动物森友会》风格的 uni-app UI 组件库演示与验证脚手架
</div>
<br/>
<div align="center">
    <a href="https://github.com/guokaigdg/animal-island-ui"><img src="https://img.shields.io/badge/inspired%20by-animal--island--ui-brightgreen?style=flat-square" alt="Inspired by Animal-Island-UI"></a>
    <a href="https://github.com/guokaigdg/animal-island-vue"><img src="https://img.shields.io/badge/ported%20from-animal--island--vue-blue?style=flat-square" alt="Ported from Animal-Island-Vue"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square" alt="License"></a>
    <img src="https://img.shields.io/badge/components-20%20(2%20excluded)-blue?style=flat-square" alt="Components">
    <img src="https://img.shields.io/badge/platform-H5%20%7C%20小程序%20%7C%20App-brightgreen?style=flat-square" alt="Platform Support">
</div>

<br/>

## 介绍

本项目是基于 **Vue 3 + TypeScript + Less** 实现的轻量 UI 组件库演示工程，是 [animal-island-vue](https://github.com/guokaigdg/animal-island-vue)（Vue 3 版）的 **uni-app 移植版本**。它为 `uni_modules/animal-island` 本地包提供了**全组件演示**（包括首页卡片索引以及 20 个已移植组件的独立 demo 页，包含用法示例、代码片段与 API 说明表）。

其设计风格灵感来源于任天堂《集合啦！动物森友会》游戏界面，适用于 uni-app 跨端开发的技术练习和趣味跨端应用开发。

> ⚠️ **声明**：所有视觉元素、布局、图标、动画均为独立设计实现，未直接使用任何任天堂官方美术素材、代码或资源文件。本项目仅用于个人学习和技术交流，严禁用于任何商业用途。

---

## 🎨 平台支持与自动降级

由于跨端平台限制，部分高级动效或平台特有特性在小程序/App 端会进行自动降级：

| 平台 | 特性表现 | 降级机制说明 |
| :--- | :--- | :--- |
| **H5 (Web)** | 完整体验 | 动效流畅、ESC 键模态关闭、自定义鼠标光标（Cursor）效果完整生效。 |
| **微信小程序** | 兼容运行 | 自定义光标自动失效；Modal 不支持 ESC 键关闭，改为点击遮罩层关闭。 |
| **App (手机端)** | 兼容运行 | 原理同微信小程序，确保基本展示与核心逻辑的跨端一致性。 |

---

## 🚀 快速上手

### 1. 引入全局样式

请务必引入组件库的全局样式与字体变量，否则组件将无法正常渲染：

在你的项目的 `App.vue` 中的 `<style lang="less">` 内引入：

```css
@import '@/uni_modules/animal-island/index.less';
```

### 2. 使用组件

由于 uni-app 支持 **easycom** 机制，安装在 `uni_modules` 中的组件在模板中可以直接使用，无需手动 `import`：

```vue
<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <view class="container">
    <ai-title color="green">欢迎来到无人岛</ai-title>
    
    <ai-card>
      <ai-button type="primary" @click="open = true">开始冒险</ai-button>
    </ai-card>

    <ai-modal v-model:open="open" title="探索无人岛">
      欢迎来到 animal-island-uniapp。
    </ai-modal>
  </view>
</template>
```

### 3. 配置 easycom 自动引入

如果您的 uni-app 项目采用了 `src` 源码目录与 `uni_modules` 同级的 cli 结构，或者组件没有被自动扫描到，请在您的 `pages.json` 中显式配置 `easycom` 的 `custom` 规则：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^AiButton$": "@/../uni_modules/animal-island/components/ai-button/ai-button.vue",
      "^AiTitle$": "@/../uni_modules/animal-island/components/ai-title/ai-title.vue",
      "^AiInput$": "@/../uni_modules/animal-island/components/ai-input/ai-input.vue",
      "^AiSwitch$": "@/../uni_modules/animal-island/components/ai-switch/ai-switch.vue",
      "^AiCard$": "@/../uni_modules/animal-island/components/ai-card/ai-card.vue",
      "^AiCollapse$": "@/../uni_modules/animal-island/components/ai-collapse/ai-collapse.vue",
      "^AiCursor$": "@/../uni_modules/animal-island/components/ai-cursor/ai-cursor.vue",
      "^AiModal$": "@/../uni_modules/animal-island/components/ai-modal/ai-modal.vue",
      "^AiTypewriter$": "@/../uni_modules/animal-island/components/ai-typewriter/ai-typewriter.vue",
      "^AiDivider$": "@/../uni_modules/animal-island/components/ai-divider/ai-divider.vue",
      "^AiIcon$": "@/../uni_modules/animal-island/components/ai-icon/ai-icon.vue",
      "^AiSelect$": "@/../uni_modules/animal-island/components/ai-select/ai-select.vue",
      "^AiCheckbox$": "@/../uni_modules/animal-island/components/ai-checkbox/ai-checkbox.vue",
      "^AiRadio$": "@/../uni_modules/animal-island/components/ai-radio/ai-radio.vue",
      "^AiTooltip$": "@/../uni_modules/animal-island/components/ai-tooltip/ai-tooltip.vue",
      "^AiTabs$": "@/../uni_modules/animal-island/components/ai-tabs/ai-tabs.vue",
      "^AiFooter$": "@/../uni_modules/animal-island/components/ai-footer/ai-footer.vue",
      "^AiCodeBlock$": "@/../uni_modules/animal-island/components/ai-code-block/ai-code-block.vue",
      "^AiLoading$": "@/../uni_modules/animal-island/components/ai-loading/ai-loading.vue",
      "^AiTable$": "@/../uni_modules/animal-island/components/ai-table/ai-table.vue",
      "^AiTime$": "@/../uni_modules/animal-island/components/ai-time/ai-time.vue",
      "^AiPhone$": "@/../uni_modules/animal-island/components/ai-phone/ai-phone.vue"
    }
  }
}
```
*(注：如果您的项目未采用 `src/` 结构，将路径中的 `../` 去掉，改为 `@/uni_modules/...` 即可。)*

---

## 📂 目录结构

```text
demo-uni/
├── src/
│   ├── animal-island.ts      # 统一导入入口（对应原 demo 的 from '../../src'）
│   ├── pageInfo.ts           # 组件标题 / 标签 / 描述映射
│   ├── App.vue               # 全局样式（引入 animal-island 样式及 demo 共享样式）
│   ├── components/
│   │   ├── ApiTable.vue      # 复用的 API 文档组件
│   │   └── DemoHeader.vue    # 各 demo 页头部组件
│   ├── pages/
│   │   ├── demo/demo.vue     # 首页：组件索引列表
│   │   └── demos/            # 21 个组件 demo 页面（button/title/input/...）
│   ├── pages.json            # uni-app 页面路由配置（首页 + 21 个 demo 页）
│   └── manifest.json         # 跨端配置文件
├── uni_modules/
│   └── animal-island/        # 移植至 uni-app 的 animal-island 核心组件库包
├── package.json
└── vite.config.js
```

---

## 🛠️ 运行前准备

1. **环境建议**：推荐安装 [HBuilderX](https://www.dcloudio.cn/hbuilderx.html) 作为开发工具。
2. **对齐依赖版本**：在 `package.json` 中，把 `@dcloudio/*` 依赖的版本修改为你本地 HBuilderX 内置编译器一致的版本。
   *(查看方式：HBuilderX ->「帮助」->「关于」中的 uni-app 编译器版本。例如：`"@dcloudio/uni-app": "3.0.0-4060620250619001"`)*
3. **Less 编译环境支持**：本项目组件及页面均采用 Less 语法编写：
   - 如果使用 **HBuilderX** 运行：请先在「工具」->「插件安装」中，安装 **Less 编译** 插件，否则运行可能会报错；
   - 如果使用 **命令行** 运行：安装依赖时会自动安装本地 `devDependencies` 中的 `less` 库，无需额外配置。

---

## 💻 安装 & 启动

### 命令行方式 (Node.js)

```bash
# 1. 安装依赖
npm install

# 2. H5 预览（浏览器）
npm run dev:h5

# 3. 微信小程序预览（自动编译并可在微信开发者工具中导入 dist/dev/mp-weixin）
npm run dev:mp-weixin
```

### HBuilderX 方式

1. 将本目录导入到 HBuilderX。
2. 点击上方菜单栏「运行」 -> 「运行到浏览器」或「运行到手机或模拟器」。

---

## 🧩 组件覆盖与兼容性说明

除了 `WeddingInvitation`（婚礼邀请函页）和 `Loading`（加载动画，由于原版依赖复杂的 Canvas 物理落叶计算，现仅为简易纯 CSS 加载占位）未真正移植外，其余 20 个组件已全部完成移植，并在首页提供独立 demo 演示：

| 分类 | 组件 | 组件标签 | 跨端降级 / 差异说明 |
| :--- | :--- | :--- | :--- |
| **基础** | Button (按钮) | `ai-button` | 无平台差异 |
| | Title (标题) | `ai-title` | 无平台差异 |
| | Divider (分割线) | `ai-divider` | 无平台差异 |
| | Icon (图标) | `ai-icon` | 无平台差异 |
| **表单** | Input (输入框) | `ai-input` | 无平台差异 |
| | Switch (开关) | `ai-switch` | 无平台差异 |
| | Checkbox (多选) | `ai-checkbox` | 无平台差异 |
| | Radio (单选) | `ai-radio` | 无平台差异 |
| | Select (下拉选择) | `ai-select` | 跨端使用 uni-app 原生 picker 交互，确保小程序/App可用性 |
| **数据展示** | Card (卡片) | `ai-card` | 无平台差异 |
| | Table (表格) | `ai-table` | 移动端自动横向滚动适配 |
| | Collapse (折叠面板) | `ai-collapse` | 无平台差异 |
| | Tabs (标签页) | `ai-tabs` | 无平台差异 |
| | Tooltip (文字提示) | `ai-tooltip` | 依赖定位，在小程序上建议使用 click 触发以提升体验 |
| | Footer (页脚) | `ai-footer` | 无平台差异 |
| | CodeBlock (代码块) | `ai-code-block` | 支持一键复制 |
| | Time (时间) | `ai-time` | 无平台差异 |
| **反馈 / 动效** | Modal (模态框) | `ai-modal` | H5 支持 ESC 键关闭/滚动锁定；小程序/App 自动降级为点击遮罩关闭 |
| | Typewriter (打字机) | `ai-typewriter` | 无平台差异 |
| | Loading (加载) | `ai-loading` | 未真正移植。现仅为简易纯 CSS 旋转加载占位，无物理动效 |
| | Cursor (光标) | `ai-cursor` | 仅 H5 (Web) 平台生效，小程序和 App 端自动隐藏/失效 |
| | Phone (动森手机) | `ai-phone` | 无平台差异 |

---

## 🤝 致谢

本项目的诞生离不开以下优秀项目的启发与原作者的心血：

- 🏝 **[animal-island-ui](https://github.com/guokaigdg/animal-island-ui)** (React 原版组件库) 以及 **[animal-island-vue](https://github.com/guokaigdg/animal-island-vue)** (Vue 3 移植版) —— 感谢原作者 **[guokaigdg](https://github.com/guokaigdg)** 卓越的创意设计与开源工作。
- 🎮 **《集合啦！动物森友会》(Animal Crossing: New Horizons)** —— 感谢任天堂带来如此温馨治愈的游戏世界与视觉交互灵感。

---

## 🔗 相关项目链接

- **React 原始版本**：[animal-island-ui](https://github.com/guokaigdg/animal-island-ui)
- **Vue 3 原始版本**：[animal-island-vue](https://github.com/guokaigdg/animal-island-vue)
