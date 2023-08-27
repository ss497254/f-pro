export interface ResponseType<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
