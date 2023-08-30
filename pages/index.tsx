import * as React from 'react';
import { useRouter } from "next/router";
import Image from 'next/image'
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Button, Dialog, Card, ListItem, ListItemText, DialogContent, DialogTitle, CircularProgress, useMediaQuery, Stack, Box, Link, CardHeader, Container, Grid, Typography } from '@mui/material';

import { supabase } from "../utility/supabaseClient";
import { tiers } from "../utility/enums";
import Copyright from '../components/copyright';


//signup handleMac
//signin skip handleMac to handlelogin
export default function Index() {
  const router = useRouter();
  const user = useUser()
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const session = useSession()

  const [open, setOpen] = React.useState(false);
  const [account, setAccount] = React.useState<any>();
  const [accountSet, setAccountSet] = React.useState<any>();

  React.useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from('profiles').select(`account`).eq('id', user?.id).single();
      setAccount(data)

    }

    fetchOrders()
  }, [user?.id])


  const handleClose = () => {
    setOpen(false);
  };

  // if  session but not account
  const handleLogin = () => {
    setTimeout(() => {
      setOpen(false);
      router.push('/home')
    }, 3000);
  }
  //if session and acc
  const handleSigIn = async () => {
    const { error } = await supabase.from('profiles').update({ account: accountSet }).eq('id', user?.id);
    if (!error && session) { router.push('/home') }
  };

  if (account) { handleLogin() } else {
    handleSigIn()
  }


  return (
    <React.Fragment>
      {session && (
        <Dialog
          open={session && true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ alignItem: "center", textAlign: "center" }}>
            {"Select Account"}
          </DialogTitle>
          <DialogContent>
            {!account ? (
              <Stack direction="row" spacing={2}>
                <Card sx={{ borderRadius: "0.7rem" }} onClick={() => setAccountSet('Client')}>
                  <CardHeader
                    title=" Seller"
                    subheader="Sell your property"
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                  />
                </Card>
                <Card sx={{ borderRadius: "0.7rem" }} onClick={() => setAccountSet('Service Provider')}>
                  <CardHeader
                    title="Buyer"
                    subheader="Buy a property"
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                  />
                </Card>
              </Stack>
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: "center", mb: 2 }}>
                  <CircularProgress size={60} />
                </Box>
                <Typography variant="body2" align="center" color="text.secondary" component="p">
                  Wait a Moment. Setting up account
                </Typography>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
      <Container disableGutters maxWidth="lg" component="main" sx={{ py: 8, px: 2 }}>
        <Grid container spacing={5} >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              component="h1"
              variant={isSmallScreen ? "h5" : "h4"}
              align={isSmallScreen ? "center" : "left"}
              color="text.primary"
              gutterBottom

            >
              The Future of Real Estate <br></br> Investing Simplified
            </Typography>
            <Typography variant="subtitle2" align={isSmallScreen ? "center" : "left"} color="text.secondary" component="p">
              alphabloQ is a real estate investment platform that reduces the entry barrier for real estate investors by enabling investors to purchase a fraction of income-generating properties

            </Typography>

            <div style={{ display: "flex", justifyContent: isSmallScreen ? "center" : "left" }}
            >
              <Button variant="contained" size={isSmallScreen ? "small" : "medium"} sx={{ mt: 4, borderRadius: "0.5rem", px: 4 }}>
                Join our waiting list
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Image src="/hero.png" alt="hero" width={300} height={300} quality={97} />
          </Grid>
        </Grid>
      </Container>
      <Container disableGutters maxWidth="sm" component="main" sx={{ p: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Why Invest with Us
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" component="p">
          We are making real estate investments accessible and profitable for investors like yourself. In a few simple steps, you too can begin building long term wealth and generate passive cash flows monthly
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" >
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              md={3}
            >
              <Card key={tier.title} sx={{ borderRadius: "0.4rem" }}>
                <ListItem >
                  <ListItemText primary={tier.title} secondary={tier.subheader} />
                </ListItem>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        maxWidth="lg"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        {/* <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={4} key={footer.title}>
              <Typography variant="h6" color="text.primary" >
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </React.Fragment>
  );
}