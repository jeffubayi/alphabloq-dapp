import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/StarBorder';
import { Button, Paper, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { useRouter } from "next/router";
import PropertyList from "../../components/propertyList"
import fetchData from "../../utility/fetchData"
import { Listing } from "../../types";
import { supabase } from "../../utility/supabaseClient";

export default function Reports() {
  const router = useRouter();
  const [item, setItem] = useState<number | any>([]);
  const [listings, setListings] = useState<Listing | any>([])
  const [order, setOrder] = useState<number | any>(0);
  const [client, setClients] = useState<number | any>([]);

  useEffect(() => {
    fetchData('listings').then(function (listing) {
      setListings(listing);
    });
    fetchData('orders').then(function (listing) {
      setOrder(listing);
    });
    fetchData('clients').then(function (listing) {
      setClients(listing);
    });
  }, [])

  const tiers = [
    {
      title: "Total Listings",
      count: listings?.length,
    },
    {
      title: "Total Sellers",
      count: order?.length,
    },
    {
      title: "Wallet Balance",
      count: client?.length,
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main" sx={{ mb: 8, mt: 4 }}>
        <Grid container spacing={4} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={4}
              md={4}
            >
              <Card sx={{ borderRadius: "0.6rem", bgcolor: 'background.paper', }}>
                <CardHeader
                  title={tier.count}
                  subheader={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                />
              </Card>
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            md={8}
          >
            <Paper sx={{ p: 2, borderRadius: "0.7rem" }}>
              Recent Listings
              <PropertyList property={listings}/>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper sx={{ p: 2, borderRadius: "0.7rem" }}>
              Chats
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <Paper sx={{ p: 2, borderRadius: "0.7rem", mb: 70 }}>
              Wallet Transactions
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}