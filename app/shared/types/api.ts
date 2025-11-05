export interface APIResponse<T> {
  code: number;
  message: string;
  isSuccess: boolean;
  result: T;
}

export interface CursorPaginationResult {
  page: number;
  size: number;
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
}
