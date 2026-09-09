const iconFiles = import.meta.glob('/node_modules/lucide-static/icons/*.svg', {
  query: '?raw',
  import: 'default',
}) as Record<string, unknown>;

function iconNameFromFile(file: string) {
  return file.split('/').pop()?.replace(/\.svg$/, '') ?? '';
}

export const ICON_NAMES = Object.keys(iconFiles)
  .map(iconNameFromFile)
  .filter(Boolean)
  .sort();

export const ICON_LIST: { name: string; label: string }[] = ICON_NAMES.map((name) => ({
  name: `icon-${name}`,
  label: name,
}));
