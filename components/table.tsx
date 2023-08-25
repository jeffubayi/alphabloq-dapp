import React, { useMemo, useEffect } from 'react';
import { DataGrid, GridToolbar, GridRowParams, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import {  Link } from '@mui/material';
import { useLocalStorage } from 'react-use';
import { useRouter } from "next/router";

import { Order } from "../types";
import { renderViewsComponent } from "./viewsChip";
import { timeConverter } from "../utility/formatters";

interface Props {
    rows: Order[];
    loading: boolean;
}

export default function Table(props: Props) {
    const { rows, loading } = props
    const router = useRouter();
    const [paginationModel, setPaginationModel] = useLocalStorage("pagination", {
        pageSize: 5,
        page: 0,
    });

    const columns = useMemo(
        () => [

            {
                field: "RequestCode",
                headerName:"Name",
                flex: 1,
                renderCell: (params: GridRenderCellParams<Order>) => (
                    <Link href="#">{params.row.TrackingCode
                    }</Link>
                ),
            },
            {
                field: "Category",
                headerName:"Amount",
                flex: 1,
            },
            {
                field: "CreatedAt",
                headerName:"Date",
                sort: "desc",
                sortable: true,
                flex: 1,
              
            },
            {
                field: "Status",
                renderCell: (params: GridRenderCellParams<Order>) => (
                    renderViewsComponent(params.row.Status)
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
            onRowClick={onRowClick}
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