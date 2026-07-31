<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import Button from '../ai-button/ai-button.vue';
import Typewriter from '../ai-typewriter/ai-typewriter.vue';
import { createBodyScrollLock } from '../../composables/useBodyScrollLock';

interface Props {
  open?: boolean;
  title?: string;
  width?: number | string;
  maskClosable?: boolean;
  showFooter?: boolean;
  typewriter?: boolean;
  typeSpeed?: number;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  width: 520,
  maskClosable: true,
  showFooter: true,
  typewriter: true,
  typeSpeed: 80,
});

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  (e: 'close'): void;
  (e: 'ok'): void;
}>();

defineSlots<{
  default?: () => unknown;
  title?: () => unknown;
  footer?: () => unknown;
}>();

const widthStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}));

const playKey = ref(0);

const scrollLock = createBodyScrollLock();

function handleClose() {
  emit('update:open', false);
  emit('close');
}

function handleOk() {
  emit('ok');
}

function handleMask() {
  if (props.maskClosable) handleClose();
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') handleClose();
}

watch(
  () => props.open,
  (v) => {
    // 锁定 body 滚动 + 监听 ESC 仅 H5 需要（小程序 / App 无 document / ESC）
    // #ifdef H5
    if (typeof document === 'undefined') return;
    if (v) {
      scrollLock.lock();
      document.addEventListener('keydown', handleEsc);
      playKey.value += 1;
    } else {
      scrollLock.unlock();
      document.removeEventListener('keydown', handleEsc);
    }
    // #endif
    // #ifndef H5
    if (v) playKey.value += 1;
    // #endif
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  // #ifdef H5
  if (typeof document !== 'undefined') {
    scrollLock.unlock();
    document.removeEventListener('keydown', handleEsc);
  }
  // #endif
});
</script>

<template>
  <view v-if="open" class="animal-modal__root">
    <!-- 透明遮罩：点击外部关闭（全平台生效，替代 document 监听） -->
    <view class="animal-modal__mask" @click="handleMask">
      <view class="animal-modal" :style="widthStyle" role="dialog" aria-modal="true" @click.stop>
        <view class="animal-modal__body">
          <view v-if="$slots.title || title" class="animal-modal__header">
            <view class="animal-modal__title">
              <slot name="title">{{ title }}</slot>
            </view>
          </view>
          <view class="animal-modal__content">
            <Typewriter v-if="typewriter" :speed="typeSpeed" :trigger="playKey">
              <slot />
            </Typewriter>
            <slot v-else />
          </view>
          <view v-if="showFooter" class="animal-modal__footer">
            <slot name="footer">
              <Button type="primary" @click="handleClose">取消</Button>
              <Button type="primary" @click="handleOk">确定</Button>
            </slot>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.animal-modal {
  position: relative;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  animation: animal-modal-zoom-in 0.3s ease;

  &__root {
    position: fixed;
    inset: 0;
    z-index: 1000;
  }

  &__mask {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.35);
    animation: animal-modal-fade-in 0.25s ease;
  }

  &__body {
    width: 100%;
    height: 100%;
    padding: 48px 48px 32px;
    background: rgb(247, 243, 223);
    border-radius: 32px 28px 36px 30px;
    color: rgb(128, 115, 89);
    font-family: @font-family;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    /* #ifdef H5 */
    background-color: transparent;
    background-image: url('../../assets/img/decor/island-panel.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    border-radius: 0;
    /* #endif */
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
  }

  &__title {
    font-size: 28px;
    font-weight: 700;
    color: rgba(114, 93, 66, 1);
  }

  &__content {
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: auto;
    flex: 1;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.6;
    color: #8a7b66;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }
}

@keyframes animal-modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes animal-modal-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
