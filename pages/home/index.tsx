import React, { useEffect, useState } from 'react';
import { Paper, Card, CardHeader, Container, Grid } from '@mui/material';

import PropertyList from "../../components/propertyList"
import WalletList from '../../components/walletList'
import fetchData from "../../utility/fetchData"
import TransactionChart from '../../components/chart';
import TransactionPieChart from '../../components/pieChart'
import { Listing } from "../../types";

export default function Reports() {
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
      title: "Total Agents",
      count: client?.length,
    },
    {
      title: "Wallet Balance",
      count: order?.length,
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
            <Paper sx={{ borderRadius: "0.6rem" }}>
              <PropertyList />
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper sx={{ borderRadius: "0.6rem" }}>
              <WalletList
              />
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
          >
            <Paper sx={{ p: 2, borderRadius: "0.6rem", mb: 5 }}>
              <TransactionChart />
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
          >
            <Paper sx={{ p: 2, borderRadius: "0.6rem", mb: 5 }}>
              <TransactionPieChart />
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}