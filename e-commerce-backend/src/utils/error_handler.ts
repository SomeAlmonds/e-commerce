export interface AppError extends Error {
  status_code?: number;
  status?: "fail" | "error";
  is_operational?: boolean;
}

export class AppError extends Error {
  constructor(status_code: number, message: string) {
    super(message);
    this.status_code = status_code;
    this.status = `${status_code}`.startsWith("4") ? "fail" : "error";
    this.is_operational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
