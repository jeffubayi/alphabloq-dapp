import Head from "next/head";
import React, { useEffect, useState } from "react";
import WalletIcon from '@mui/icons-material/Wallet';

import { useGetJokesQuery } from "../../redux/hooks";
import DataGrid from "../../components/table";
import { Order } from "../../types";
import CardTitle from "../../components/addAction";
import { Container, useMediaQuery } from '@mui/material';
import { supabase } from "../../utility/supabaseClient";
import Fab from "../../components/Fab";

export default function Orders() {
  const page = "Transaction"
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order | any>([])
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const { data } = useGetJokesQuery();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from('wallet').select(`*`);
      setOrders(data)
      setIsLoading(false)
    }

    fetchOrders()
  }, [])

  if (!orders) {
    return <p>No {page}s found.</p>
  }

  return (
    <Container maxWidth="md" component="main" sx={{ p: 2, pb: 40 }}>
      {isSmallScreen ? <Fab /> : <CardTitle title='Connect Wallet' icon={<WalletIcon />} collection="All Wallet Transactions" />}
      <DataGrid
        rows={orders ?? []}
        loading={isLoading}
      />
    </Container>
  );
}