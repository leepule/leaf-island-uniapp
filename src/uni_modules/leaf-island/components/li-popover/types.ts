export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  open?: boolean;
  placement?: PopoverPlacement;
  title?: string;
  trigger?: 'click' | 'manual';
}
