<script setup lang="ts">
import SideNav from '../SideNav.vue';
</script>

<template>
  <view class="app-root">
    <view class="app-sidebar">
      <SideNav />
    </view>
    <view class="app-main">
      <slot />
    </view>
  </view>
</template>

<style lang="less" scoped>
.app-root {
  position: relative;
  display: flex;
  align-items: stretch;
  min-height: 100vh;
}
.app-sidebar {
  flex: 0 0 260px;
  width: 260px;
  position: relative;
}
.app-main {
  flex: 1;
  min-width: 0;
}
@media (max-width: 767px) {
  .app-root {
    display: block;
  }
  .app-sidebar {
    width: 100%;
  }
}
</style>
