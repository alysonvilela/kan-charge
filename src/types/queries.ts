export interface PaginatedParams {
  page: number;
  pageSize: number;
}

export interface PaginatedParamsData<T> {
  data: T[];
  total: number;
}
