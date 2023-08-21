import React, { useEffect,useState } from 'react';
import StarIcon from '@mui/icons-material/StarBorder';
import { Button,Paper, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { supabase } from "../utility/supabaseClient";

export default function Reports() {
  const router = useRouter();
  const [item,setItem] = useState<number | any>(0);
  const [order,setOrder] = useState<number| any>(0);
  const [client,setClients] = useState<number| any>(0);

  useEffect(() => {
    const fetchItems = async () => {
        const { data:items } = await supabase.from('inventory').select(`*`)
        const { data:orders } = await supabase.from('orders').select(`*`)
        const { data:clients } = await supabase.from('clients').select(`*`)
        setItem(items?.length);
        setOrder(orders?.length);
        setClients(clients?.length);
    }
    fetchItems()
}, [])

  const tiers = [
    {
      title: "Total Properties",
      count: order,
    },
    {
      title: "Total Items",
      count: item,
    },
    {
      title: "Total Clients",
      count: client,
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main" sx={{ mb: 8,mt:4 }}>
        <Grid container spacing={4} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={4}
              md={4}
            >
              <Card sx={{borderRadius:"0.6rem",bgcolor: 'background.paper',}}>
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
              <Paper sx={{p:2,borderRadius:"0.7rem"}}>
                Upcoming Requests
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <Paper sx={{p:2,borderRadius:"0.7rem"}}>
                Clients
              </Paper>
            </Grid>
          <Grid
              item
              xs={12}
              md={12}
            >
              <Paper sx={{p:2,borderRadius:"0.7rem", mb:70}}>
                Recent Transactions
              </Paper>
            </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}