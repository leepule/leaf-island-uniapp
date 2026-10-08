<script setup lang="ts">
const apiRows = [
  { prop: 'count', desc: '显示数字', type: 'number', defaultVal: '0' },
  { prop: 'dot', desc: '使用无数字圆点模式', type: 'boolean', defaultVal: 'false' },
  { prop: 'max', desc: '数字上限，超出显示 max+', type: 'number', defaultVal: '99' },
  { prop: 'showZero', desc: '是否显示 0', type: 'boolean', defaultVal: 'false' },
  { prop: 'default', desc: '被角标标记的内容', type: 'slot', defaultVal: '-' },
];
const code = `<li-badge :count="12"><li-button>消息</li-button></li-badge>
<li-badge dot><li-avatar name="叶子" /></li-badge>`;
</script>
<template>
  <ComponentDemoPage name="badge" use-case="角标显示未读数量、待处理任务或在线状态；将需要标记的按钮或头像放入默认插槽。" :code="code" :api-rows="apiRows">
    <view class="demo-row"><li-badge :count="12"><li-button>消息</li-button></li-badge><li-badge :count="128" :max="99"><li-button>通知</li-button></li-badge><li-badge dot><li-avatar name="叶子" /></li-badge></view>
  </ComponentDemoPage>
</template>
