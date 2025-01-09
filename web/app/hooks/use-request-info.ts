import { useRouteLoaderData } from 'react-router';
import { RootLoaderData } from '@/types/loader';

export function useRequestInfo() {
  const data = useRouteLoaderData<RootLoaderData>('root');

  if (!data) {
    throw new Error('No data found');
  }

  return data.requestInfo;
}
