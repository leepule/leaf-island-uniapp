<script setup lang="ts">
const apiRows = [
  { prop: 'description', desc: '空状态说明文字', type: 'string', defaultVal: '暂无数据' },
  { prop: 'default', desc: '可选操作，例如重试或继续浏览按钮', type: 'slot', defaultVal: '-' },
];
const code = `<li-empty description="还没有收藏的岛屿">
  <li-button size="small">去逛逛</li-button>
</li-empty>`;
</script>
<template>
  <ComponentDemoPage name="empty" use-case="列表无数据、搜索无结果或用户尚未创建内容时，给出原因说明和下一步操作。" :code="code" :api-rows="apiRows">
    <view class="demo-box"><li-empty description="还没有收藏的岛屿"><li-button size="small" type="primary">去逛逛</li-button></li-empty></view>
    <li-empty description="没有找到匹配的活动" />
  </ComponentDemoPage>
</template>
