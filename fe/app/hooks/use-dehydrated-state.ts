import { UIMatch, useMatches } from '@remix-run/react';
import { DehydratedState } from '@tanstack/react-query';
import merge from 'deepmerge';

export function useDehydratedState(): DehydratedState | undefined {
  const matches = useMatches() as UIMatch<{ dehydratedState: unknown } | undefined>[];

  const dehydratedState = matches.map((match) => match.data?.dehydratedState).filter(Boolean);

  return dehydratedState.length
    ? dehydratedState.reduce<DehydratedState>(
        (accumulator, currentValue) => merge(accumulator, currentValue as DehydratedState),
        {
          mutations: [],
          queries: [],
        },
      )
    : undefined;
}
