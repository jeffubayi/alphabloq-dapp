import React, { useState, useEffect } from 'react';
import { Container, List, useMediaQuery } from '@mui/material';

import ClientList from "../../components/customerList"
import CardTitle from "../../components/addAction";
import { supabase } from "../../utility/supabaseClient";
import Loader from "../../components/loader";
import Fab from "../../components/Fab";
import { Customers, Client } from "../../types";

export default  function Clients() {
    const page = "Agent"
    const [isLoading, setIsLoading] = useState(true)
    const [clients, setClients] = useState<Customers | any>([])
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    useEffect(() => {
        const fetchClients = async () => {
            const { data } = await supabase.from('clients').select(`*`);
            setClients(data)
            setIsLoading(false)
        }

        fetchClients()
    }, [])

    if (!clients) {
        return <p>No {page}s found.</p>
    }
    return (
        <Container maxWidth="md" component="main"sx={{ py: 6,px:2 }}>
            {isSmallScreen && <Fab />  }
            {isLoading ? (<Loader />) : (
                <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "0.7rem" }}>
                    {clients.map((client: Client) => (
                        <div key={client.id} >
                            <ClientList customer={client} />
                        </div>
                    ))}
                </List>
            )}

        </Container>
    );
}
