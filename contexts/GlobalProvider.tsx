import { FC, ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';

export interface GlobalProviderProps {
  children?: ReactNode;
}

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => (
  <QueryProvider>{children}</QueryProvider>
);
