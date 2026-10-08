<script setup lang="ts">
import { ref } from 'vue';
import type { ActionSheetAction } from '../../uni_modules/leaf-island/components/li-action-sheet/types';

const open = ref(false);
const selected = ref('尚未选择');
const actions: ActionSheetAction[] = [
  { text: '查看岛屿详情', description: '浏览介绍、路线和开放时间', value: 'detail' },
  { text: '分享旅程', value: 'share' },
  { text: '编辑计划', value: 'edit', disabled: true },
  { text: '删除计划', value: 'delete', danger: true },
];
const apiRows = [
  { prop: 'open', desc: '显示状态，使用 v-model:open', type: 'boolean', defaultVal: 'false' },
  { prop: 'actions', desc: '操作列表；每项含 text，可选 description/value/disabled/danger', type: 'ActionSheetAction[]', defaultVal: '必填' },
  { prop: 'title', desc: '菜单标题', type: 'string', defaultVal: "''" },
  { prop: 'cancelText', desc: '取消按钮文案', type: 'string', defaultVal: '取消' },
  { prop: 'maskClosable', desc: '是否允许点击遮罩关闭', type: 'boolean', defaultVal: 'true' },
  { prop: 'select', desc: '选中操作项时触发；禁用项不会触发', type: 'event(action, index)', defaultVal: '-' },
  { prop: 'cancel / close / update:open', desc: '取消、关闭和开合状态变化事件', type: 'event', defaultVal: '-' },
];
const code = `<li-action-sheet
  v-model:open="open"
  title="快速操作"
  :actions="actions"
  @select="handleSelect"
/>`;

function handleSelect(action: ActionSheetAction) {
  selected.value = action.text;
}
</script>

<template>
  <ComponentDemoPage name="action-sheet" use-case="为移动端页面提供底部操作选项；支持标题、说明文字、危险操作、禁用项、遮罩关闭和取消。选中项目后组件自动关闭。" :code="code" :api-rows="apiRows">
    <view class="action-sheet-demo__content">
      <li-button type="primary" @click="open = true">打开操作菜单</li-button>
      <text>最近一次选择：{{ selected }}</text>
    </view>
    <li-action-sheet v-model:open="open" title="选择计划操作" :actions="actions" @select="handleSelect" />
  </ComponentDemoPage>
</template>

<style lang="less" scoped>
.action-sheet-demo__content { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; color: #8c7d68; }
</style>
