const COLORS = {
  comment: '#6b5e50',
  string: '#a8d4a0',
  keyword: '#d4a0e0',
  react: '#e06c75',
  component: '#80c0e0',
  func: '#61afef',
  prop: '#e8c87a',
  jsx: '#f0a870',
  operator: '#d4b896',
  number: '#a8d4a0',
  default: '#e8d5bc',
} as const;

const MAX_HIGHLIGHT_LENGTH = 20_000;

const HIGHLIGHT_RULES = [
  { pattern: /\/\*[\s\S]*?\*\//, color: COLORS.comment },
  { pattern: /\/\/.*$/, color: COLORS.comment },
  { pattern: /`[^`]*`/, color: COLORS.string },
  { pattern: /"[^"]*"/, color: COLORS.string },
  { pattern: /'[^']*'/, color: COLORS.string },
  { pattern: /<\/?[A-Z][\w.$]*/, color: COLORS.jsx },
  { pattern: /<\/?[a-z][\w-]*/, color: COLORS.jsx },
  { pattern: /\/?>/, color: COLORS.jsx },
  {
    pattern:
      /\b(?:React|useState|useEffect|useCallback|useMemo|useRef|useContext|useReducer|useLayoutEffect|useImperativeHandle|useDebugValue|createContext|createElement|cloneElement|Fragment|Suspense|lazy|memo|forwardRef|useId|FC|ReactNode|ReactElement|CSSProperties|ref|reactive|computed|watch|defineComponent|defineProps|defineEmits|onMounted|onBeforeUnmount)\b/,
    color: COLORS.react,
  },
  { pattern: /\b(?:true|false)\b/, color: COLORS.keyword },
  {
    pattern:
      /\b(?:[Nn][Uu][Ll][Ll]|[Uu][Nn][Dd][Ee][Ff][Ii][Nn][Ee][Dd]|[Vv][Oo][Ii][Dd]|[Nn][Aa][Nn]|[Ii][Nn][Ff][Ii][Nn][Ii][Tt][Yy])\b/,
    color: COLORS.keyword,
  },
  { pattern: /\b\d+\.?\d*\b/, color: COLORS.number },
  {
    pattern:
      /\b(?:import|from|as|export|default|const|let|var|function|return|if|else|for|while|switch|case|break|continue|try|catch|throw|finally|new|typeof|instanceof|async|await|type|interface)\b/,
    color: COLORS.keyword,
  },
  { pattern: /\b[A-Z][a-zA-Z0-9_$]*\b/, color: COLORS.component },
  { pattern: /\b[a-z][a-zA-Z0-9_$]*\s*(?=\()/, color: COLORS.func },
  { pattern: /\b[a-zA-Z_$][\w$]*\s*(?==)/, color: COLORS.prop },
  { pattern: />|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~?:]/, color: COLORS.operator },
  { pattern: /[{}[\]();,]/, color: COLORS.operator },
] as const;

const TOKEN_PATTERN = new RegExp(HIGHLIGHT_RULES.map((rule) => `(${rule.pattern.source})`).join('|'), 'gm');

export interface HighlightSegment {
  text: string;
  color: string;
}

function getMatchColor(match: RegExpExecArray): string {
  for (let index = 0; index < HIGHLIGHT_RULES.length; index += 1) {
    if (match[index + 1] !== undefined) return HIGHLIGHT_RULES[index].color;
  }
  throw new Error('[AiCodeBlock] 无法确定高亮规则');
}

export function highlightCode(code: string): HighlightSegment[] {
  if (code.length > MAX_HIGHLIGHT_LENGTH) {
    return [{ text: code, color: COLORS.default }];
  }

  const segments: HighlightSegment[] = [];
  let cursor = 0;
  TOKEN_PATTERN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TOKEN_PATTERN.exec(code)) !== null) {
    if (match.index > cursor) {
      segments.push({ text: code.slice(cursor, match.index), color: COLORS.default });
    }
    segments.push({ text: match[0], color: getMatchColor(match) });
    cursor = TOKEN_PATTERN.lastIndex;
  }

  if (cursor < code.length) {
    segments.push({ text: code.slice(cursor), color: COLORS.default });
  }
  return segments;
}
