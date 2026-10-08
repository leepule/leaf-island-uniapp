export interface UploadFile {
  name: string;
  path: string;
  url: string;
  status: 'ready' | 'uploading' | 'done' | 'error';
  progress?: number;
}

export interface UploadProps {
  modelValue?: UploadFile[];
  action?: string;
  name?: string;
  maxCount?: number;
  disabled?: boolean;
}
