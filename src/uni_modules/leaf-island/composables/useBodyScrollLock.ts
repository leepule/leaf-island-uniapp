/**
 * 模拟 DOM 节点的接口，用于在非浏览器环境（如小程序）或测试中提供兼容性支持
 */
export interface DocLike {
  body: { style: { overflow: string } };
}

/**
 * 页面滚动锁定器的接口定义
 */
export interface BodyScrollLocker {
  /** 锁定页面滚动，并记住锁定前的 overflow 样式值 */
  lock(): void;
  /** 恢复到调用 `lock()` 之前的 overflow 样式值 */
  unlock(): void;
}

/**
 * 创建页面滚动锁定器
 * @param getDoc 可选的获取文档对象的函数，用于自定义获取目标元素，默认为全局 document
 * @returns 包含 lock 和 unlock 方法的滚动锁定器对象
 */
export function createBodyScrollLock(getDoc?: () => DocLike | undefined): BodyScrollLocker {
  // 记录锁定前的 overflow 样式，以便解锁时恢复
  let prevOverflow = '';

  // 解析并获取文档对象
  const resolveDoc = (): DocLike | undefined => {
    if (getDoc) return getDoc();
    return typeof document === 'undefined' ? undefined : document;
  };

  return {
    /**
     * 锁定滚动：将 overflow 设置为 'hidden'
     */
    lock() {
      const doc = resolveDoc();
      if (!doc) return;
      prevOverflow = doc.body.style.overflow;
      doc.body.style.overflow = 'hidden';
    },
    /**
     * 解锁滚动：将 overflow 恢复为原样
     */
    unlock() {
      const doc = resolveDoc();
      if (!doc) return;
      doc.body.style.overflow = prevOverflow;
    },
  };
}

