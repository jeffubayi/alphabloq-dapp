import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { supabase } from "../utility/supabaseClient";
import { Listing, Property } from '../types';

export const getListingThunk = createAsyncThunk<Property[], Listing>(
    'listing/getListingThunk',
    async () => {
        try {
            const { data } = await supabase.from(`listings`).select(`*`)
            return data
        } catch (error: any) {
            return error.message;
        }
    },
);

const initialState: Property | any = {
    property: [],
};

const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getListingThunk.pending, (state) => {
            state.property = [];
        });
        builder.addCase(getListingThunk.fulfilled, (state, { payload }) => {
            state.property = payload;
        });
        builder.addCase(getListingThunk.rejected, (state) => {
            state.property = [];
        });
    },
});
export default listingSlice.reducer;