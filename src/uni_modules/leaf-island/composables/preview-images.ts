/** Open the platform image viewer with a normalized image list and selection. */
export function previewImages(urls: string[], current: number | string = 0): boolean {
  const available = urls
    .map((url, index) => ({ url, index }))
    .filter((entry) => Boolean(entry.url));
  if (!available.length) return false;

  const requestedIndex = typeof current === 'number'
    ? current
    : urls.findIndex((url) => url === current);
  const currentIndex = Math.max(0, available.findIndex((entry) => entry.index === requestedIndex));
  uni.previewImage({
    current: currentIndex,
    urls: available.map((entry) => entry.url),
  });
  return true;
}
