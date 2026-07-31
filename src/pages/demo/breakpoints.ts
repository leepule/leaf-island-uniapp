/**
 * Responsive column count for the demo landing grid.
 *
 * Pure function so the breakpoint logic is a single source of truth and
 * unit-testable without probing the runtime viewport (see 发现 30).
 * Width is taken cross-platform from `uni.getSystemInfoSync().windowWidth`.
 */
export function colsForWidth(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 480) return 2;
  return 1;
}
