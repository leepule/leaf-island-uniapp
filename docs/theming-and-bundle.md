# 包体与主题定制说明

## 图标资源：当前代价与可选方向

当前 `li-icon` 有意支持运行时传入任意 Lucide 图标名。源码采用两种平台路径：

- H5 动态加载 `@lucide/vue` 并按名字解析图标。由于名称在运行时才确定，不能保证构建器只保留业务实际使用的图标。
- 非 H5 使用 `import.meta.glob(..., { eager: true })` 把 SVG 集合放入运行时映射，以支持小程序内任意图标名。

本地 `lucide-static/icons` 目录包含约 2,077 个 SVG，源文件合计约 8.1 MB。这个数字是依赖目录的源文件大小，**不是** H5 或微信小程序最终压缩包大小；最终大小需查看实际构建产物。

### 可选方案

| 方案 | 包体影响 | API 影响 |
| --- | --- | --- |
| 保持全量动态名称 | 包体较大；不需要业务逐个注册 | 兼容当前“任意 Lucide 名称”能力 |
| 提供精简内置图标集 | 小程序可只打包库内常用图标 | 超出内置集合的名称需注册或使用自定义 SVG；属于 API 能力调整 |
| 增加显式图标注册/独立图标包 | 能按业务使用集合打包 | 需要宿主应用提供图标映射；需设计 H5 / 小程序一致的注册入口 |

直接将现有全量 glob 改成白名单会让合法图标名静默失效，因此本次保留组件运行时兼容性。已优化图标 Demo：增加名称搜索并将同时渲染的结果限制为 60 个，避免一次创建两千多个图标节点。这减少的是 Demo 的渲染和加载压力，不代表组件包体已经变小。

若后续决定做真实按需打包，建议作为明确的 API 版本变更设计注册式图标集，并先对照 H5 与 `mp-weixin` 实测构建产物大小。

## 主题变量与运行时切换

组件库提供 `light`（默认）与 `dark` 两套语义色。颜色 token 由 CSS 自定义属性提供，常用 Less 颜色变量也映射到这些属性，因此主题切换会影响组件颜色，而不是只改页面基础文字色。

### 使用主题容器

用 `li-theme-provider` 包住需要换肤的页面内容，通过响应式 `theme` 属性切换。组件库的 CSS 变量会在容器内继承，适合整页或局部区域换肤：

```vue
<template>
  <li-theme-provider :theme="theme">
    <li-card title="今日小记">
      <li-input v-model="note" placeholder="写点什么" />
    </li-card>
    <li-button @click="toggleTheme">切换主题</li-button>
  </li-theme-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const theme = ref<'light' | 'dark'>('light');
const note = ref('');
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};
</script>
```

也可以固定主题：`<li-theme-provider theme="dark">...</li-theme-provider>`。未被容器包裹的内容使用默认浅色主题。

### 自定义主题色

可在 `li-theme-provider` 容器上覆盖语义 CSS 变量：

```css
.li-theme-provider.my-theme {
  --animal-primary-color: #438c70;
  --animal-primary-color-hover: #58a584;
  --animal-primary-color-active: #34775d;
  --animal-bg-color: #f2f6f0;
  --animal-surface-color: #ffffff;
  --animal-text-color: #304339;
}
```

CSS 自定义属性需由目标平台支持；项目面向 H5 和微信小程序，建议在实际使用的基础库版本上检查样式表现。主题容器控制组件库语义色，组件中作为插画或状态强调的独立装饰色会继续保留其原有配色。

主要变量定义位于 `styles/themes/default.less` 与 `styles/themes/dark.less`，组件消费变量的 Less 映射位于 `styles/variables.less`。
