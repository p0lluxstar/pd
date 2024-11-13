'use client';

// компонент cоздан для того что бы можно было использовать react query

import { type ReactNode } from 'react';
import ReactQueryProvider from '../context/ReactQueryProvider';
import { ThemeProvider } from '../context/ThemeContextProvider';
import StoreProvaider from '../redux/StoreProvaider';
import type React from 'react';

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => (
  <ThemeProvider>
    <ReactQueryProvider>
      <StoreProvaider>{children}</StoreProvaider>
    </ReactQueryProvider>
  </ThemeProvider>
);

export default ClientProviders;
