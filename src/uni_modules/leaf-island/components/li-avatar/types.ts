export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: number | string;
  shape?: AvatarShape;
}
