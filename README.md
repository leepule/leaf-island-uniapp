# Leaf Island UI for UniApp

Leaf Island UI for UniApp 是一套面向 **Vue 3 / UniApp** 的自然治愈系轻量组件库，采用卡通扁平视觉、柔和色彩与温和微交互，适合移动端 H5、微信小程序以及各类需要轻松氛围的产品界面。

本项目的视觉与组件体验灵感来自 [animal-island-ui](https://github.com/guokaigdg/animal-island-ui)。该项目启发了 Leaf Island 的自然岛屿氛围、组件命名与部分交互设计方向；本仓库是基于 UniApp 生态的重新实现，并非直接复制或官方衍生版本。

## 特性

- **UniApp 优先**：组件按 `uni_modules` 规范组织，通过 EasyCom 使用，无需逐个手动导入。
- **Vue 3 + TypeScript**：组件 Props 与 Events 均提供类型定义，开发体验更清晰。
- **治愈系视觉语言**：内置自然主题变量、圆润形态、低饱和暖色与轻量动效。
- **跨端适配**：使用条件编译处理平台差异；`li-cursor` 等 Web 专属能力会自动降级。
- **Lucide 图标**：`li-icon` 基于 Lucide 官方图标库，多端渲染策略自动切换。
- **MIT 协议**：可免费用于个人与商业项目。

## 灵感与致谢

- 灵感来源：<https://github.com/guokaigdg/animal-island-ui>
- 图标来源：[Lucide Icons](https://lucide.dev)，ISC License

感谢原项目带来的设计灵感。Leaf Island UI for UniApp 是独立维护的 UniApp 组件实现，若你在 Web 项目中需要原风格组件，也可以直接关注上述灵感项目。

## 平台支持

当前仓库主要验证并声明支持以下平台：

| 平台 | 支持状态 | 说明 |
| --- | --- | --- |
| H5 / Web | 支持 | 完整视觉与交互，包含 `li-cursor` |
| 微信小程序 | 支持 | Web 专属能力自动降级，功能保持等价 |

其他小程序平台与 App 尚未纳入当前验证范围，实际可用性可能取决于项目编译配置与平台差异。

## 安装

### 1. 复制组件库

将 `src/uni_modules/leaf-island` 复制到你的 UniApp 项目中：

```text
your-uni-app-project/
├── src/
│   └── uni_modules/
│       └── leaf-island/
│           ├── components/
│           ├── composables/
│           ├── styles/
│           ├── assets/
│           ├── index.less
│           └── package.json
├── pages.json
├── App.vue
└── main.js
```

如果你的项目没有 `src` 目录，也可以将 `leaf-island` 放在项目根目录的 `uni_modules/` 下，并同步调整样式引用路径。

### 2. 安装依赖

```bash
npm install vue@^3.4.0 @lucide/vue@^1.43.0 lucide-static@^1.43.0
```

### 3. 引入全局样式

在 `App.vue` 中引入一次基础样式与主题变量：

```vue
<style lang="less">
@import '@/uni_modules/leaf-island/index.less';
</style>
```

## 快速开始

组件遵循 `li-` 前缀与 EasyCom 规则，可在页面中直接使用：

```vue
<template>
  <view class="demo-page">
    <li-title level="1">自然小岛</li-title>
    <li-divider />

    <li-card title="今日小记">
      <li-typewriter text="微风和煦，适合观察大自然与享受慢生活。" />
    </li-card>

    <li-button type="primary" @click="visible = true">开启探险</li-button>

    <li-modal :open="visible" title="欢迎上岛" @close="visible = false">
      <view class="modal-body">
        <text>欢迎来到自然治愈小岛。</text>
      </view>
    </li-modal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>

<style scoped>
.demo-page {
  padding: 32rpx;
}

.modal-body {
  padding: 16rpx 0;
  color: #4c3c33;
}
</style>
```

如遇 IDE 无法自动识别组件，可显式导入：

```ts
import LiModal from '@/uni_modules/leaf-island/components/li-modal/li-modal.vue';
```

## 组件清单

| 分类 | 组件 | 说明 |
| --- | --- | --- |
| 基础组件 | `li-button` | 多类型、多尺寸按钮 |
|  | `li-icon` | Lucide 图标组件 |
|  | `li-title` | 层级化标题 |
|  | `li-divider` | 装饰性分割线 |
| 数据录入 | `li-input` | 文本输入框 |
|  | `li-select` | 下拉选择器 |
|  | `li-switch` | 开关 |
|  | `li-checkbox` | 复选框 |
|  | `li-radio` | 单选框 |
| 数据展示 | `li-card` | 卡片容器 |
|  | `li-tabs` | 标签页 |
|  | `li-collapse` | 折叠面板 |
|  | `li-table` | 表格 |
|  | `li-time` | 时间展示 |
|  | `li-typewriter` | 打字机动效 |
|  | `li-code-block` | 代码块 |
|  | `li-footer` | 自然风格页脚装饰 |
| 反馈组件 | `li-modal` | 模态框 |
|  | `li-tooltip` | 气泡提示 |
|  | `li-loading` | 加载动画 |
| Web 体验 | `li-cursor` | 自定义鼠标跟随效果，仅 H5 生效 |

## 本地开发

本仓库同时是组件库的验证与演示工程：

```bash
yarn install
yarn dev:h5
yarn dev:mp-weixin
```

具体构建命令以 `package.json` 为准。

## 目录结构

```text
.
├── README.md
├── package.json
├── vite.config.js
└── src
    ├── App.vue
    ├── leaf-island.ts
    ├── components/
    ├── pages/
    ├── pages.json
    └── uni_modules/leaf-island/
```

## License

[MIT](./LICENSE)
