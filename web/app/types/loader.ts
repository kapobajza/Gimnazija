import type { Env } from "@/env/env-schema";
import type { getHints } from "@/lib/utils";

import type { ThemeAppearance } from "./theme";

export type RootLoaderData = {
  env: Env;
  theme: ThemeAppearance | undefined;
  requestInfo: { hints: ReturnType<typeof getHints> };
};
