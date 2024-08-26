import OrdersTable from './OrdersTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();


function OrdersData() {
  return (
    <QueryClientProvider client={queryClient}>      
      <OrdersTable />
    </QueryClientProvider>
  );
}

export default OrdersData;
