import type { ActionFunction } from "react-router";

import { createThemeCookie } from "@/lib/cookie.server";
import { getHints } from "@/lib/utils";
import { ThemeAppearance } from "@/types/theme";

export const action: ActionFunction = async ({ request }) => {
  const hints = getHints(request);
  let value = (await request.formData()).get("theme");

  if (!value) {
    value =
      hints.theme === ThemeAppearance.Dark
        ? ThemeAppearance.Light
        : ThemeAppearance.Dark;
  }

  return Response.json(
    { theme: value },
    {
      headers: {
        "Set-Cookie": createThemeCookie(value as ThemeAppearance),
      },
    },
  );
};
