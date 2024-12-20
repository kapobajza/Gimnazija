import { Env } from '@/env/env-schema';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    ENV: Env;
  }
}

export {};
