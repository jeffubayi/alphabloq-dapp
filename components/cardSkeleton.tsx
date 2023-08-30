/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { Card, useMediaQuery, Skeleton,Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


export default function skeletonCard() {
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    return (
        <Grid container spacing={3} sx={{ mb: 6,p:1}}>
            {[0, 1, 2, 3, 4, 5].map(( index) => (
                <Grid key={index} item md={4} sm={12}>
                    <Card  sx={{ minWidth: isSmallScreen ? 350 : 270, borderRadius: "0.5rem" }} >
                        <Skeleton variant="rectangular" width="100%">
                            <div style={{ paddingTop: '57%' }} />
                        </Skeleton>
                        <CardContent>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </CardContent>
                        <CardActions disableSpacing>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="50%" />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
