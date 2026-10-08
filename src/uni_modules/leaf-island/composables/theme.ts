import type { InjectionKey, Ref } from 'vue';

export type LeafIslandTheme = 'light' | 'dark';

export const leafIslandThemeKey: InjectionKey<Readonly<Ref<LeafIslandTheme>>> = Symbol('leaf-island-theme');
