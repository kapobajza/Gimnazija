import { Env } from '@/env/env-schema';
import { ThemeAppearance } from './theme';
import { getHints } from '@/lib/utils';

export type RootLoaderData = {
  env: Env;
  theme: ThemeAppearance | undefined;
  requestInfo: { hints: ReturnType<typeof getHints> };
};
