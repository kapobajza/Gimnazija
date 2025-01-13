import { z } from "zod";

export const appErrorLiteralSchema = z.union([
  z.literal("unknown"),
  z.literal("post_not_found"),
]);

export type AppErrorLiteral = z.infer<typeof appErrorLiteralSchema>;

export const appErrorSchema = z.object({
  code: appErrorLiteralSchema,
});

export type AppErrorSchema = z.infer<typeof appErrorSchema>;

export const AppErrorCode = {
  UNKNOWN: "unknown",
  POST_NOT_FOUND: "post_not_found",
} as const satisfies {
  [key in Uppercase<AppErrorLiteral>]: AppErrorLiteral;
};

export const httpErrorSchema = z.object({
  status: z.number(),
  statusText: z.string(),
});

export type HttpErrorSchema = z.infer<typeof httpErrorSchema>;

export class HttpError extends Error implements HttpErrorSchema {
  status: number;
  statusText: string;

  constructor({
    status,
    statusText,
    message,
  }: HttpErrorSchema & {
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}

export class AppError extends Error implements AppErrorSchema {
  code: AppErrorLiteral;

  constructor({
    code,
    message,
  }: AppErrorSchema & {
    message?: string;
  }) {
    super(message);
    this.code = code;
  }
}
