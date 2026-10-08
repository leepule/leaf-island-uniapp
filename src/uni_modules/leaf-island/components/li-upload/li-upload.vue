<script setup lang="ts">
import { computed, ref } from 'vue';
import { previewImages } from '../../composables/preview-images';
import type { UploadFile, UploadProps } from './types';

const props = withDefaults(defineProps<UploadProps>(), { modelValue: undefined, action: '', name: 'file', maxCount: 9, disabled: false });
const emit = defineEmits<{
  (e: 'update:modelValue', files: UploadFile[]): void;
  (e: 'change', files: UploadFile[]): void;
  (e: 'progress', file: UploadFile, progress: number): void;
  (e: 'success', file: UploadFile, response: unknown): void;
  (e: 'error', file: UploadFile, error: unknown): void;
  (e: 'preview', file: UploadFile, index: number): void;
}>();

const internalFiles = ref<UploadFile[]>([]);
const files = computed(() => props.modelValue ?? internalFiles.value);
const remaining = computed(() => Math.min(9, Math.max(0, props.maxCount - files.value.length)));

function setFiles(next: UploadFile[], notifyChange = true) {
  internalFiles.value = next;
  emit('update:modelValue', next);
  if (notifyChange) emit('change', next);
}

function choose() {
  if (props.disabled || remaining.value < 1) return;
  uni.chooseImage({
    count: remaining.value,
    sizeType: ['compressed', 'original'],
    sourceType: ['album', 'camera'],
    success: (result) => {
      const selected = result.tempFilePaths.map((path, index) => ({
        name: `图片 ${files.value.length + index + 1}`,
        path,
        url: path,
        status: props.action ? 'uploading' as const : 'ready' as const,
        progress: props.action ? 0 : undefined,
      }));
      setFiles([...files.value, ...selected]);
      if (props.action) selected.forEach((file) => upload(file));
    },
  });
}

function upload(file: UploadFile) {
  const task = uni.uploadFile({
    url: props.action,
    filePath: file.path,
    name: props.name,
    success: (response) => {
      const currentIndex = files.value.findIndex((item) => item.path === file.path);
      if (currentIndex < 0) return;
      const successful = response.statusCode >= 200 && response.statusCode < 300;
      const updated = { ...files.value[currentIndex], status: successful ? 'done' as const : 'error' as const, progress: successful ? 100 : files.value[currentIndex].progress };
      const next = [...files.value];
      next[currentIndex] = updated;
      setFiles(next);
      if (successful) emit('success', updated, response.data);
      else emit('error', updated, response);
    },
    fail: (error) => {
      const currentIndex = files.value.findIndex((item) => item.path === file.path);
      if (currentIndex < 0) return;
      const failed = { ...files.value[currentIndex], status: 'error' as const };
      const next = [...files.value];
      next[currentIndex] = failed;
      setFiles(next);
      emit('error', failed, error);
    },
  });
  task.onProgressUpdate((event) => {
    const currentIndex = files.value.findIndex((item) => item.path === file.path && item.name === file.name);
    if (currentIndex < 0) return;
    const progress = Math.max(0, Math.min(100, Math.round(event.progress)));
    const updated = { ...files.value[currentIndex], progress };
    const next = [...files.value];
    next[currentIndex] = updated;
    setFiles(next, false);
    emit('progress', updated, progress);
  });
}

function remove(index: number) {
  if (props.disabled) return;
  const file = files.value[index];
  if (!file) return;
  uni.showModal({
    title: '确认删除',
    content: `确定移除“${file.name}”吗？`,
    success: (result) => {
      if (result.confirm) setFiles(files.value.filter((_, itemIndex) => itemIndex !== index));
    },
  });
}

function retry(index: number) {
  if (props.disabled || !props.action) return;
  const file = files.value[index];
  if (!file || file.status !== 'error') return;
  const retrying = { ...file, status: 'uploading' as const, progress: 0 };
  const next = [...files.value];
  next[index] = retrying;
  setFiles(next, false);
  upload(retrying);
}

function preview(index: number) {
  const file = files.value[index];
  if (!file?.url) return;
  emit('preview', file, index);
  const urls = files.value.map((item) => item.url);
  previewImages(urls, index);
}
</script>

<template>
  <view class="li-upload">
    <view v-for="(file, index) in files" :key="`${file.path}-${index}`" class="li-upload__file">
      <image class="li-upload__preview" :src="file.url" mode="aspectFill" @click="preview(index)" />
      <view class="li-upload__meta">
        <text class="li-upload__name">{{ file.name }}</text>
        <view v-if="file.status === 'uploading'" class="li-upload__progress">
          <view class="li-upload__progress-track"><view class="li-upload__progress-value" :style="{ width: `${file.progress || 0}%` }" /></view>
          <text class="li-upload__progress-label">{{ file.progress || 0 }}%</text>
        </view>
        <text v-else class="li-upload__status">{{ file.status === 'ready' ? '待上传' : file.status === 'done' ? '已完成' : '上传失败' }}</text>
      </view>
      <text v-if="file.status === 'error' && action" class="li-upload__retry" @click.stop="retry(index)">重试</text>
      <text class="li-upload__remove" @click="remove(index)">×</text>
    </view>
    <button v-if="remaining > 0" class="li-upload__pick" type="button" :disabled="disabled" @click="choose">
      <text class="li-upload__plus">＋</text><text>选择图片</text>
    </button>
  </view>
</template>

<style lang="less" scoped>
.li-upload { display: flex; flex-direction: column; gap: 10px; }
.li-upload__file { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border: 1px solid var(--animal-border-color-light, #e6ddcd); border-radius: 12px; background: var(--animal-surface-color, #fffdf7); }
.li-upload__preview { width: 52px; height: 52px; border-radius: 8px; background: var(--animal-bg-color-secondary, #eee7d8); cursor: zoom-in; }
.li-upload__meta { display: flex; flex: 1; flex-direction: column; gap: 4px; min-width: 0; }
.li-upload__name { overflow: hidden; color: var(--animal-text-color, #594a37); text-overflow: ellipsis; white-space: nowrap; }
.li-upload__status { color: var(--animal-text-color-secondary, #8c7d68); font-size: 12px; }
.li-upload__progress { display: flex; align-items: center; gap: 8px; }
.li-upload__progress-track { flex: 1; height: 6px; overflow: hidden; border-radius: 6px; background: var(--animal-bg-color-secondary, #eee7d8); }
.li-upload__progress-value { height: 100%; border-radius: inherit; background: var(--animal-primary-color-active, #19a89d); transition: width .18s ease; }
.li-upload__progress-label { min-width: 34px; color: var(--animal-text-color-secondary, #8c7d68); font-size: 12px; text-align: right; }
.li-upload__retry { padding: 4px 6px; color: var(--animal-primary-color-active, #138d82); font-size: 13px; }
.li-upload__remove { padding: 4px 8px; color: #a16b5b; font-size: 20px; }
.li-upload__pick { display: inline-flex; align-items: center; justify-content: center; gap: 8px; align-self: flex-start; min-height: 84px; padding: 12px 20px; border: 2px dashed #c9bda8; border-radius: 14px; background: #faf7ef; color: var(--animal-warm-color-soft, #725d42); font-size: 14px; }
.li-upload__plus { font-size: 22px; }
</style>
