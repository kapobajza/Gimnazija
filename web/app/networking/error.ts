import { z } from 'zod';

export const appErrorLiteralSchema = z.union([z.literal('unknown'), z.literal('post_not_found')]);

export type AppErrorLiteral = z.infer<typeof appErrorLiteralSchema>;

export const appErrorSchema = z.object({
  code: appErrorLiteralSchema,
});

export type AppError = z.infer<typeof appErrorSchema>;

export const AppErrorCode = {
  UNKNOWN: 'unknown',
  POST_NOT_FOUND: 'post_not_found',
} as const satisfies {
  [key in Uppercase<AppErrorLiteral>]: AppErrorLiteral;
};

export const responseErrorSchema = z.object({
  status: z.number(),
  statusText: z.string(),
});
