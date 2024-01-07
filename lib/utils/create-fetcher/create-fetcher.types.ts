export type BaseRequestConfig = Pick<RequestInit, "headers"> & {
  /**
   * The base URL of the endpoint used by the fetcher instance.
   */
  baseURL: string;

  /**
   * The default request timeout in milliseconds.
   */
  timeout?: number;

  /**
   * The default error message to display when response.ok resolves to false.
   */
  defaultErrorMessage?: string;

  /**
   * Intercept the response and perform some action before it is returned.
   */
  onResponseSuccess?: (response: Response) => Promise<void> | void;
  onResponseError?: (response: Response) => Promise<void> | void;
};

export type AbegErrorResponse<TErrorResponse = Record<string, unknown>> = {
  status: "Error";
  message: string;
  error?: TErrorResponse;
};
export type AbegSuccessResponse<TDataResponse> = {
  status: "success";
  data: TDataResponse | null;
  message: string;
};

export type AbegResponseData<TData, TError = Record<string, string[]>> =
  | {
      data: AbegSuccessResponse<TData>;
      error: null;
    }
  | {
      data: null;
      error: AbegErrorResponse<TError>;
    };
