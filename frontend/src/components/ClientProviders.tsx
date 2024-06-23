'use client';

// компонент cоздан для того что бы можно было использовать react query

import { type ReactNode } from 'react';
import ReactQueryProvider from '../context/ReactQueryProvider';
import StoreProvaider from '../redux/StoreProvaider';
import type React from 'react';

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => (
  <ReactQueryProvider>
    <StoreProvaider>{children}</StoreProvaider>
  </ReactQueryProvider>
);

export default ClientProviders;
