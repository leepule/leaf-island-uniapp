import { computed, getCurrentInstance, onBeforeUnmount, onMounted, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';

// 游戏或设备模拟的设计稿宽度（rpx）
const DESIGN_WIDTH_RPX = 1054;
// 游戏或设备模拟的设计稿高度（rpx）
const DESIGN_HEIGHT_RPX = 1576;

interface MeasuredRect {
  width?: number;
}

/**
 * 根据可用宽度和设计稿宽度，计算缩放比例
 * 限制最大缩放比例为 1，确保不会因为屏幕过大而放大变形
 * 
 * @param availableWidth 容器的实际可用物理宽度
 * @param designWidth 设计稿转换后的物理宽度
 * @returns 缩放比例（0 到 1 之间）
 */
export function computePhoneScale(availableWidth: number, designWidth: number): number {
  if (availableWidth <= 0 || designWidth <= 0) return 1;
  return Math.min(1, availableWidth / designWidth);
}

/**
 * 手机模拟容器等比例缩放与自适应的组合式函数 (Composable)
 * 主要用于在不同屏幕尺寸下等比例缩放手机模拟界面的展示
 */
export function usePhoneScale() {
  const instance = getCurrentInstance();
  // 缩放比例，默认不缩放为 1
  const scale = shallowRef(1);
  // 设计稿宽度对应的物理像素 (px)，rpx 转换而来
  const designWidthPx = shallowRef(DESIGN_WIDTH_RPX / 2);
  // 设计稿高度对应的物理像素 (px)，rpx 转换而来
  const designHeightPx = shallowRef(DESIGN_HEIGHT_RPX / 2);

  // 外层包裹器（Scaler）的样式，其尺寸为：实际物理尺寸 * 缩放比例
  // 用以在布局中占位，避免绝对定位缩放后周围元素重叠
  const scalerStyle = computed<CSSProperties>(() => ({
    position: 'relative',
    width: `${designWidthPx.value * scale.value}px`,
    height: `${designHeightPx.value * scale.value}px`,
  }));

  // 内部手机模拟容器的样式，使用绝对定位与 transform scale 进行缩放
  const phoneStyle = computed<CSSProperties>(() => ({
    position: 'absolute',
    top: '0',
    left: '0',
    width: `${designWidthPx.value}px`,
    height: `${designHeightPx.value}px`,
    transform: `scale(${scale.value})`,
    transformOrigin: 'top left',
  }));

  /**
   * 测量并重新计算尺寸和缩放比例
   */
  function measure() {
    // 将设计稿的 rpx 单位转换为当前设备实际的 px 物理像素
    designWidthPx.value = uni.upx2px(DESIGN_WIDTH_RPX);
    designHeightPx.value = uni.upx2px(DESIGN_HEIGHT_RPX);

    const proxy = instance?.proxy;
    if (!proxy) return;
    
    // 获取舞台容器 `.animal-phone-stage` 的宽度，计算实际缩放比例
    uni
      .createSelectorQuery()
      .in(proxy)
      .select('.animal-phone-stage')
      .boundingClientRect((rect: MeasuredRect | MeasuredRect[] | null) => {
        const r = Array.isArray(rect) ? rect[0] : rect;
        const width = r?.width;
        if (!width) return;
        scale.value = computePhoneScale(width, designWidthPx.value);
      })
      .exec();
  }

  // 窗口尺寸发生变化时重新计算
  const onResize = () => measure();

  onMounted(() => {
    measure();
    // 监听窗口大小变化（比如平板旋转、浏览器窗口缩放等）
    uni.onWindowResize(onResize);
  });
  
  onBeforeUnmount(() => {
    // 移除窗口变化监听
    uni.offWindowResize(onResize);
  });

  return { scalerStyle, phoneStyle };
}

