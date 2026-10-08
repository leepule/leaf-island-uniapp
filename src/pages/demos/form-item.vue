<script setup lang="ts">
import { ref } from 'vue';
const nickname = ref('');
const apiRows = [
  { prop: 'prop', desc: '对应表单模型字段名，必填', type: 'string', defaultVal: '-', required: true },
  { prop: 'label', desc: '字段标签', type: 'string', defaultVal: "''" },
  { prop: 'required', desc: '显示必填标记', type: 'boolean', defaultVal: 'false' },
  { prop: 'error', desc: '外部传入的错误文案', type: 'string', defaultVal: "''" },
  { prop: 'default', desc: '当前字段的输入控件', type: 'slot', defaultVal: '-' },
];
const code = `<li-form-item prop="nickname" label="昵称" required>
  <li-input v-model="nickname" placeholder="请输入昵称" />
</li-form-item>`;
</script>
<template>
  <ComponentDemoPage name="form-item" use-case="FormItem 负责字段标签、必填标记和错误文案排版，通常放在 li-form 内；也可单独用于统一表单行布局。" :code="code" :api-rows="apiRows">
    <li-form-item prop="nickname" label="昵称" required error="昵称不能为空"><li-input v-model="nickname" placeholder="请输入昵称" /></li-form-item>
    <li-form-item prop="email" label="邮箱"><li-input placeholder="选填" /></li-form-item>
  </ComponentDemoPage>
</template>
