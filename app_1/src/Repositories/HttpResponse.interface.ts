export enum RESPONSE_STATUS {
  OK = "OK",
  KO = "KO",
}

export interface ErrorResponse {
  status: RESPONSE_STATUS.KO;
  httpStatus: number;
}

export interface SuccessResponse<T> {
  status: RESPONSE_STATUS.OK;
  httpStatus: number;
  data: T;
}

export type RepositoryResponse<T> = SuccessResponse<T> | ErrorResponse;
