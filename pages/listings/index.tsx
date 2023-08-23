import React, { useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';

import PropertyCard from "../../components/propertyCard";
import { Listing } from "../../types";
import CardTitle from "../../components/addAction";
import fetchData from "../../utility/fetchData"
import Loader from "../../components/loader";
import Fab from "../../components/Fab";


export default function Listing() {
    const collection = "listings"
    const [isLoading, setIsLoading] = useState(true)
    const [listings, setListings] = useState<Listing | any>([])
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    
    useEffect(() => {
        fetchData(collection).then(function (listing) {
            setListings(listing);
            setIsLoading(false)
        });
    }, [])

    if (!listings) {
        return <p>No {collection}s found.</p>
    }
    return (
        <Box sx={{ p: 2 }}>
            {/* {isSmallScreen ? <Fab /> : <CardTitle title={collection} />} */}
            {isLoading ? (<Loader />) : (
                <Grid container spacing={3}>
                    {listings.map((listing: Listing) => (
                        <Grid key={listing.id} item md={4} sm={6}>
                            <PropertyCard property={listing} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}