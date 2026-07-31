import { ref, onMounted, onBeforeUnmount } from 'vue';

/**
 * 计算距离下一个整分（秒数归零）还剩多少毫秒
 * 用于定时器在整分时精确触发，实现时间对齐更新
 * 
 * @param timeMs 当前时间戳，默认为 Date.now()
 * @returns 距离下一整分的毫秒数
 */
export function msUntilNextMinute(timeMs: number = Date.now()): number {
  return 60000 - (timeMs % 60000);
}

/**
 * 获取并自动更新当前时间的组合式函数 (Composable)
 * 采用按整分对齐的定时更新机制，避免了每秒无意义地触发更新，节省性能
 */
export function useNow() {
  // 当前时间状态，初始为当前时刻
  const now = ref(new Date());
  let timer: ReturnType<typeof setTimeout> | null = null;

  // 定时器回调：更新当前时间，并重新计算下一次整分更新的延迟时间
  const tick = () => {
    now.value = new Date();
    timer = setTimeout(tick, msUntilNextMinute());
  };

  onMounted(() => {
    // 组件挂载时开启定时器，等待到下一个整分时触发第一次更新
    timer = setTimeout(tick, msUntilNextMinute());
  });

  onBeforeUnmount(() => {
    // 组件卸载前清除定时器，避免内存泄漏
    if (timer) clearTimeout(timer);
  });

  return { now };
}

