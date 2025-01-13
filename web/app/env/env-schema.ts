import { z } from "zod";

export const envSchema = z.object({
  PUBLIC_GMNZ_API_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
