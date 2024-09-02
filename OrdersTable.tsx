import { useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  // IconButton,
  // Tooltip,
} from '@mui/material';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import ResetButton from './ResetButton';

const urlGet: string = "http://localhost:5165/api/sessions/get-all-session";

const requestOptions: RequestInit = {
  method: 'GET',
};

const statusMapping = [
  { status: "DONE", hebrewStatus: "ממתין לתשלום" },
  { status: "TERMINATED", hebrewStatus: "הופסק" },
  { status: "RESET", hebrewStatus: "בוצע איפוס" },
  { status: "CANCELLED", hebrewStatus: "ביטול לקוח" },
  { status: "IN_PROGRESS", hebrewStatus: "בתהליך" },
  { status: "MANUAL_CLOSED", hebrewStatus: "נסגר ידנית" },
  { status: "OVERRIDED", hebrewStatus: "נעקף" },
  { status: "REMOVE", hebrewStatus: "הוסר" },
  { status: "STARTED", hebrewStatus: "התחיל" }
];

interface OrdersTableProps {
  
}
const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  useEffect(() => {}, [props]);

  function useGetDict() {
    return useQuery<any[]>({
      queryKey: ['ERRS'],
      queryFn: async () => {
        const urlFinal: string = urlGet;
        console.log("url Final:" + urlFinal);
        const response: Response = await fetch(urlFinal, requestOptions);
        const json: any = await response.json();
        console.log("Hey Json:");
        console.log(json);
        return json;
      },
      staleTime: 0,
      refetchOnWindowFocus: true,
    });
  }

  

  const columns = useMemo(() => [
    {
      accessorKey: 'created',
      header: 'Creative Time',
      enableEditing: false,
      size: 280,
      Cell: ({ cell }: { cell: any }) => (
        <Box>
          {cell.getValue()}
          {cell.row.original.Entries}
          {console.log(cell)}
        </Box>
      )
    },
    {
      accessorKey: 'cuR_STEP',
      header: 'Change Time',
      enableEditing: false,
      size: 280,
      Cell: ({ cell }: { cell: any }) => (
        <Box>
          {cell.getValue()}
          {cell.row.original.Entries}
          {console.log(cell)}
        </Box>
      )
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      enableEditing: false,
      size: 280,
      Cell: ({ cell }: { cell: any }) => (          
        <Box> 
          {
            (() => {
              const statusValue = cell.getValue();
              const statusMappingItem = statusMapping.find(mapping => mapping.status === statusValue);
              return statusMappingItem ? statusMappingItem.hebrewStatus : "Unknown";
            })()
          }
        </Box>
  )
    },
    {
      accessorKey: 'maiN_WAID',
      header: 'PHONE',
      enableEditing: false,
      size: 280,
      Cell: ({ cell }: { cell: any }) => (
        <Box>
          {cell.getValue()}
          {cell.row.original.Entries}
          {console.log(cell)}
        </Box>
      )
    },
    {
      accessorKey: 'cusT_NAME',
      header: 'Customer Name',
      enableEditing: false,
      size: 280,
      Cell: ({ cell }: { cell: any }) => (
        <Box>
          {cell.getValue()}
          {cell.row.original.Entries}
          {console.log(cell)}
        </Box>
      )
    },
    {
      accessorKey: 'streeT_ADDR',
      header: 'Address',
      enableEditing: false,
      size: 280,
      Cell: ({ cell }: { cell: any }) => (
        <Box>
          {cell.getValue()}
          {cell.row.original.Entries}
          {console.log(cell)}
        </Box>
      )
    },
    {
      accessorKey: 'cuR_STEP',
      header: 'Position in Conversation',
      filterVariant: 'multi-select',
      size: 150,
    },
  ], []);

  const {
    data: fetchedDicts = [],
    isError: isLoadingDictsError,
    isFetching: isFetchingDicts,
    isLoading: isLoadingDicts,
    refetch: refetchErrs
  } = useGetDict();

  const table = useMaterialReactTable({
    enableDensityToggle: false,
    enableFacetedValues: true,
    enableFullScreenToggle: false,
    enableExpanding: true,
    enableExpandAll: false,
    columns,
    data: fetchedDicts,
    initialState: { columnVisibility: { id: false }, density: 'compact' },
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    positionActionsColumn: 'last',
    enableEditing: false,
    getRowId: (row: any) => row.id,
    muiToolbarAlertBannerProps: isLoadingDictsError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    renderDetailPanel: ({ row }) => ( 
      <Box>
      <h1>Order information bot</h1>
      <p>Order Number: {row.original.ordeR_NUM}</p>
      <p>Customer Name: {row.original.cusT_NAME}</p>
      <p>Location in conversation: {row.original.cuR_STEP}</p>
      <p>Phone: {row.original.maiN_WAID}</p>
      <p>Order amount: {row.original.total}</p>
      <p>Status: {row.original.status}</p>

      <h1>Credit debit details</h1>
      <p>Month: {}</p>
      <p>Year: {}</p>
      <p>4Digits: {}</p>
      <p>ID: {}</p>
      <p>Payments:{}</p>
      <p>Interface message: {}</p>
      <p>Message code:{}</p>
      <p>Confirmation number: {}</p>

      <h1>Management</h1>
      <p>Caller ID: {row.original.session} </p>
      <p>Token: {} </p>
        {/* Buttons */}
        <Box mt={2} display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(`https://www.pikel-it.com/wapp/cc/ChargeToken.php?Session=${row.original.session}&Token=${row.original.Token}&Month=${row.original.month}&Year=${row.original.year}&TZ=${row.original.ID}&Payments=${row.original.payments}&Sum=${row.original.total}&WAID=${row.original.maiN_WAID}&Appr=${row.original.confirmation_number}&PayMethod=${row.original.payment_method}`, '_blank')}

            // onClick={() => window.open(`https://www.pikel-it.com/wapp/cc/ChargeToken.php?Session=${row.original.session}&Token=${row.original.token}&Month=${row.original.month}&Year=${row.original.year}&TZ=${row.original.address}&Payments=${row.original.payments}&Sum=${row.original.total}&WAID=${row.original.maiN_WAID}&Appr=${row.original.confirmation_number}&PayMethod=${row.original.payment_method}`, '_blank')}
          >
            Make a Payment
          </Button>
            <ResetButton sessionId={row.original.session} />
          <Button
            variant="contained"
            color="info"
            onClick={() => window.open(`https://13.69.172.143:3333/GetCart?Session=${row.original.session}`, '_blank')}
          >
            View Cart Contents
          </Button>
        </Box>
      </Box>
      
  
    )
  });

  return <MaterialReactTable table={table} />


};

export default OrdersTable;