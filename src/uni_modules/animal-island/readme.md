# Animal Island UI（uni-app 版）

一款专为 UniApp 打造的自然治愈系 / 卡通风格轻量组件库，面向 **uni-app** 全平台（H5 / 微信小程序 / 支付宝小程序 / 百度小程序 / 抖音小程序 / App 等）。

> **免责声明**：本项目所有组件及素材均为原创或采用合法开源协议，与任何商业游戏作品无关。

> 组件前缀统一为 `ai-`（如 `Button` → `ai-button`）。

---

## ✨ 平台支持

| 平台        | 支持情况 | 说明 |
| ----------- | -------- | ---- |
| H5          | ✅ 完全   | 动效、`ai-cursor` 光标等全部生效 |
| 微信小程序  | ✅ 完全   | 动效降级为 CSS，功能等价 |
| 支付宝/百度/抖音/QQ/快手等小程序 | ✅ 完全 | 同微信小程序 |
| App（iOS / Android） | ✅ 完全 | 同 H5 能力 |

所有组件均通过条件编译（`// #ifdef H5` / `// #ifndef H5`）做降级，**无需**为不同平台写分支代码，导入即用。

---

## 📦 安装

本包为 `uni_modules` 格式，直接把整个 `animal-island` 目录放进你的 uni-app 项目根目录的 `uni_modules/` 下即可：

```
your-uni-app-project/
├── uni_modules/
│   └── animal-island/        <-- 复制这里
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

放入后 **无需额外配置** 即可使用 `ai-` 开头的任意组件（已内置 `easycom` 规则）。

> 若你把自己的项目 `easycom` 配置成 `autoscan: true`，也能自动识别；本包在 `package.json` 中已声明 `easycom.custom` 规则，放进 `uni_modules` 即生效。

图标组件依赖 Lucide 官方包：H5 端使用 `@lucide/vue` 渲染组件，小程序端通过 `lucide-static` 的 `?raw` SVG 字符串生成 data URI 后交给 `image` 渲染。请一并安装：

```sh
npm install @lucide/vue lucide-static
```

`ai-icon` 支持当前 `lucide-static` 版本的全部图标；小程序端为支持运行时任意图标名，会将全量 SVG 字符串编入包内。若后续对包体要求极高，可改回显式图标映射。

---

## 🎨 全局样式

组件样式基于一组 CSS 变量（`styles/variables.less`），需在 `App.vue` 中引入一次：

```vue
<!-- App.vue -->
<style lang="less">
@import '@/uni_modules/animal-island/index.less';
</style>
```

- `:root` 与小程序 `page` 根节点都会注入变量，无需手动声明。
- **字体**：默认使用系统字体。如需自定义字体，用 `uni.loadFontFace` 注入后覆盖变量 `--animal-font-family`（见 `styles/variables.less`）。

---

## 🧩 组件清单（21 个）

| 组件 | 说明 | 强 Web 特性降级说明 |
| ---- | ---- | ---- |
| `ai-button` | 按钮 | — |
| `ai-icon` | 全量 Lucide 图标（H5 使用 `@lucide/vue`，小程序用 `lucide-static` SVG 生成 data URI） | — |
| `ai-divider` | 分割线 | — |
| `ai-title` | 标题 | — |
| `ai-input` | 输入框 | — |
| `ai-switch` | 开关 | — |
| `ai-checkbox` | 复选框 | — |
| `ai-radio` | 单选框 | — |
| `ai-select` | 下拉选择 | 移除 `getBoundingClientRect` 定位，改用 `position: absolute` + 全屏透明遮罩关闭 |
| `ai-tabs` | 标签页 | — |
| `ai-collapse` | 折叠面板 | — |
| `ai-tooltip` | 文字提示 | — |
| `ai-card` | 卡片 | — |
| `ai-table` | 表格 | — |
| `ai-time` | 时间 | — |
| `ai-typewriter` | 打字机 | — |
| `ai-code-block` | 代码块 | — |
| `ai-footer` | 页脚 | — |
| `ai-cursor` | 跟随光标 | **仅 H5** 生效；小程序 / App 自动隐藏，不影响布局 |
| `ai-loading` | 岛屿加载动画 | 纯 CSS 旋转动画 + opacity/scale 显隐，全平台一致（含 `prefers-reduced-motion` 降级） |
| `ai-modal` | 模态框 | 移除 `Teleport`，改用 `position: fixed` 根容器 + 透明遮罩关闭 |

> 图标来源：[Lucide Icons](https://lucide.dev)，ISC License。

---

## 🚀 快速使用

```vue
<template>
  <view>
    <ai-title>自然小岛</ai-title>
    <ai-divider />
    <ai-button type="primary" @click="sayHi">上岛啦</ai-button>
    <ai-card title="今日天气">
      <ai-typewriter text="晴，适合散步和观察自然～" />
    </ai-card>
    <ai-modal :open="showModal" title="欢迎" @close="showModal = false">
      <p>欢迎来到自然小岛！</p>
    </ai-modal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AiModal from '@/uni_modules/animal-island/components/ai-modal/ai-modal.vue';

const showModal = ref(false);
function sayHi() {
  showModal.value = true;
}
</script>
```

> 由于 `easycom` 已配置，绝大多数组件无需手动 `import`；若 IDE 提示找不到，可显式 `import AiXxx from '@/uni_modules/animal-island/components/ai-xxx/ai-xxx.vue';`。

---

## 🧱 目录结构

```
animal-island/
├── components/        # 21 个组件，目录名 = 组件名（ai-xxx）
│   └── ai-xxx/
│       ├── ai-xxx.vue
│       └── types.ts   # 组件 props / emits 类型
├── styles/            # 主题变量、reset、全局样式（:root + page 双根注入）
├── assets/            # SVG / PNG / JPG 等静态资源
├── index.less         # 全局样式入口（@import 一次）
├── package.json       # uni_modules 元数据 + easycom 规则
└── readme.md
```

---

## 📄 License

见仓库 LICENSE。
