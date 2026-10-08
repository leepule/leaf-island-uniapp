import { ref } from 'vue';
import type { LeafIslandTheme } from '../uni_modules/leaf-island/composables/theme';

const STORAGE_KEY = 'leaf-island-demo-theme';

function readTheme(): LeafIslandTheme {
  if (typeof uni === 'undefined') return 'light';
  try {
    const saved = uni.getStorageSync(STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

const theme = ref<LeafIslandTheme>(readTheme());

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  if (typeof uni === 'undefined') return;
  try {
    uni.setStorageSync(STORAGE_KEY, theme.value);
  } catch (error) {
    console.warn('[demo-theme] 保存主题失败', error);
  }
}

export function useDemoTheme() {
  return { theme, toggleTheme };
}
