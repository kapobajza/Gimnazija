import {
  DefaultError,
  dehydrate,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query';

export async function dehydrateQueryOnServer<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TAdditionalData extends Record<string, unknown> = Record<string, unknown>,
>(
  options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    additionalData?: TAdditionalData;
  },
) {
  const { additionalData, ...queryOptions } = options;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryOptions);
  return Response.json({ dehydratedState: dehydrate(queryClient), ...additionalData });
}

export async function dehydrateInfiniteQueryOnServer<
  TQueryFnData,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
  TAdditionalData extends Record<string, unknown> = Record<string, unknown>,
>(
  options: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> & {
    additionalData?: TAdditionalData;
  },
) {
  const { additionalData, ...queryOptions } = options;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(queryOptions);
  return Response.json({ dehydratedState: dehydrate(queryClient), ...additionalData });
}
