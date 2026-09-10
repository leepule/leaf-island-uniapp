export interface CodeBlockProps {
  /** 代码文本；超过 20,000 字符时展示原文但跳过语法高亮 */
  code: string;
  /** 可选标题 */
  title?: string;
}
