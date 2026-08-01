<script lang="ts">
// #ifdef H5
import { Fragment, Text, defineComponent, h, onBeforeUnmount, ref, watch, type PropType, type VNode } from 'vue';

// 小程序运行时 (@dcloudio/uni-mp-vue) 未导出 Comment，改用全局符号注册表取到同一个值。
const COMMENT_TYPE: unknown = Symbol.for('v-cmt');

interface State {
  remaining: number;
  stopped: boolean;
}

function countText(nodes: unknown): number {
  if (nodes == null || typeof nodes === 'boolean') return 0;
  if (typeof nodes === 'string' || typeof nodes === 'number') return String(nodes).length;
  if (typeof nodes === 'function') return countText((nodes as () => unknown)());
  if (Array.isArray(nodes)) return nodes.reduce<number>((s, n) => s + countText(n), 0);
  const v = nodes as VNode;
  if (v && typeof v === 'object' && 'type' in v) {
    if (v.type === COMMENT_TYPE) return 0;
    if (v.type === Text) return String(v.children ?? '').length;
    return countText(v.children);
  }
  if (v && typeof v === 'object') {
    return Object.values(v).reduce<number>((sum, child) => sum + countText(child), 0);
  }
  return 0;
}

function cloneWithChildren(v: VNode, children: unknown): VNode {
  return h(v.type as never, v.props ?? undefined, children as never);
}

function clip(nodes: unknown, state: State): unknown {
  if (state.stopped) return null;
  if (nodes == null || typeof nodes === 'boolean') return null;
  if (typeof nodes === 'function') {
    return (...args: unknown[]) => {
      const clipped = clip((nodes as (...slotArgs: unknown[]) => unknown)(...args), state);
      // uni-app 的内置组件会把 default slot 当作 VNode 数组并调用 .some()。
      return Array.isArray(clipped) ? clipped : clipped == null ? [] : [clipped];
    };
  }
  if (typeof nodes === 'string' || typeof nodes === 'number') {
    const text = String(nodes);
    if (state.remaining >= text.length) {
      state.remaining -= text.length;
      return text;
    }
    const shown = text.slice(0, state.remaining);
    state.remaining = 0;
    state.stopped = true;
    return shown;
  }
  if (Array.isArray(nodes)) {
    return nodes.map((c) => clip(c, state));
  }
  const v = nodes as VNode;
  if (v && typeof v === 'object' && 'type' in v) {
    if (v.type === COMMENT_TYPE) return v;
    if (v.type === Text) {
      const text = String(v.children ?? '');
      if (state.remaining >= text.length) {
        state.remaining -= text.length;
        return v;
      }
      const shown = text.slice(0, state.remaining);
      state.remaining = 0;
      state.stopped = true;
      return cloneWithChildren(v, shown);
    }
    if (v.type === Fragment) {
      return cloneWithChildren(v, clip(v.children, state));
    }
    if (v.children == null || typeof v.children === 'string') {
      const text = String(v.children ?? '');
      if (text.length === 0) return v;
      if (state.remaining >= text.length) {
        state.remaining -= text.length;
        return v;
      }
      const shown = text.slice(0, state.remaining);
      state.remaining = 0;
      state.stopped = true;
      return cloneWithChildren(v, shown);
    }
    return cloneWithChildren(v, clip(v.children, state));
  }
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).map(([name, child]) => [name, clip(child, state)]));
  }
  return null;
}

export interface TypewriterProps {
  speed?: number;
  trigger?: unknown;
  autoPlay?: boolean;
  text?: string;
  /** 是否为富内容（H5 可自动检测，保留此 prop 用于跨平台 API 一致性） */
  rich?: boolean;
}

export default defineComponent({
  name: 'AiTypewriter',
  props: {
    speed: { type: Number, default: 90 },
    trigger: { type: [Number, String, Boolean, Object, Array] as PropType<unknown>, required: false },
    autoPlay: { type: Boolean, default: true },
    text: { type: String, default: undefined },
    rich: { type: Boolean, default: false },
  },
  emits: ['done'],
  setup(props, { slots, emit }) {
    const getNodes = (): VNode[] => {
      if (props.text != null) return [h(Text, props.text) as unknown as VNode];
      return slots.default ? slots.default() : [];
    };

    const count = ref(0);
    let total = 0;
    let shouldStart = true;
    let startVersion = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      stop();
      count.value = 0;
      shouldStart = true;
      startVersion += 1;
    };

    watch(
      () => [props.speed, props.trigger, props.autoPlay, props.text],
      () => start(),
      { immediate: true }
    );

    onBeforeUnmount(stop);

    return () => {
      // uni-app 的 view 等节点在 H5 中是组件，文本位于 default slot 函数中。
      // 必须在渲染阶段读取 slot，既能保留响应式依赖，也不会触发 Vue 的 slot 警告。
      const nodes = getNodes();
      total = countText(nodes);
      if (!props.autoPlay) {
        return nodes;
      }
      if (shouldStart) {
        shouldStart = false;
        const version = startVersion;
        queueMicrotask(() => {
          if (version !== startVersion || timer || total === 0) return;
          timer = setInterval(() => {
            count.value += 1;
            if (count.value >= total) {
              stop();
              emit('done');
            }
          }, props.speed);
        });
      }
      const state: State = { remaining: count.value, stopped: false };
      return clip(nodes, state) as VNode | VNode[] | null;
    };
  },
});
// #endif

// #ifndef H5
import { defineComponent, onBeforeUnmount, onMounted, ref, watch, type PropType, type VNode } from 'vue';

const COMMENT_TYPE: unknown = Symbol.for('v-cmt');

/**
 * 从 VNode 树中提取纯文本。
 * 小程序模板的 <text> 只能渲染字符串，所以富内容（view 等）需要降级为直接渲染 slot。
 */
function extractText(nodes: unknown): string {
  if (nodes == null || typeof nodes === 'boolean') return '';
  if (typeof nodes === 'string' || typeof nodes === 'number') return String(nodes);
  if (Array.isArray(nodes)) return nodes.map(extractText).join('');
  const v = nodes as VNode;
  if (v && typeof v === 'object') {
    // Text VNode: type 是 Symbol(Text)
    if (typeof v.type === 'symbol') {
      if (v.type === COMMENT_TYPE) return '';
      return String(v.children ?? '');
    }
    // 元素 / 组件节点：递归 children（children 可能是数组/字符串/函数）
    const kids = v.children;
    if (kids == null) return '';
    if (typeof kids === 'string') return kids;
    if (typeof kids === 'number') return String(kids);
    if (Array.isArray(kids)) return kids.map(extractText).join('');
    // children 是函数等情况，跳过
    return '';
  }
  return '';
}

/** 检测 slot 内容是否包含非文本元素节点（即"富内容"） */
function hasElementNodes(nodes: unknown): boolean {
  if (nodes == null || typeof nodes === 'boolean' || typeof nodes === 'string' || typeof nodes === 'number') return false;
  if (Array.isArray(nodes)) return nodes.some(hasElementNodes);
  const v = nodes as VNode;
  if (v && typeof v === 'object' && 'type' in v) {
    // Text / Comment 节点的 type 是 symbol → 不是元素
    if (typeof v.type === 'symbol') return false;
    // type 是字符串或对象 → 这是元素/组件节点
    if (typeof v.type === 'string' || typeof v.type === 'object') return true;
    // 递归检查 children
    return hasElementNodes(v.children);
  }
  return false;
}

export interface TypewriterProps {
  speed?: number;
  trigger?: unknown;
  autoPlay?: boolean;
  text?: string;
  /**
   * 是否为富内容（含 view 等元素节点）。
   * 微信小程序的 slots 在 setup 阶段只能拿到「是否存在」的标记，
   * 拿不到实际 VNode 树，所以需要父组件显式声明。
   * 显式声明后，组件会直接渲染 slot，不做逐字动画。
   */
  rich?: boolean;
}

export default defineComponent({
  name: 'AiTypewriter',
  props: {
    speed: { type: Number, default: 90 },
    trigger: { type: [Number, String, Boolean, Object, Array] as PropType<unknown>, required: false },
    autoPlay: { type: Boolean, default: true },
    text: { type: String, default: undefined },
    rich: { type: Boolean, default: false },
  },
  emits: ['done'],
  setup(props, { slots, emit }) {
    const displayedText = ref('');
    /** 是否检测到富内容（含 view 等元素节点），富内容时直接渲染 slot */
    const isRich = ref(false);
    let timer: ReturnType<typeof setInterval> | null = null;
    /** 标记是否已首次启动，避免在 slots 尚未就绪时（setup 阶段）就开始计时 */
    let inited = false;

    const getSlotNodes = (): unknown => {
      const slot = (slots as Record<string, unknown>).default;
      if (typeof slot === 'function') return (slot as () => unknown)();
      if (slot != null) return slot;
      return [];
    };

    const getFullText = (): string => {
      if (props.text != null) return props.text;
      return extractText(getSlotNodes());
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      stop();
      const nodes = getSlotNodes();

      // 检测是否富内容（优先使用父组件显式声明的 rich prop，
      // 因为 mp 平台 slots 在 setup 阶段只包含「是否存在」标记，不包含 VNode 内容）
      isRich.value = props.rich || hasElementNodes(nodes);

      if (isRich.value) {
        // 富内容：直接显示原始 slot，不做逐字动画（小程序 <text> 无法保留样式）
        displayedText.value = '';
        emit('done');
        return;
      }

      // 纯文本：执行打字机效果
      const fullText = getFullText();
      if (!props.autoPlay) {
        displayedText.value = fullText;
        return;
      }
      displayedText.value = '';
      if (fullText.length === 0) return;
      let idx = 0;
      timer = setInterval(() => {
        idx += 1;
        displayedText.value = fullText.slice(0, idx);
        if (idx >= fullText.length) {
          stop();
          emit('done');
        }
      }, props.speed);
    };

    watch(
      () => [props.speed, props.trigger, props.autoPlay, props.text],
      () => {
        // 已首次启动（onMounted）后，props 变化才重新播放
        if (inited) start();
      }
    );

    // 在挂载完成后再启动首次打字机，避免 setup 阶段 slots 尚未就绪
    // 导致 initial state 为空、setInterval 永远不启动的问题。
    onMounted(() => {
      inited = true;
      start();
    });

    onBeforeUnmount(stop);

    return {
      displayedText,
      isRich,
    };
  },
});
// #endif
</script>

<!-- #ifdef H5 -->
<!-- H5 使用渲染函数，无需模板 -->
<template></template>
<!-- #endif -->

<!-- #ifndef H5 -->
<!-- 小程序 / App 使用模板模式 -->
<template>
  <view class="ai-typewriter">
    <!-- 富内容（含 view 等元素）或 autoPlay=false：直接渲染原始 slot，保留样式和结构 -->
    <slot v-if="isRich || !autoPlay" />
    <!-- 纯文本 + autoPlay：逐字显示打字机效果（white-space: pre-wrap 支持 \n 换行） -->
    <text v-else class="typewriter-text">{{ displayedText }}</text>
    <slot v-if="isRich || !autoPlay" name="footer" />
  </view>
</template>
<!-- #endif -->

<style lang="less" scoped>
.ai-typewriter {
  display: inline;
}
.typewriter-text {
  white-space: pre-wrap;
}
</style>
