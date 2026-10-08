export interface BacktopProps {
  /** Threshold in pixels before the control appears. */
  visibilityHeight?: number;
  /** Current page scroll position; pass this from onPageScroll on mini-program pages. */
  scrollTop?: number;
  duration?: number;
  right?: string;
  bottom?: string;
  text?: string;
  showText?: boolean;
}
