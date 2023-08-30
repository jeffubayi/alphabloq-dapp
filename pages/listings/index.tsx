import React, { useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery,Container } from '@mui/material';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';

import PropertyCard from "../../components/propertyCard";
import { Listing } from "../../types";
import CardTitle from "../../components/addAction";
import fetchData from "../../utility/fetchData"
import Loader from "../../components/cardSkeleton";
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
        <Container maxWidth="md" component="main" sx={{ p: 2 }} >
            {isSmallScreen ? <Fab /> : <CardTitle title="Search listings" collection="All Property Listings" icon={<MarkChatUnreadIcon/>}/>}
            {isLoading ? (<Loader />) : (
                <Grid container spacing={3} sx={{ mb: 6,p:1}}>
                    {listings.map((listing: Listing) => (
                        <Grid key={listing.id} item md={4} sm={12}>
                            <PropertyCard property={listing}  />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}