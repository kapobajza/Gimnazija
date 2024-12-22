import { z } from 'zod';

export const errorResponseLiteralSchema = z.union([z.literal('unknown'), z.literal('not_found')]);

export type ErrorResponseLiteral = z.infer<typeof errorResponseLiteralSchema>;

export const errorResponseSchema = z.object({
  code: errorResponseLiteralSchema,
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const ErrorResponseCode = {
  UNKNOWN: 'unknown',
  NOT_FOUND: 'not_found',
} as const satisfies {
  [key in Uppercase<ErrorResponseLiteral>]: ErrorResponseLiteral;
};
