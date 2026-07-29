<script setup lang="ts">
// 引入一次 animal-island 全局样式（含 CSS 变量 / reset）
</script>

<style lang="less">
@import '../uni_modules/animal-island/index.less';

page,
.app-root {
  background: #f6f3e8;
  min-height: 100vh;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #5f5238;
}


/* ---------- 各 demo 页共享样式（对齐 demo 参考站） ---------- */
/* 组件 demo 页整体作为一张白底卡片，内嵌奶油色 demo-box，形成 demo 的层叠质感 */
.demo-page {
  margin: 24rpx;
  padding: 48rpx 40rpx 56rpx;
  background: #ffffff;
  border: 1px solid #e8e2d6;
  border-radius: 24rpx;
  box-sizing: border-box;
}

/* 页头：组件名 + 标签 chip，对齐 demo 的 sectionTitleStyle */
.demo-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #725d42;
  display: flex;
  align-items: center;
  gap: 12rpx;
  line-height: 1.3;
}
.demo-tag {
  display: inline-block;
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  background: #f0e8d8;
  color: #a08060;
  font-weight: 500;
  vertical-align: middle;
}
.demo-desc {
  font-size: 24rpx;
  color: #a0936e;
  margin: 16rpx 0 8rpx;
  line-height: 1.6;
}

/* 分区小标题，对齐 demo 的 labelStyle */
.demo-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #a0936e;
  margin: 40rpx 0 24rpx;
}

/* 演示内盒：奶油底，对齐 demo 的 demoBoxStyle */
.demo-box {
  background: #faf8f3;
  border: 1px solid #e8e2d6;
  border-radius: 24rpx;
  padding: 32rpx;
  box-sizing: border-box;
}
.demo-dashed {
  border: 1.5px dashed #e0d8c8;
  border-radius: 24rpx;
  padding: 28rpx;
  background: #faf8f3;
}
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  align-items: center;
}
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  max-width: 720rpx;
}
.demo-note {
  font-size: 22rpx;
  line-height: 1.6;
  color: #a0936e;
  background: #faf8f3;
  border-left: 4rpx solid #e0d8c8;
  border-radius: 12rpx;
  padding: 16rpx 20rpx;
  margin: 16rpx 0 4rpx;
}

/* 代码块：对齐 demo 的「使用示例」深色标签条（AiCodeBlock 自身已是深色底） */
.animal-code-block {
  margin-top: 40rpx;
}
.animal-code-block::before {
  content: '使用示例';
  display: block;
  background: #3d3028;
  color: #e7e4e0;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  margin: -20px -24px 20px;
  border-radius: 20px 20px 0 0;
}
</style>
