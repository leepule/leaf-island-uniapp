<script setup lang="ts">
import { ref } from 'vue';
import type { StepItem } from '../../uni_modules/leaf-island/components/li-steps/types';

const current = ref(1);
const direction = ref<'horizontal' | 'vertical'>('horizontal');
const status = ref<'process' | 'error'>('process');
const steps: StepItem[] = [
  { title: '填写信息', description: '完善基本资料' },
  { title: '确认订单', description: '检查内容和金额' },
  { title: '完成支付', description: '等待支付结果' },
  { title: '处理完成', description: '可查看订单详情' },
];
const errorSteps: StepItem[] = [
  { title: '提交申请' },
  { title: '审核失败', description: '资料需要补充', status: 'error' },
  { title: '重新提交' },
];
const apiRows = [
  { prop: 'steps', desc: '步骤列表；每项含 title、可选 description 和可选 status', type: 'StepItem[]', defaultVal: '必填' },
  { prop: 'current', desc: '当前步骤索引，从 0 开始；之前的步骤显示完成', type: 'number', defaultVal: '0' },
  { prop: 'direction', desc: '步骤排列方向', type: 'horizontal | vertical', defaultVal: 'horizontal' },
  { prop: 'status', desc: '当前步骤状态；步骤项的 status 可单独覆盖自动状态', type: 'process | error', defaultVal: 'process' },
];
const code = `<li-steps :steps="steps" :current="1" direction="horizontal" />
<li-steps :steps="steps" :current="1" status="error" direction="vertical" />`;
</script>

<template>
  <ComponentDemoPage name="steps" use-case="用于注册、下单、审批等有先后顺序的流程。current 从 0 开始；步骤项可以显式标记 error，适合展示某个环节失败或需要补充资料。" :code="code" :api-rows="apiRows">
    <view class="steps-demo__controls">
      <li-button size="small" @click="direction = direction === 'horizontal' ? 'vertical' : 'horizontal'">切换{{ direction === 'horizontal' ? '纵向' : '横向' }}</li-button>
      <li-button size="small" @click="current = (current + 1) % steps.length">下一步</li-button>
      <li-button size="small" @click="status = status === 'process' ? 'error' : 'process'">切换当前状态</li-button>
    </view>
    <li-steps :steps="steps" :current="current" :direction="direction" :status="status" />
    <text class="steps-demo__label">单项错误状态</text>
    <li-steps :steps="errorSteps" :current="1" direction="vertical" />
  </ComponentDemoPage>
</template>

<style lang="less" scoped>
.steps-demo__controls { display: flex; flex-wrap: wrap; gap: 8px; }
.steps-demo__label { color: #8c7d68; font-size: 14px; }
</style>
