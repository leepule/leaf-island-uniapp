# 🏝 Animal Island UI for UniApp

一款专为 **UniApp** 打造的自然治愈系 / 卡通扁平风格轻量 UI 组件库。面向 H5、微信小程序、支付宝小程序、抖音小程序以及 App 等全平台。

> **免责声明**：本项目所有组件、代码及素材均为原创或采用合规开源协议（MIT / ISC），与任何商业游戏作品无关。

---

## ✨ 特性亮点

- 🍃 **自然治愈风格**：柔和温润的色彩搭配与生动的微交互，打造轻松愉悦的视觉体验。
- 📱 **多端全平台适配**：针对 H5、微信小程序、多端小程序及 App 做深度适配，无缝跨端。
- ⚡ **开箱即用 EasyCom**：遵循 `uni_modules` 规范，组件自动按需扫描与注册，无需手动 `import`。
- 🎨 **主题与设计 Token**：基于 Less 变量体系，`:root` 与小程序 `page` 节点自动注入，自由定制主题。
- 🗂 **全量 Lucide 图标**：内置合规开源的 Lucide 图标库（`@lucide/vue` / `lucide-static`），支持海量矢量图标。
- 📜 **MIT 开源许可**：完全自主、协议清晰，允许个人与商业项目免费使用。

---

## 平台支持情况

| 平台 | 支持情况 | 说明 |
| :--- | :---: | :--- |
| **H5 / Web** | ✅ 完全支持 | 支持全部组件、动画与 `ai-cursor` 光标交互 |
| **微信小程序** | ✅ 完全支持 | 动效降级为 CSS，数据与功能完全等价 |
| **支付宝 / 抖音 / 百度小程序** | ✅ 完全支持 | 行为表现与微信小程序一致 |
| **App (iOS / Android)** | ✅ 完全支持 | 具备完整的移动端体验 |

---

## 📦 快速安装与使用

### 1. 引入组件库

本项目基于 `uni_modules` 规范，将 `src/uni_modules/animal-island` 目录复制到你的 UniApp 项目根目录的 `uni_modules/` 下即可：

```text
your-uni-app-project/
├── uni_modules/
│   └── animal-island/        <-- 复制至此
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

### 2. 安装图标依赖

图标组件基于官方开源 Lucide 图标库，请在项目根目录安装依赖：

```bash
# npm
npm install @lucide/vue lucide-static

# yarn
yarn add @lucide/vue lucide-static

# pnpm
pnpm add @lucide/vue lucide-static
```

### 3. 引入全局样式

在 `App.vue` 中引入一次组件库的基础变量与样式：

```vue
<!-- App.vue -->
<style lang="less">
@import '@/uni_modules/animal-island/index.less';
</style>
```

---

## 🚀 示例代码

得益于 `easycom` 自动扫描机制，你可以直接在任意 Vue 页面中使用 `ai-` 前缀组件：

```vue
<template>
  <view class="demo-page">
    <ai-title level="1">自然小岛</ai-title>
    <ai-divider />

    <ai-card title="今日小记">
      <ai-typewriter text="微风和煦，适合观察大自然与享受慢生活～" />
    </ai-card>

    <view class="btn-group">
      <ai-button type="primary" @click="handleOpen">开启探险</ai-button>
      <ai-button type="secondary">查看地图</ai-button>
    </view>

    <ai-modal :open="visible" title="欢迎上岛" @close="visible = false">
      <view class="modal-body">
        <text>欢迎来到自然治愈小岛，开启你的奇妙旅程！</text>
      </view>
    </ai-modal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

function handleOpen() {
  visible.value = true;
}
</script>

<style scoped>
.demo-page {
  padding: 32rpx;
}
.btn-group {
  display: flex;
  gap: 16rpx;
  margin-top: 24rpx;
}
.modal-body {
  padding: 16rpx 0;
  color: #4c3c33;
}
</style>
```

---

## 🧩 组件清单（21 个组件）

| 分类 | 组件名 | 说明 |
| :--- | :--- | :--- |
| **基础通用** | `ai-button` | 胶囊圆润按钮，支持多种主题色与点击反馈 |
| | `ai-icon` | 全量 Lucide 图标组件（自适应多端渲染） |
| | `ai-title` | 自然风各级标题排版 |
| | `ai-divider` | 装饰性波浪与几何风格分割线 |
| **表单录入** | `ai-input` | 拟物暖色输入框 |
| | `ai-select` | 卡通下拉选择器 |
| | `ai-switch` | 弹性动效开关 |
| | `ai-checkbox` | 复选框与多选组 |
| | `ai-radio` | 单选框与单选组 |
| **展示与排版** | `ai-card` | 圆角阴影卡片容器 |
| | `ai-tabs` | 标签页导航栏 |
| | `ai-collapse` | 手风琴折叠面板 |
| | `ai-table` | 响应式轻量表格 |
| | `ai-typewriter` | 打字机逐字展现动效 |
| | `ai-code-block` | 代码块语法高亮展示 |
| | `ai-time` | 趣味时钟与时间展示 |
| **反馈与导航** | `ai-modal` | 弹窗对话框（全端兼容无 Teleport 依赖） |
| | `ai-tooltip` | 文字气泡提示 |
| | `ai-loading` | 岛屿旋转加载动画 |
| | `ai-footer` | 自然波浪与绿树页脚装饰 |
| | `ai-cursor` | 个性化鼠标指针（Web/H5 端专享） |

---

## 🛠 本地开发与体验

本项目内置了全组件 Demo 演示页面与验证脚手架：

```bash
# 安装项目依赖
yarn install # 或 npm install

# 启动 H5 演示端
yarn dev:h5

# 启动微信小程序端
yarn dev:mp-weixin

# 构建 H5 产物
yarn build:h5
```

---

## 📄 开源许可证

本项目遵循 [MIT License](LICENSE) 许可协议。
