# Leaf Island UI 组件 API 与示例

本文按 `src/uni_modules/leaf-island/components/` 当前源码整理组件属性、事件、插槽与常见用法。组件模板属性使用 kebab-case；JS/TS 类型名使用 camelCase。布尔属性默认值以组件实现为准。

表格中的“必填”表示必传属性，“—”表示未设置默认值。

组件清单：`li-action-sheet`、`li-avatar`、`li-backtop`、`li-badge`、`li-breadcrumb`、`li-button`、`li-card`、`li-cascader`、`li-checkbox`、`li-code-block`、`li-collapse`、`li-cursor`、`li-date-picker`、`li-divider`、`li-drawer`、`li-empty`、`li-footer`、`li-form`、`li-form-item`、`li-icon`、`li-image`、`li-input`、`li-loading`、`li-modal`、`li-navbar`、`li-notification`、`li-pagination`、`li-popover`、`li-progress`、`li-radio`、`li-rate`、`li-search`、`li-select`、`li-skeleton`、`li-steps`、`li-switch`、`li-tabbar`、`li-table`、`li-tag`、`li-tabs`、`li-theme-provider`、`li-time`、`li-title`、`li-toast`、`li-tooltip`、`li-typewriter`、`li-upload`。

## 主题容器

### `li-theme-provider`

为插槽内容提供继承式主题变量，支持浅色和暗色主题。组件可包裹整页，也可只包裹需要换肤的局部区域。

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `theme` | `'light' \| 'dark'` | `'light'` |

主题切换与自定义变量示例见[主题说明](./theming-and-bundle.md#主题变量与运行时切换)。

## 基础组件

### `li-button`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `type` | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `danger` | `boolean` | `false` |
| `ghost` | `boolean` | `false` |
| `block` | `boolean` | `false` |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `htmlType` | `'submit' \| 'reset' \| 'button'` | `'button'` |
| `openType` | `string` | `''` |
| `hoverClass` | `string` | `'animal-btn--active'` |
| `hoverStartTime` | `number` | `20` |
| `hoverStayTime` | `number` | `70` |
| `appParameter` | `string` | `''` |
| `sendMessageTitle` | `string` | `''` |
| `sendMessagePath` | `string` | `''` |
| `sendMessageImg` | `string` | `''` |
| `showMessageCard` | `boolean` | `false` |

事件：`click`；以及平台按钮事件 `getphonenumber`、`getuserinfo`、`opensetting`、`launchapp`、`contact`、`chooseavatar`、`error`。插槽：`default` 按钮内容、`icon` 前置图标。

### `li-icon`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `name` | `string` | `必填` |
| `width` | `number \| string` | `—` |
| `height` | `number \| string` | `—` |
| `color` | `string` | `—` |
| `strokeWidth` | `number \| string` | `—` |
| `strokeLinecap` | `string` | `—` |
| `strokeLinejoin` | `string` | `—` |
| `class` | `string` | `—` |
| `size` | `number \| string` | `24` |
| `bounce` | `boolean` | `false` |
| `variant` | `'dark' \| 'light'` | `'dark'` |

无组件事件和插槽。H5 使用 Lucide Vue；小程序以 SVG 图片渲染。

### `li-title`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `color` | `'default' \| 'app-pink' \| 'purple' \| 'app-blue' \| 'app-yellow' \| 'app-orange' \| 'app-teal' \| 'app-green' \| 'app-red' \| 'lime-green' \| 'yellow-green' \| 'brown' \| 'warm-peach-pink'` | `'default'` |

插槽：`default` 标题内容。无组件事件。

### `li-divider`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `type` | `'line-brown' \| 'line-teal' \| 'line-white' \| 'line-yellow' \| 'wave-yellow' \| 'dashed-brown' \| 'dashed-teal' \| 'dashed-white' \| 'dashed-yellow'` | `'line-brown'` |

无事件和插槽。

## 数据录入

### `li-input`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `string` | `''` |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `clearable` | `boolean` | `—` |
| `allowClear` | `boolean` | `false` |
| `status` | `'error' \| 'warning'` | `—` |
| `shadow` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `placeholder` | `string` | `—` |
| `type` | `string` | `'text'` |
| `readonly` | `boolean` | `false` |
| `maxlength` | `number` | `—` |

事件：`update:modelValue(value)`、`change(value, event)`、`clear()`。插槽：`prefix`、`suffix`。

### `li-select`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `string` | `必填` |
| `options` | `SelectOption[]` | `必填` |
| `placeholder` | `string` | `'请选择'` |
| `disabled` | `boolean` | `false` |

事件：`update:modelValue(value)`、`change(value)`。无插槽。当前为受控组件，父级应通过 `v-model` 更新选择值；菜单使用遮罩关闭，适合触屏操作。

### `li-switch`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `boolean` | `—` |
| `defaultChecked` | `boolean` | `false` |
| `size` | `'small' \| 'middle' \| 'default'` | `'middle'` |
| `disabled` | `boolean` | `false` |
| `loading` | `boolean` | `false` |

事件：`update:modelValue(value)`、`change(value)`。插槽：`checked`、`unchecked`，分别自定义开/关文案。

### `li-checkbox`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `CheckboxValue[]` | `—` |
| `options` | `CheckboxOption[]` | `必填` |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `disabled` | `boolean` | `false` |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` |

事件：`update:modelValue(values)`、`change(values)`。无插槽。支持单个选项禁用。

### `li-radio`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `string \| number` | `undefined` |
| `options` | `RadioOption[]` | `必填` |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `disabled` | `boolean` | `false` |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` |

事件：`update:modelValue(value)`、`change(value)`。无插槽。支持单项禁用和键盘方向键操作。

### `li-rate`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `number` | `—` |
| `defaultValue` | `number` | `0` |
| `count` | `number` | `5` |
| `allowHalf` | `boolean` | `false` |
| `allowClear` | `boolean` | `false` |
| `disabled` / `readonly` | `boolean` | `false` |
| `showText` | `boolean` | `false` |
| `texts` | `string[]` | `['很差', '较差', '一般', '不错', '很好']` |
| `character` | `string` | `'★'` |
| `color` / `voidColor` | `string` | `'#f2b544'` / `'#ded8cb'` |

事件：`update:modelValue(value)`、`change(value)`。支持键盘方向键增减评分，`Home` 清零、`End` 设为最高分。无插槽。

## 数据展示

### `li-card`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `type` | `'default' \| 'dashed'` | `'default'` |
| `color` | `'default' \| 'app-pink' \| 'purple' \| 'app-blue' \| 'app-yellow' \| 'app-orange' \| 'app-teal' \| 'app-green' \| 'app-red' \| 'lime-green' \| 'yellow-green' \| 'brown' \| 'warm-peach-pink'` | `'default'` |
| `pattern` | `'none' \| 'default' \| 'app-pink' \| 'purple' \| 'app-blue' \| 'app-yellow' \| 'app-orange' \| 'app-teal' \| 'app-green' \| 'app-red' \| 'lime-green' \| 'yellow-green' \| 'brown' \| 'warm-peach-pink'` | `'none'` |

插槽：`default` 卡片内容。无事件。

### `li-tabs`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `items` | `TabItem[]` | `必填` |
| `modelValue` | `string` | `—` |
| `defaultActiveKey` | `string` | `—` |
| `leafAnimation` | `boolean` | `true` |
| `shadow` | `boolean` | `true` |

事件：`update:modelValue(key)`、`change(key)`。插槽：按 `item.key` 命名，例如 `#profile`；每个插槽收到 `{ item }`。

### `li-navbar`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `title` | `string` | `''` |
| `showBack` | `boolean` | `false` |
| `backText` | `string` | `'返回'` |
| `fixed` | `boolean` | `false` |
| `bordered` / `shadow` | `boolean` | `true / false` |
| `safeArea` | `boolean` | `true` |
| `autoBack` | `boolean` | `false` |
| `background` / `color` | `string` | `—` |

事件：`back(event)`。只有启用 `autoBack` 时组件才调用 `uni.navigateBack`。插槽：`left`、默认标题、`right`。

### `li-tabbar`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `items` | `TabbarItem[]` | `必填` |
| `modelValue` | `string` | `—` |
| `defaultActiveKey` | `string` | `—` |
| `fixed` / `safeArea` / `bordered` | `boolean` | `true` |
| `activeColor` / `inactiveColor` | `string` | `—` |

`TabbarItem` 支持 `key`、`label`、`icon`、`activeIcon`、`badge` 和 `disabled`。事件：`update:modelValue(key)`、`change(key, item)`。插槽：`item`，参数 `{ item, active }`。组件只负责选择状态，不自动跳转路由。

### `li-breadcrumb`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `items` | `BreadcrumbItem[]` | `必填` |
| `separator` | `string` | `'/'` |

`BreadcrumbItem` 支持 `key`、`label` 和 `disabled`。点击可用的上级项触发 `click(item, index)`，当前项不可点击。插槽：`item`（参数 `{ item, index, current }`）、`separator`。

### `li-backtop`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `visibilityHeight` | `number` | `300` |
| `scrollTop` | `number` | `H5 自动检测；小程序由页面传入` |
| `duration` | `number` | `300` |
| `right` / `bottom` | `string` | `'32rpx'` / 安全区上方 `32rpx` |
| `text` / `showText` | `string` / `boolean` | `'顶部'` / `true` |

事件：`click()`。H5 自动监听滚动；小程序需在页面 `onPageScroll` 中更新 `scrollTop` 并传给组件。

### `li-collapse`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `question` | `string` | `—` |
| `answer` | `string` | `—` |
| `defaultExpanded` | `boolean` | `false` |
| `expanded` | `boolean` | `—` |
| `disabled` | `boolean` | `false` |

事件：`update:expanded(value)`、`change(value)`。插槽：`question` 覆盖标题、`default` 放面板内容；优先使用插槽展示富内容。

### `li-table`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `columns` | `TableColumn<T>[]` | `() => [] as TableColumn<T>[]` |
| `dataSource` | `T[]` | `() => [] as T[]` |
| `rowKey` | `string \| ((record: T) => string)` | `'key'` |
| `striped` | `boolean` | `true` |
| `showHeader` | `boolean` | `true` |
| `loading` | `boolean` | `false` |
| `emptyText` | `string` | `'暂无数据'` |
| `scroll` | `{ x?: number \| string; y?: number \| string }` | `—` |

列配置也支持以下属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `title` | `string` | 列标题 |
| `key` | `string` | 列唯一标识；不传时使用 `dataIndex` 或列序号 |
| `dataIndex` | `string` | 对应数据字段 |
| `render` | `function` | 自定义单元格渲染 |
| `width` | `number \| string` | 列宽 |
| `align` | `left, center, right` | 对齐方式 |
| `style` | `object` | 单元格样式 |
| `sorter` | `boolean \| (a, b) => number` | 启用默认排序或自定义比较函数 |
| `filters` | `TableFilter[]` | 筛选项列表，形如 `[{ text, value }]` |
| `filterMultiple` | `boolean` | 是否允许多选筛选项，默认 `true` |
| `onFilter` | `(value, record) => boolean` | 自定义筛选判断；默认按 `dataIndex` 严格匹配 |
| `fixed` | `'left' \| 'right'` | 固定到水平滚动区域左侧或右侧 |

排序按列标题循环升序、降序、取消；筛选面板支持多选、重置和确认。事件：`sort-change({ column, order })`、`filter-change(activeFilters)`。`scroll.x` 开启横向滚动，建议固定列设置像素宽度以正确计算偏移。插槽：`cell-{dataIndex}`（参数 `{ value, record, index }`）、`header-{dataIndex}`（参数 `{ column }`）、`empty` 自定义空状态。

### `li-time`

无属性、事件或插槽。组件自动显示并更新当前时间。

### `li-typewriter`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `text` | `string` | `undefined` |
| `speed` | `number` | `90` |
| `trigger` | `unknown` | `—` |
| `autoPlay` | `boolean` | `true` |
| `rich` | `boolean` | `false` |

事件：`done()`，播放结束时触发。插槽：`default`。小程序对富内容插槽会直接显示；纯文本 `text` 支持换行并有更好的跨端一致性。

### `li-code-block`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `code` | `string` | `必填` |
| `title` | `string` | `''` |

无事件和插槽。

### `li-footer`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `type` | `'sea'` | `'sea'` |

无事件和插槽。

## 反馈与辅助

### `li-modal`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `open` | `boolean` | `false` |
| `title` | `string` | `—` |
| `width` | `number \| string` | `520` |
| `maskClosable` | `boolean` | `true` |
| `showFooter` | `boolean` | `true` |
| `typewriter` | `boolean` | `true` |
| `typeSpeed` | `number` | `80` |

事件：`update:open(value)`、`close()`、`ok()`。插槽：`default` 内容、`title` 自定义标题、`footer` 自定义底部。

### `li-tooltip`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `title` | `string` | `''` |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` |
| `trigger` | `'hover' \| 'focus' \| 'click'` | `'hover'` |
| `variant` | `'default' \| 'island'` | `'default'` |
| `bordered` | `boolean` | `true` |

无事件。插槽：`default` 触发元素、`title` 富提示内容。移动端建议使用 `click` 触发，避免依赖 hover。

### `li-loading`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `active` | `boolean` | `true` |
| `text` | `string` | `''` |
| `color` | `string` | `'#19c8b9'` |
| `size` | `number \| string` | `24` |

插槽：`default` 自定义加载文案，优先于 `text`。无事件。

### `li-cursor`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `forceAll` | `boolean` | `true` |

插槽：`default` 包裹需要自定义光标的内容。无事件。仅 H5 生效，小程序/App 自动隐藏。

## 受控、非受控和表单组合

传入 `v-model` 时由父级持有状态，适合校验、提交和跨组件联动；未传入时，`switch`、`checkbox`、`radio`、`tabs`、`collapse` 可使用组件内部状态。`select` 和 `modal` 当前需要父级用 `v-model` 管理。

```vue
<!-- 受控：父级通过 v-model 持有并更新状态 -->
<li-switch v-model="enabled" @change="onEnabledChange" />
<li-collapse v-model:expanded="faqExpanded" question="如何报名？">
  <text>在活动页填写报名信息即可。</text>
</li-collapse>

<!-- 非受控：由组件管理后续状态，仅声明初始值 -->
<li-switch default-checked />
<li-collapse default-expanded question="常见问题">
  <text>这里是默认展开的答案。</text>
</li-collapse>
```

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';

const name = ref('');
const region = ref('north');
const interests = ref<(string | number)[]>([]);
const updatesEnabled = ref(true);
const submitted = ref(false);

const nameStatus = computed(() => (submitted.value && !name.value.trim() ? 'error' : undefined));

function submit() {
  submitted.value = true;
  if (name.value.trim()) {
    // 在这里提交 name、region、interests 和 updatesEnabled。
  }
}
</script>

<template>
  <view class="form">
    <text>昵称</text>
    <li-input v-model="name" clearable placeholder="请输入昵称" :status="nameStatus" />
    <text v-if="nameStatus === 'error'" class="error">请填写昵称</text>

    <text>所在区域</text>
    <li-select v-model="region" :options="[
      { key: 'north', label: '北岸' },
      { key: 'south', label: '南岸' },
    ]" />

    <text>感兴趣的活动</text>
    <li-checkbox v-model="interests" direction="vertical" :options="[
      { label: '钓鱼', value: 'fishing' },
      { label: '园艺', value: 'gardening' },
    ]" />

    <li-switch v-model="updatesEnabled">
      <template #checked>接收更新</template>
      <template #unchecked>不接收</template>
    </li-switch>
    <li-button type="primary" block @click="submit">保存</li-button>
  </view>
</template>

<style scoped>
.form { display: flex; flex-direction: column; gap: 16rpx; padding: 24rpx; }
.error { color: #c64e3b; font-size: 24rpx; }
</style>
```

## 移动端布局建议

- 使用纵向排列和足够的点击区域；表单中的 checkbox / radio 可设置 `direction="vertical"`。
- 为主要输入和选择控件提供明确的标签与校验文案，不只依靠颜色表达错误。
- Tooltip 在触屏端使用 `trigger="click"`；不要把关键操作只放在 hover 状态中。
- 表格可设置 `scroll.x` / `scroll.y`，并优先展示必要列；复杂信息可改为卡片列表。
- 避免在小屏中依赖固定宽度。Modal 支持字符串宽度，如 `width="90vw"`；页面内容本身应留出两侧间距。
- H5 与微信小程序是当前主要验证平台。跨端项目应使用 Demo 页实际验证布局和交互后，再声明新增平台支持。

## 组件 Demo

项目内 `src/pages/demos/` 为组件或组件组提供独立示例页，包含可交互状态。建议修改组件 API 时同步更新对应 Demo 与本文档。

## 其他组件

### `li-toast`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `show` | `boolean` | `false` |
| `message` | `string` | `''` |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| `duration` | `number` | `2400` |
| `position` | `'top' \| 'center' \| 'bottom'` | `'top'` |

事件：`update:show(value)`、`close()`。插槽：`default`，追加在 message 后。组件使用固定定位视图实现，不调用平台原生 Toast。

### `li-notification`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `open` | `boolean` | 未传入时默认显示 |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| `title` | `string` | `''` |
| `description` | `string` | `''` |
| `closable` | `boolean` | `false` |

事件：`update:open(value)`、`close()`。插槽：`default` 补充正文。它是文档流中的持续通知，不自动消失。

### `li-form` / `li-form-item`

#### `li-form` 属性

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `model` | `Record<string, unknown>` | `必填` |
| `rules` | `Record<string, FormRule \| FormRule[]>` | `() => ({})` |
| `layout` | `'vertical' \| 'horizontal'` | `—` |

事件：校验成功时 `submit(model)`；每次校验后 `validate(valid, errors)`。`validate()` 也通过组件 expose 暴露。

#### `li-form-item` 属性

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `prop` | `string` | `必填` |
| `label` | `string` | `''` |
| `required` | `boolean` | `—` |
| `error` | `string` | `—` |

插槽：`default` 放对应输入控件。

规则支持 `required`、`message` 和同步 `validator(value, model)`；validator 返回 `true` 表示成功，返回 `false` 或错误文案表示失败。表单布局、提交和同步规则校验为本组件职责，远程校验需业务自行实现。

### `li-empty`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `description` | `string` | `'暂无数据'` |

插槽：`default` 放重试或继续浏览等操作。无事件。

### `li-progress`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `percent` | `number` | `0` |
| `status` | `'normal' \| 'success' \| 'exception'` | `'normal'` |
| `showInfo` | `boolean` | `true` |
| `strokeColor` | `string` | `''` |
| `indeterminate` | `boolean` | `false` |

无事件和插槽。

### `li-drawer`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `open` | `boolean` | `false` |
| `placement` | `'left' \| 'right' \| 'bottom'` | `'right'` |
| `title` | `string` | `''` |
| `size` | `number \| string` | `'80vw'` |
| `maskClosable` | `boolean` | `true` |

事件：`update:open(value)`、`close()`。插槽：`default` 滚动内容、`title` 自定义标题、`footer` 底部操作。

### `li-action-sheet`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `open` | `boolean` | `false` |
| `actions` | `ActionSheetAction[]` | `必填` |
| `title` | `string` | `''` |
| `cancelText` | `string` | `'取消'` |
| `maskClosable` | `boolean` | `true` |

事件：`update:open(value)`、`select(action, index)`（选择可用项后发出并自动关闭）、`cancel()`（点击取消）、`close()`（通过选项、取消或可关闭遮罩收起）。禁用项不会触发选择，面板底部适配安全区。无插槽。

### `li-cascader`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `options` | `CascaderOption[]` | `必填` |
| `modelValue` | `CascaderValue[]` | `() => []` |
| `open` | `boolean` | `—` |
| `title` | `string` | `'请选择地区'` |
| `placeholder` | `string` | `'请选择'` |
| `separator` | `string` | `' / '` |
| `clearable` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

面板采用标题栏、层级标签和单列滚动列表；点击父节点自动进入下一层，当前项显示项目强调色和勾选标记。选择叶子项后触发 `update:modelValue(values)` 和 `change(values, selectedOptions)` 并关闭；关闭按钮、遮罩和 `update:open(value)` 控制面板开合，`clear` 清空路径。PC 使用输入框下拉面板，移动端使用底部抽屉；H5 / 微信小程序的固定定位、嵌套滚动和安全区仍需实机验收。无插槽。

地区数据包位于 `src/uni_modules/leaf-island/area-data`，可通过 `getChinaAreaOptions()` 获取完整省、市、区县三级选项；`value` 为六位行政区划代码字符串。另导出 `provinceList`、`cityList`、`countyList` 代码映射和 `AREA_DATA_VERSION`。数据整理自 Vant `@vant/area-data`，许可与来源说明见数据包目录。

### `li-popover`

H5 会将气泡面板传送到 `body`，根据触发器位置计算坐标，并限制在视口内以避免被页面容器裁切；小程序保留组件内定位，靠近页面边缘时需在目标端验证裁切表现。

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `open` | `boolean` | `false` |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| `title` | `string` | `''` |
| `trigger` | `'click' \| 'manual'` | `'click'` |

事件：`update:open(value)`、`change(value)`。插槽：`default` 触发器、`content` 气泡内容。H5 按触发器定位并将面板约束在视口内，但不会自动翻转方向；小程序使用组件内定位。移动端使用点击触发。

### `li-badge`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `count` | `number` | `0` |
| `dot` | `boolean` | `false` |
| `max` | `number` | `99` |
| `showZero` | `boolean` | `false` |

插槽：`default` 被标记内容。无事件。

### `li-tag`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `type` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` |
| `checkable` | `boolean` | `false` |
| `modelValue` | `boolean` | `undefined` |
| `defaultChecked` | `boolean` | `false` |
| `closable` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

可通过 `checkable` 将标签用作筛选条件。事件：`update:modelValue(value)`、`change(value)`、`close(event)`；关闭后组件隐藏。插槽：`default` 标签内容。

### `li-avatar`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `src` | `string` | `''` |
| `name` | `string` | `''` |
| `size` | `number \| string` | `—` |
| `shape` | `'circle' \| 'square'` | `—` |

图片加载失败时显示前两个字符；插槽 `default` 可自定义回退头像。无事件。

### `li-skeleton`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `active` | `boolean` | `true` |
| `rows` | `number` | `3` |
| `avatar` | `boolean` | `false` |
| `title` | `boolean` | `true` |

加载结束时显示 `default` 插槽内容。无事件。

### `li-date-picker`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `string \| [string, string]` | `''` |
| `start` | `string` | `''` |
| `end` | `string` | `''` |
| `fields` | `'year' \| 'month' \| 'day'` | `'day'` |
| `mode` | `'single' \| 'range'` | `'single'` |
| `view` | `'month' \| 'week'` | `'month'` |
| `disabledDates` | `string[]` | `[]` |
| `disabledDate` | `(date: string) => boolean` | `—` |
| `valueFormat` | `string` | `''` |
| `placeholder` | `string` | `'请选择日期'` |
| `disabled` | `boolean` | `false` |

`value-format` 支持 `yyyy`、`MM`、`dd` 令牌，默认值随粒度变化：年为 `yyyy`、月为 `yyyy-MM`、日为 `yyyy-MM-dd`。范围模式使用 `fields="day"` 和 `v-model="[startDate, endDate]"` 二元组；PC 月历依次点击开始和结束日期，周范围模式显示整月日期并在点击后选择该日期所在的周；移动端滚轮通过开始/结束切换栏分别选择。范围中任一天被禁用时，范围不会提交。`disabledDates` 接收 `yyyy-MM-dd` 字符串数组，`disabledDate` 可用函数动态禁用日期。所有模式均受 `start` / `end` 边界限制。事件：`update:modelValue(value)`、`change(value)`。

### `li-upload`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `UploadFile[]` | `—` |
| `action` | `string` | `''` |
| `name` | `string` | `'file'` |
| `maxCount` | `number` | `9` |
| `disabled` | `boolean` | `false` |

点击缩略图调用 `uni.previewImage` 预览当前文件，并可在预览中切换列表内其他图片。传入 `action` 后使用 `uni.uploadFile` 上传并展示进度；失败项可点击“重试”，移除文件前会弹出确认框。事件：`update:modelValue(files)`、`change(files)`（文件增删或上传状态改变时触发，不因每次进度刷新触发）、`progress(file, percent)`、`preview(file, index)`、`success(file, response)`、`error(file, error)`。鉴权头、业务响应解析和删除服务端文件由宿主项目处理。插槽暂不提供。

### `li-image`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `src` | `string` | `''` |
| `previewUrls` | `string[]` | `—` |
| `width` | `number \| string` | `'100%'` |
| `height` | `number \| string` | `'180px'` |
| `fit` | `'scaleToFill' \| 'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'heightFix' \| 'top' \| 'bottom' \| 'center' \| 'left' \| 'right' \| 'top left' \| 'top right' \| 'bottom left' \| 'bottom right'` | `'aspectFill'` |
| `radius` | `number \| string` | `'12px'` |
| `lazyLoad` | `boolean` | `false` |
| `preview` | `boolean` | `false` |
| `placeholder` | `string` | `'加载中'` |
| `errorText` | `string` | `'图片加载失败'` |

预览支持系统提供的多图切换、缩放和关闭。事件：`load(event)`、`error(event)`、`preview(src, index)`。插槽：`placeholder`、`error` 可分别自定义加载占位和失败状态。

新增组件的交互示例位于 `src/pages/demos/`。`date-picker`、`upload`、`image`、`search`、`steps`、`action-sheet`、`cascader`、固定定位浮层和 `scroll-view` 的平台差异，应按 H5 与微信开发者工具/真机分别验收。

### `li-search`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `string` | `—` |
| `placeholder` | `string` | `'请输入关键词'` |
| `buttonText` | `string` | `'搜索'` |
| `clearable` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

输入变化时触发 `update:modelValue(value)`；点击搜索按钮或键盘搜索键触发 `search(keyword)`；点击清除触发 `clear()` 并将绑定值设为空字符串。`history` 插槽用于放置自定义历史词，作用域参数为 `value`、`search(keyword)` 和 `clear()`；调用插槽的 `search(keyword)` 会更新绑定值并立即提交搜索。组件只负责输入与事件，不保存或管理历史记录，也不内置历史关键词。

### `li-steps`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `steps` | `StepItem[]` | `必填` |
| `current` | `number` | `0` |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `status` | `'process' \| 'error'` | `'process'` |

`current` 之前的步骤显示完成，之后的步骤显示等待；步骤项显式设置 `status` 时优先使用该状态。状态支持 `wait | process | finish | error`。无事件和插槽；组件只负责呈现步骤，不管理流程推进。

### `li-pagination`

| 属性 | 类型 | 默认值 / 必填 |
| --- | --- | --- |
| `modelValue` | `number` | `—` |
| `total` | `number` | `必填` |
| `pageSize` | `number` | `10` |
| `disabled` | `boolean` | `false` |

事件：`update:modelValue(page)`、`change(page)`。组件只发出页码，不负责切割数据或请求数据。
