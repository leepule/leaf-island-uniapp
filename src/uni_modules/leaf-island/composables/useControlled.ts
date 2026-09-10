import { computed, shallowRef, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

/**
 * 统一管理受控与非受控状态的组合式函数 (Composable)
 * 适用于组件内部既支持 v-model/外部 props 传值（受控），也支持不传值时由内部维护状态（非受控）的场景。
 * 
 * @param controlledValue 外部传入的受控值，可以是一个 ref、getter 函数或普通值。如果为 undefined，则视为非受控状态。
 * @param defaultValue 当处于非受控状态时的初始默认值。
 * @param onChange 状态发生变化时的回调函数，无论是受控还是非受控状态，更新时都会触发该回调。
 */
export function useControlled<T>(
  controlledValue: MaybeRefOrGetter<T | undefined>,
  defaultValue: T,
  onChange: (value: T) => void
) {
  // 内部维护的非受控状态值
  const innerValue = shallowRef<T>(defaultValue);
  
  // 标识当前状态是否处于受控模式（即外部是否传入了有效的值）
  const isControlled = computed(() => toValue(controlledValue) !== undefined);
  
  // 最终使用的值：如果是受控状态则使用外部传入的值，否则使用内部维护的值
  const value = computed(() => {
    const externalValue = toValue(controlledValue);
    return externalValue === undefined ? innerValue.value : externalValue;
  });

  /**
   * 设置新值。
   * 如果是非受控状态，会同时更新内部值以保持界面同步。
   * 无论何种状态，都会触发 onChange 回调。
   * 
   * @param nextValue 新的状态值
   */
  function setValue(nextValue: T) {
    if (!isControlled.value) innerValue.value = nextValue;
    onChange(nextValue);
  }

  /**
   * 仅在非受控状态下设置内部状态的值。
   * 用于某些只需要在组件内部状态流转，而不需要通知外部或受控状态下不想重复触发外部事件的场景。
   * 
   * @param nextValue 新的状态值
   */
  function setUncontrolledValue(nextValue: T) {
    if (!isControlled.value) innerValue.value = nextValue;
  }

  return { value, setValue, setUncontrolledValue, isControlled };
}

