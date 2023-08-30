import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import { Link, Typography } from '@mui/material';
import { useLocalStorage } from 'react-use';
import { useRouter } from "next/router";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { renderViewsComponent } from "./viewsChip";
import { timeConverter } from "../utility/formatters";

interface Props {
    rows: any;
    loading: boolean;
}

export default function Table(props: Props) {
    const { rows, loading } = props
    console.log(`wallet`, rows)
    const router = useRouter();
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination", {
        pageSize: 5,
        page: 0,
    });

    const columns = useMemo(
        () => [

            {
                field: "name",
                headerName: "Name",
                flex: 2,
                renderCell: (params: GridRenderCellParams<any>) => (
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={params.row.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={params.row.name} secondary={params.row.value} />
                    </ListItem>
                ),
            },
            {
                field: "amount",
                headerName: "Amount",
                renderCell: (params: GridRenderCellParams<any>) => (
                    <Typography color="text.secondary">
                        {params.row.amount}
                    </Typography>
                ),
            },
            {
                field: "created_at",
                headerName: "Date",
                sort: "desc",
                sortable: true,
                flex: 1,
                valueGetter: (params: GridValueGetterParams) => {
                    return (
                        
                            timeConverter(params.row.created_at)
                        
                    )
                },

            },
            {
                field: "status",
                headerName: "Status",
                renderCell: (params: GridRenderCellParams<any>) => (
                    renderViewsComponent(params.row.status)
                ),
            },
        ],
        []
    );

    const filterProps = {
        toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        }
    }

    //redirect to edit view
    const onRowClick = (
        params: GridRowParams,
    ) => {
        const { Title, Body, Author, Views, CreatedAt } = params.row
        router.push(
            {
                pathname: "/orders/[id]",
                query: {
                    id: params.id,
                    Title,
                    Body,
                    Author,
                    Views,
                    CreatedAt,
                    method: "Edit",
                },
            },
            `/orders/edit/${params.id}`
        );
    };

    return (
        <DataGrid
            autoHeight
            pagination
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            sortingOrder={['asc', 'desc']}
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            // onRowClick={onRowClick}
            pageSizeOptions={[5, 10]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            slots={{ toolbar: GridToolbar }}
            slotProps={filterProps}
            initialState={{
                sorting: {
                    sortModel: [{ field: 'Views', sort: 'desc' }],
                },
            }}
            sx={{ borderRadius: "1rem", bgcolor: 'background.paper' }}
        />
    );
}