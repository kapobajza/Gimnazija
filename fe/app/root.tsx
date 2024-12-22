import '@/tailwind.css';

import { Env, envSchema } from '@/env/env-schema';
import { useDehydratedState } from '@/hooks/use-dehydrated-state';
import { ThemeProvider } from '@/providers/theme-provider';
import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import DefaultError from './components/default-error';
import { QUERY_CLIENT } from './lib/utils';

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

export function loader() {
  const publicEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('PUBLIC_GMNZ_')));
  const env = envSchema.parse(publicEnv);
  return Response.json({
    ENV: env,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<{ ENV: Env } | undefined>();
  const [queryClient] = useState(() => QUERY_CLIENT);
  const dehydratedState = useDehydratedState();

  return (
    <html lang="ba">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              const theme = localStorage.getItem('theme') ?? 'light';

              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
              } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
              }
            })();`,
          }}
        />
      </head>
      <body className="dark:bg-slate-850 dark:text-slate-400">
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <ThemeProvider>
              {children}
              <ScrollRestoration />
              <Scripts />
            </ThemeProvider>
          </HydrationBoundary>
        </QueryClientProvider>
        {data?.ENV ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <DefaultError subtitle="Stranica koju ste tražili je premještena, izbrisana ili nije nikad ni postojala." />;
}
