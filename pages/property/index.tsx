import React, { useEffect, useState } from 'react';
import { Box, Grid,useMediaQuery } from '@mui/material';
import ItemCard from "../../components/itemCard";
import { Inventory, Item } from "../../types";
import CardTitle from "../../components/addAction";
import { supabase } from "../../utility/supabaseClient";
import Loader from "../../components/loader";
import Fab from "../../components/Fab";

export default function Inventory() {
    const page = "Item"
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState<Inventory | any>([])
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    useEffect(() => {
        const fetchItems = async () => {
            const { data } = await supabase.from('inventory').select(`*`)
            setItems(data)
            setIsLoading(false)
        }

        fetchItems()
    }, [])
    
    if (!items) {
        return <p>No {page}s found.</p>
    }
    return (
        <Box sx={{ p: 2 }}>
            {isSmallScreen ? <Fab /> : <CardTitle title={page} /> }
            {isLoading ? (<Loader />) : (
                <Grid container justifyContent="center" mt={1} spacing={3}>
                    {items.map((item: Item) => (
                        <Grid key={item.id} item>
                            <ItemCard product={item} />
                        </Grid>
                    ))}
                </Grid>
            )}
            {items.length}
        </Box>
    );
}