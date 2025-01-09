import { hintsUtils } from '@/lib/utils';
import { subscribeToSchemeChange } from '@epic-web/client-hints/color-scheme';
import * as React from 'react';
import { useRevalidator } from 'react-router';

export function ClientHintCheck() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { revalidate } = useRevalidator();

  React.useEffect(
    () =>
      subscribeToSchemeChange(() => {
        void revalidate();
      }),
    [revalidate],
  );

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: hintsUtils.getClientHintCheckScript(),
      }}
    />
  );
}
