export interface APIResponse<T> {
  code: number;
  message: string;
  isSuccess: boolean;
  result: T;
}
