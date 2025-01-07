import { Env } from '@/env/env-schema';
import { isBrowser } from '@/lib/utils';

export function getEnv(): Env {
  if (isBrowser()) {
    return (window as Window).ENV;
  }

  return process.env as unknown as Env;
}

export function getEnvKey(key: keyof Env) {
  return getEnv()[key];
}
