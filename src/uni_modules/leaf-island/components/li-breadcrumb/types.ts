export interface BreadcrumbItem {
  key: string;
  label: string;
  disabled?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
}
