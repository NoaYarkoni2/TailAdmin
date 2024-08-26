import { useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  // Button,
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

const urlGet: string = "http://localhost:5165/api/sessions/get-all-session";

const requestOptions: RequestInit = {
  method: 'GET',
};

interface OrdersTableProps {
  // Define any props that OrdersTable might receive
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
          {cell.getValue()}
          {cell.row.original.Entries}
          {console.log(cell)}
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
      <Box><p>ORDER_NUMBER: {row.original.ordeR_NUM}</p></Box>
    )
  });

  return <MaterialReactTable table={table} />;
};

export default OrdersTable;