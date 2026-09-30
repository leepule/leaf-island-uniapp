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

组件样式基于一组 CSS 变量（`styles/variables.less`），需在 `App.vue` 中引入一次：

```vue
<!-- App.vue -->
<style lang="less">
@import 'leaf-island-uniapp/index.less';
</style>
```

如果通过 `uni_modules` 目录安装，则使用 `@import '@/uni_modules/leaf-island/index.less';`。

- `:root` 与小程序 `page` 根节点都会注入变量，无需手动声明。
- **字体**：默认使用系统字体。如需自定义字体，用 `uni.loadFontFace` 注入后覆盖变量 `--animal-font-family`（见 `styles/variables.less`）。

---

## 🧩 组件清单（21 个）

| 组件 | 说明 | 强 Web 特性降级说明 |
| ---- | ---- | ---- |
| `li-button` | 按钮 | — |
| `li-icon` | 全量 Lucide 图标（H5 使用 `@lucide/vue`，小程序用 `lucide-static` SVG 生成 data URI） | — |
| `li-divider` | 分割线 | — |
| `li-title` | 标题 | — |
| `li-input` | 输入框 | — |
| `li-switch` | 开关 | — |
| `li-checkbox` | 复选框 | — |
| `li-radio` | 单选框 | — |
| `li-select` | 下拉选择 | 移除 `getBoundingClientRect` 定位，改用 `position: absolute` + 全屏透明遮罩关闭 |
| `li-tabs` | 标签页 | — |
| `li-collapse` | 折叠面板 | — |
| `li-tooltip` | 文字提示 | — |
| `li-card` | 卡片 | — |
| `li-table` | 表格 | — |
| `li-time` | 时间 | — |
| `li-typewriter` | 打字机 | — |
| `li-code-block` | 代码块 | — |
| `li-footer` | 页脚 | — |
| `li-cursor` | 跟随光标 | **仅 H5** 生效；小程序 / App 自动隐藏，不影响布局 |
| `li-loading` | 岛屿加载动画 | 纯 CSS 旋转动画 + opacity/scale 显隐，全平台一致（含 `prefers-reduced-motion` 降级） |
| `li-modal` | 模态框 | 移除 `Teleport`，改用 `position: fixed` 根容器 + 透明遮罩关闭 |

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
├── components/        # 21 个组件，目录名 = 组件名（li-xxx）
│   └── li-xxx/
│       ├── li-xxx.vue
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
