import OrdersTable from './OrdersTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC } from 'react';

const queryClient: QueryClient = new QueryClient();

const OrdersData: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>      
      <OrdersTable />
    </QueryClientProvider>
  );
}

export default OrdersData;