import { AxiosResponse, AxiosRequestConfig, AxiosError} from "axios";

declare class Error {
  protected static captureStackTrace(error: Error, constructorOpt: any): any;
  public name: string;
  public message: string;
  public stack: string;
  constructor(message?: string);
}

export class ApiError extends Error {
  public code: string;

  constructor(code: string,  ...params: any[]) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Custom debugging information
    this.code = code;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
       Error.captureStackTrace(this, ApiError);
    }
  }
}

// const badCredentialsErrorHandler = (res: AxiosResponse, code: string, message: string) => {}

// const tokenExpiredErrorHandler = (res: AxiosResponse, code: string, message: string) => {}

const defaultApiErrorHandler = (res: AxiosResponse, code: string, message: string): Promise<AxiosResponse<any>> =>  {
  return Promise.reject(new ApiError(code, message));
};

export const responseInterceptor = (res: AxiosResponse): any => {
  if (res.data.data && !res.data.errors) {
    return res.data.data;
  }

  const error = res.data.errors[0];
  const { message, extensions } = error;
  const code = extensions ? extensions.code : "API_ERRORS.GENERIC";

  switch (code) {
    // case "API_ERRORS.BAD_CREDENTIALS": badCredentialsErrorHandler(res, code, message);
    // case "API_ERRORS.TOKEN_EXPIRED": tokenExpiredErrorHandler(res, code, message);
    default: return defaultApiErrorHandler(res, code, message);
  }
};

export const responseErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error.message);
};
