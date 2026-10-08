export type ImageFit =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

export interface ImageProps {
  src?: string;
  previewUrls?: string[];
  width?: number | string;
  height?: number | string;
  fit?: ImageFit;
  radius?: number | string;
  lazyLoad?: boolean;
  preview?: boolean;
  placeholder?: string;
  errorText?: string;
}
