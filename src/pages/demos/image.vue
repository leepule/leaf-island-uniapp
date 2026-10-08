<script setup lang="ts">
import sampleImage from '../../uni_modules/leaf-island/assets/img/demo/image-island.png';
import alternateImage from '../../uni_modules/leaf-island/assets/img/demo/image-island-2.png';

const imageUrl = sampleImage;
const imageGroup = [sampleImage, alternateImage];
const apiRows = [
  { prop: 'src', desc: '图片地址', type: 'string', defaultVal: "''" },
  { prop: 'width / height', desc: '容器宽高，数字按 px 处理', type: 'number | string', defaultVal: '100% / 180px' },
  { prop: 'fit', desc: '图片裁剪模式，使用 uni-app image mode', type: 'ImageFit', defaultVal: 'aspectFill' },
  { prop: 'radius', desc: '圆角大小，数字按 px 处理', type: 'number | string', defaultVal: '12px' },
  { prop: 'lazyLoad', desc: '是否懒加载', type: 'boolean', defaultVal: 'false' },
  { prop: 'preview', desc: '点击图片时打开预览', type: 'boolean', defaultVal: 'false' },
  { prop: 'previewUrls', desc: '点击预览时使用的图片列表，可左右切换', type: 'string[]', defaultVal: '当前图片' },
  { prop: 'placeholder / errorText', desc: '加载占位与错误文案', type: 'string', defaultVal: '加载中 / 图片加载失败' },
  { prop: 'load / error / preview', desc: '图片加载、加载失败和预览事件', type: 'event', defaultVal: '-' },
  { prop: 'placeholder / error', desc: '自定义加载占位和错误状态', type: 'slot', defaultVal: '-' },
];
const code = `<li-image :src="images[0]" :preview-urls="images" :preview="true" />`;
</script>

<template>
  <ComponentDemoPage name="image" use-case="展示网络图片或本地图片，支持尺寸、裁剪、懒加载、加载/错误状态和点击预览。点击小岛图片可查看大图。" :code="code" :api-rows="apiRows">
    <view class="image-demo">
      <li-image :src="imageUrl" :preview-urls="imageGroup" :width="240" :height="160" fit="aspectFill" :preview="true" placeholder="岛屿图片加载中" />
      <view class="image-demo__row">
        <li-image :src="imageUrl" :preview-urls="imageGroup" :width="88" :height="88" fit="aspectFill" :radius="44" :preview="true" placeholder="圆形图片" />
        <li-image :src="alternateImage" :preview-urls="imageGroup" :width="120" :height="88" fit="aspectFit" :preview="true" placeholder="完整显示" />
      </view>
    </view>
  </ComponentDemoPage>
</template>

<style lang="less" scoped>
.image-demo { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
.image-demo__row { display: flex; align-items: center; gap: 12px; }
</style>
