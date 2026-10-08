export type DrawerPlacement = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  open?: boolean;
  placement?: DrawerPlacement;
  title?: string;
  size?: number | string;
  maskClosable?: boolean;
}
