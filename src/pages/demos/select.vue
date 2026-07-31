<script setup lang="ts">
import { ref } from 'vue';
const fishOptions = [
  { key: 'fish1', label: '鲈鱼' },
  { key: 'fish2', label: '鲷鱼' },
  { key: 'fish3', label: '草鱼' },
  { key: 'fish4', label: '龙睛鱼' },
  { key: 'fish5', label: '神仙鱼' },
];
const flowerOptions = [
  { key: 'flower1', label: '樱花' },
  { key: 'flower2', label: '玫瑰' },
  { key: 'flower3', label: '向日葵' },
  { key: 'flower4', label: '薰衣草' },
  { key: 'flower5', label: '郁金香' },
];

const value1 = ref('fish1');
const value2 = ref('');
const value3 = ref('flower2');

const SELECT_API = [
  { prop: 'options', desc: '选项列表', type: 'SelectOption[]', defaultVal: '-', required: true },
  { prop: 'modelValue', desc: '当前选中值（v-model）', type: 'string', defaultVal: '-', required: true },
  { prop: 'placeholder', desc: '占位文本', type: 'string', defaultVal: "'请选择'" },
  { prop: 'disabled', desc: '禁用状态', type: 'boolean', defaultVal: 'false' },
];

const code = `<script setup lang="ts">
const options = [
    { key: 'option1', label: '选项一' },
    { key: 'option2', label: '选项二' },
];
const value = ref('option1');
<\/script>

<template>
    <AppLayout>
    <ai-select v-model="value" :options="options" />
    </AppLayout>
</template>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="select" />

      <view class="demo-label">受控（默认选中第一项）</view>
      <view class="demo-box" style="max-width: 100%">
        <ai-select v-model="value1" :options="fishOptions" />
      </view>

      <view class="demo-label">占位文本</view>
      <view class="demo-box" style="max-width: 100%">
        <ai-select v-model="value2" :options="fishOptions" placeholder="请选择一条鱼" />
      </view>

      <view class="demo-label">固定选中项</view>
      <view class="demo-box" style="max-width: 100%">
        <ai-select v-model="value3" :options="flowerOptions" />
      </view>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="SELECT_API" />
    </view>
  </AppLayout>
</template>
