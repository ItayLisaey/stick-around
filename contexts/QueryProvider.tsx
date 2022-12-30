import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PropsWithChildren } from 'react';

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
