<script setup lang="ts">
import { reactive, ref } from 'vue';
const model = reactive({ nickname: '', region: 'north' });
const submitted = ref(false);
const formRef = ref<{ validate: () => boolean } | null>(null);
const rules = { nickname: [{ required: true, message: '请填写昵称' }] };
function submitForm() {
  submitted.value = formRef.value?.validate() ?? false;
}
const apiRows = [
  { prop: 'model', desc: '表单数据对象，必填', type: 'Record<string, unknown>', defaultVal: '-', required: true },
  { prop: 'rules', desc: '按字段名配置校验规则', type: 'FormRules', defaultVal: '{}' },
  { prop: 'layout', desc: '字段布局', type: 'vertical | horizontal', defaultVal: 'vertical' },
  { prop: 'submit(model)', desc: '校验通过后触发', type: 'event', defaultVal: '-' },
  { prop: 'validate(valid, errors)', desc: '每次校验后触发', type: 'event', defaultVal: '-' },
  { prop: 'validate()', desc: '手动校验方法，通过组件 expose 暴露', type: 'method', defaultVal: '-' },
  { prop: 'default', desc: '表单字段与提交控件', type: 'slot', defaultVal: '-' },
];
const code = `const formRef = ref<{ validate: () => boolean } | null>(null)
function submit() {
  if (formRef.value?.validate()) saveForm()
}

<li-form ref="formRef" :model="model" :rules="rules">
  <li-form-item prop="nickname" label="昵称" required>
    <li-input v-model="model.nickname" placeholder="请输入昵称" />
  </li-form-item>
  <li-button @click="submit">提交</li-button>
</li-form>`;
</script>
<template>
  <ComponentDemoPage name="form" use-case="用表单模型集中管理字段和同步校验规则。示例校验昵称必填，通过后显示成功状态；实际网络提交由业务代码完成。" :code="code" :api-rows="apiRows">
    <view class="form-example">
      <li-notification v-if="submitted" type="success" title="校验通过" description="示例没有发送数据到服务器。" />
      <li-form ref="formRef" :model="model" :rules="rules">
        <li-form-item prop="nickname" label="昵称" required><li-input v-model="model.nickname" clearable placeholder="请输入昵称" /></li-form-item>
        <li-form-item prop="region" label="所在区域"><li-select v-model="model.region" :options="[{ key: 'north', label: '北岸' }, { key: 'south', label: '南岸' } ]" /></li-form-item>
        <view class="form-actions"><li-button type="primary" @click="submitForm">校验并提交</li-button></view>
      </li-form>
    </view>
  </ComponentDemoPage>
</template>

<style scoped>
.form-example { display: flex; flex-direction: column; gap: 24rpx; }
.form-example :deep(.li-form-item + .li-form-item) { margin-top: 12px; }
.form-actions { display: flex; justify-content: flex-end; padding-top: 20rpx; border-top: 1px solid #e8e2d6; }
.form-actions :deep(.animal-btn) { margin-left: auto; }
@media screen and (max-width: 600px) {
  .form-actions { justify-content: stretch; }
  .form-actions :deep(.animal-btn) { width: 100%; }
}
</style>
