import '@/tailwind.css';

import { envSchema } from '@/env/env-schema';
import { useDehydratedState } from '@/hooks/use-dehydrated-state';
import { ThemeProvider } from '@/providers/theme-provider';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Links, LinksFunction, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router';
import type { Route } from './+types/root';
import { ClientHintCheck } from './components/client-hint-check';
import GlobalProgressIndicator from './components/global-progress-indicator';
import RouteError from './components/route-error';
import { getThemeCookie } from './lib/cookie.server';
import { getHints } from './lib/utils';
import { RootLoaderData } from './types/loader';
import { ThemeAppearance } from './types/theme';

export const links: LinksFunction = () => [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/favicon/site.webmanifest',
  },
];

export function loader({ request }: Route.LoaderArgs) {
  const publicEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('PUBLIC_GMNZ_')));
  const env = envSchema.parse(publicEnv);
  const theme = getThemeCookie(request);

  return Response.json({
    env,
    theme,
    requestInfo: {
      hints: getHints(request),
    },
  } satisfies RootLoaderData);
}

function Document({ children, env, theme, head }: { children: ReactNode; head?: ReactNode } & Partial<RootLoaderData>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  const dehydratedState = useDehydratedState();

  return (
    <html lang="ba" className={theme}>
      <head>
        <ClientHintCheck />
        {head}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-slate-850 dark:text-slate-400">
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <ThemeProvider>
              <GlobalProgressIndicator />
              {children}
              <ScrollRestoration />
              <Scripts />
            </ThemeProvider>
          </HydrationBoundary>
        </QueryClientProvider>
        {env ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(env)}`,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<RootLoaderData | undefined>();

  return (
    <Document env={data?.env} theme={data?.theme ?? data?.requestInfo.hints.theme}>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  return (
    <Document
      head={
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const cookieTheme = document.cookie
            .split('; ')
            .find((row) => row.startsWith('theme='))
            ?.split('=')[1]

            if (cookieTheme) {
              document.documentElement.classList.add(cookieTheme === '${ThemeAppearance.Dark}' ? '${ThemeAppearance.Dark}' : '${ThemeAppearance.Light}');
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.classList.add('${ThemeAppearance.Dark}');
            }
          `,
          }}
        />
      }
    >
      <RouteError />
    </Document>
  );
}
