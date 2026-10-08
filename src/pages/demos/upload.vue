<script setup lang="ts">
import { ref } from 'vue';
import type { UploadFile } from '../../uni_modules/leaf-island/components/li-upload/types';
const files = ref<UploadFile[]>([]);
const apiRows = [
  { prop: 'modelValue', desc: '文件列表，可使用 v-model；项含 name/path/url/status/progress（0–100）', type: 'UploadFile[]', defaultVal: '[]' },
  { prop: 'action', desc: '可选上传地址；不传时只选取本地图片', type: 'string', defaultVal: "''" },
  { prop: 'name', desc: '上传请求中的文件字段名', type: 'string', defaultVal: 'file' },
  { prop: 'maxCount', desc: '最多可选文件数量', type: 'number', defaultVal: '9' },
  { prop: 'disabled', desc: '禁用文件选择', type: 'boolean', defaultVal: 'false' },
  { prop: 'preview', desc: '点击缩略图打开图片预览时触发；预览中可切换、缩放和关闭', type: 'event(file, index)', defaultVal: '-' },
  { prop: 'update:modelValue / change', desc: '文件列表更新事件', type: 'event', defaultVal: '-' },
  { prop: 'progress', desc: '上传进度变化时触发；百分比来自 uni.uploadFile 的进度回调', type: 'event(file, progress)', defaultVal: '-' },
  { prop: 'success / error', desc: '上传成功或失败事件', type: 'event', defaultVal: '-' },
];
const code = `<li-upload v-model="files" :max-count="4" />
<!-- 配置 action 后，组件会调用 uni.uploadFile -->
<li-upload v-model="files" action="https://example.com/upload" @progress="onProgress" />`;
</script>
<template>
  <ComponentDemoPage name="upload" use-case="选择图片后可预览；配置 action 后展示实时进度，失败项可重试，移除前会二次确认。未配置 action 时只选择本地临时图片，不会向服务器发送文件。" :code="code" :api-rows="apiRows">
    <li-upload v-model="files" :max-count="4" />
    <text>已选择 {{ files.length }} 张图片</text>
    <li-notification type="info" description="上传地址、鉴权、业务响应解析由宿主项目配置和处理。" />
  </ComponentDemoPage>
</template>
