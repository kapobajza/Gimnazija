import { createThemeCookie, getThemeCookie } from '@/lib/cookie.server';
import { getHints } from '@/lib/utils';
import { ThemeAppearance } from '@/types/theme';
import { ActionFunction } from 'react-router';

export const action: ActionFunction = ({ request }) => {
  const theme = getThemeCookie(request);
  const hints = getHints(request);
  let newTheme: ThemeAppearance;

  if (!theme) {
    newTheme = hints.theme === ThemeAppearance.Dark ? ThemeAppearance.Light : ThemeAppearance.Dark;
  } else {
    newTheme = theme === ThemeAppearance.Dark ? ThemeAppearance.Light : ThemeAppearance.Dark;
  }

  return Response.json(
    { theme: newTheme },
    {
      headers: {
        'Set-Cookie': createThemeCookie(newTheme),
      },
    },
  );
};
