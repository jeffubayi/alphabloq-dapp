import { createSlice } from '@reduxjs/toolkit';

export interface ReportState {
    reports: [
        {
            title: "Total Orders",
            count: 100,
        },
        {
            title: "Total Products",
            count: 200,
        },
        {
            title: "Total Clients",
            count: 40,
        },
    ]
}

const initialState: ReportState = {
    reports: [
        {
            title: "Total Orders",
            count: 100,
        },
        {
            title: "Total Products",
            count: 200,
        },
        {
            title: "Total Clients",
            count: 40,
        },
    ]
};

const reportsSlice = createSlice({
    name: 'loginState',
    initialState,
    reducers: {
        setReportsState: (state) => {
            state.reports = [
            {
                title: "Total Orders",
                count: 100,
            },
            {
                title: "Total Products",
                count: 200,
            },
            {
                title: "Total Clients",
                count: 40,
            },
        ]
        },
    },
});

export const { setReportsState } = reportsSlice.actions;

export default reportsSlice.reducer;