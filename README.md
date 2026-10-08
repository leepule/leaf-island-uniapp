# Leaf Island UI for UniApp

Leaf Island UI for UniApp 是一套面向 **Vue 3 / UniApp** 的自然治愈系轻量组件库，采用卡通扁平视觉、柔和色彩与温和微交互，适合移动端 H5、微信小程序以及各类需要轻松氛围的产品界面。

本项目的视觉与组件体验灵感来自 [animal-island-ui](https://github.com/guokaigdg/animal-island-ui)。该项目启发了 Leaf Island 的自然岛屿氛围、组件命名与部分交互设计方向；本仓库是基于 UniApp 生态的重新实现，并非直接复制或官方衍生版本。

## 特性

- **UniApp 优先**：组件按 `uni_modules` 规范组织，通过 EasyCom 使用，无需逐个手动导入。
- **Vue 3 + TypeScript**：组件 Props 与 Events 均提供类型定义，开发体验更清晰。
- **运行时主题切换**：内置浅色、暗色语义主题，可通过 `li-theme-provider` 响应式切换。
- **治愈系视觉语言**：内置自然主题变量、圆润形态、低饱和暖色与轻量动效。
- **跨端适配**：使用条件编译处理平台差异；`li-cursor` 等 Web 专属能力会自动降级。
- **Lucide 图标**：`li-icon` 基于 Lucide 官方图标库，多端渲染策略自动切换。
- **MIT 协议**：可免费用于个人与商业项目。

组件属性、事件、插槽、受控用法和移动端示例见[组件 API 与示例文档](./docs/component-reference.md)；API 命名约定见[组件 API 约定](./docs/component-api-conventions.md)。

H5 / 微信小程序的静态适配检查与运行验收清单见[跨端检查记录](./docs/platform-compatibility.md)。

图标按需加载评估、主题变量覆盖范围和运行时换肤用法见[包体与主题说明](./docs/theming-and-bundle.md)。

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
|  | `li-card` | 卡片容器 |
|  | `li-divider` | 装饰性分割线 |
|  | `li-icon` | Lucide 图标组件 |
|  | `li-title` | 层级化标题 |
|  | `li-theme-provider` | 浅色/暗色主题容器 |
| 表单组件 | `li-cascader` | 省市区、分类等多级联动选择，内置中国省市区数据 |
|  | `li-checkbox` | 复选框 |
|  | `li-date-picker` | 日期选择 |
|  | `li-form` / `li-form-item` | 表单布局、规则校验与错误提示 |
|  | `li-input` | 文本输入框 |
|  | `li-radio` | 单选框 |
|  | `li-rate` | 整星/半星评分与只读展示 |
|  | `li-search` | 支持清除、提交搜索和自定义历史关键词 |
|  | `li-select` | 下拉选择器 |
|  | `li-switch` | 开关 |
|  | `li-upload` | 图片选择，可配置上传地址 |
| 数据展示 | `li-avatar` | 头像展示 |
|  | `li-badge` | 数量角标与状态标记 |
|  | `li-empty` | 空数据状态与操作入口 |
|  | `li-image` | 图片显示、加载占位与点击预览 |
|  | `li-pagination` | 简易分页 |
|  | `li-progress` | 确定与不确定进度条 |
|  | `li-skeleton` | 加载占位 |
|  | `li-tag` | 状态展示、筛选和可关闭标签 |
|  | `li-table` | 支持排序、筛选、固定列和横向滚动的数据表格 |
|  | `li-time` | 时间展示 |
| 导航组件 | `li-action-sheet` | 移动端底部操作菜单 |
|  | `li-navbar` | 页面顶部导航栏 |
|  | `li-tabbar` | 移动端底部标签导航 |
|  | `li-breadcrumb` | 页面层级导航 |
|  | `li-backtop` | 滚动后返回顶部 |
|  | `li-collapse` | 折叠面板 |
|  | `li-drawer` | 抽屉面板 |
|  | `li-popover` | 点击气泡菜单 |
|  | `li-steps` | 横向或纵向显示流程步骤及完成、错误状态 |
|  | `li-tabs` | 标签页 |
| 反馈提示 | `li-loading` | 加载动画 |
|  | `li-modal` | 模态框 |
|  | `li-notification` | 持续展示的状态通知 |
|  | `li-toast` | 自动关闭的轻提示 |
|  | `li-tooltip` | 气泡提示 |
| 视觉效果 | `li-code-block` | 代码块 |
|  | `li-cursor` | 自定义鼠标跟随效果，仅 H5 生效 |
|  | `li-footer` | 自然风格页脚装饰 |
|  | `li-typewriter` | 打字机动效 |

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
