import Head from "next/head";
import React, { useEffect, useState } from "react";

import { useGetJokesQuery } from "../../redux/hooks";
import DataGrid from "../../components/table";
import { Order } from "../../types";
import CardTitle from "../../components/addAction";
import { Box, useMediaQuery } from '@mui/material';
import { supabase } from "../../utility/supabaseClient";
import Fab from "../../components/Fab";

export default function Orders() {
  const page = "Transaction"
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order | any>([])
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const {data} = useGetJokesQuery();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from('orders').select(`*`);
      setOrders(data)
      setIsLoading(false)
    }

    fetchOrders()
  }, [])

  if (!orders) {
    return <p>No {page}s found.</p>
  }

  return (
      <Box sx={{ p: 2,pb:40 }}>
      {isSmallScreen ? <Fab /> : <CardTitle title={page} /> }
        <DataGrid
          rows={orders ?? []}
          loading={isLoading}
        />
      </Box>
  );
}