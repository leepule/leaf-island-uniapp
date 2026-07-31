<script setup lang="ts">
import { ref } from 'vue';
const modalOpen = ref(false);
const titleModalOpen = ref(false);
const customFooterOpen = ref(false);
const noTypewriterOpen = ref(false);

const MODAL_API = [
  { prop: 'open', desc: '是否可见（v-model:open）', type: 'boolean', defaultVal: '-', required: true },
  { prop: 'title', desc: '标题', type: 'string', defaultVal: '-' },
  { prop: 'width', desc: '宽度', type: 'number | string', defaultVal: '520' },
  { prop: 'maskClosable', desc: '点击遮罩关闭', type: 'boolean', defaultVal: 'true' },
  { prop: 'showFooter', desc: '是否显示底部按钮', type: 'boolean', defaultVal: 'true' },
  { prop: 'typewriter', desc: '是否启用打字机效果', type: 'boolean', defaultVal: 'true' },
  { prop: '@close / @ok', desc: '关闭 / 确认回调', type: '() => void', defaultVal: '-' },
];

const code = `<ai-button type="primary" @click="open = true">打开 Modal</ai-button>
<ai-modal v-model:open="open" @ok="open = false">Modal 内容</ai-modal>

<ai-modal v-model:open="open" title="标题">内容</ai-modal>

<ai-modal v-model:open="open" title="确认">
    内容
    <template #footer>
    <AppLayout>
        <ai-button @click="open = false">再想想</ai-button>
        <ai-button type="primary" danger @click="open = false">确认</ai-button>
        </AppLayout>
</template>
</ai-modal>

<ai-modal v-model:open="open" :typewriter="false">直接显示全部内容</ai-modal>`;
</script>

<template>
  <AppLayout>
    <view class="demo-page">
      <DemoHeader name="modal" />

      <view class="demo-label">基础弹窗</view>
      <view class="demo-row">
        <ai-button type="primary" @click="modalOpen = true">基础 Modal</ai-button>
        <ai-button @click="titleModalOpen = true">带标题 Modal</ai-button>
        <ai-button type="dashed" @click="customFooterOpen = true">自定义 Footer</ai-button>
        <ai-button type="primary" @click="noTypewriterOpen = true">关闭打字机</ai-button>
      </view>

      <ai-modal v-model:open="modalOpen" @ok="modalOpen = false">
        <view style="text-align: center; display: flex; flex-direction: column; gap: 16rpx">
          <text>钓到<text style="color: #fd9303">石头</text>了!</text>
          <text>竟然连这种都能钓起来...</text>
        </view>
      </ai-modal>

      <ai-modal v-model:open="titleModalOpen" title="博物馆捐赠" @ok="titleModalOpen = false">
        是否愿意将这条鱼捐赠给博物馆呢？傅达会好好照顾它的！这可是博物馆的新展品哦~
      </ai-modal>

      <ai-modal v-model:open="customFooterOpen" title="确认操作">
        确定要让这位居民搬走吗？这个操作不可撤销。
        <template #footer>
          <ai-button @click="customFooterOpen = false">再想想</ai-button>
          <ai-button type="primary" danger @click="customFooterOpen = false">确认搬家</ai-button>
        </template>
      </ai-modal>

      <ai-modal v-model:open="noTypewriterOpen" title="天气预报" :typewriter="false" @ok="noTypewriterOpen = false">
        明天天气晴朗，气温 20-28°C，适合外出活动！
      </ai-modal>

      <ai-code-block title="使用示例" :code="code" />
      <ApiTable :rows="MODAL_API" />
    </view>
  </AppLayout>
</template>
