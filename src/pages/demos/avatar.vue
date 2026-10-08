<script setup lang="ts">
const apiRows = [
  { prop: 'src', desc: '头像图片地址', type: 'string', defaultVal: "''" },
  { prop: 'name', desc: '用于 initials 回退与无障碍标签', type: 'string', defaultVal: "''" },
  { prop: 'size', desc: '头像尺寸，数字按 px 处理', type: 'number | string', defaultVal: '40px' },
  { prop: 'shape', desc: '头像形状', type: 'circle | square', defaultVal: 'circle' },
  { prop: 'default', desc: '自定义回退头像内容', type: 'slot', defaultVal: '-' },
];
const code = `<li-avatar name="海风" :size="56" />
<li-avatar shape="square" name="岛民" />`;
</script>
<template>
  <ComponentDemoPage name="avatar" use-case="在用户资料、评论列表或协作成员区域展示身份。图片缺失或加载失败时可使用姓名首字作为回退。" :code="code" :api-rows="apiRows">
    <view class="demo-row"><li-avatar name="叶子" :size="40" /><li-avatar name="海风" :size="56" /><li-avatar name="岛民" shape="square" :size="56" /><li-avatar name="" /></view>
  </ComponentDemoPage>
</template>
