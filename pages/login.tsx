import Head from 'next/head';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CssBaseline, Grid, Box, Paper, Typography, Avatar } from '@mui/material';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import Image from 'next/image'

export default function SignIn() {
    const supabase = useSupabaseClient()
    const theme = useTheme()

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Head>
                <title>Login | AlphabloQ</title>
            </Head>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={4}>
                <Box
                    sx={{
                        my: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                    }}
                >
                    <Image src={theme.palette.mode === 'dark' ? "/alpha-dark.png":"/alpha.png"} alt="logo" width={140} height={40} quality={97} />
                    {/* <Typography component="h5" variant="h5">
                        Welcome back
                    </Typography> */}
                </Box>

                <Box sx={{ mx: 6 }}>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#9369E8',
                                        brandAccent: '#9369E8',
                                    },
                                },
                            },
                        }}
                        magicLink
                        providers={['google', 'facebook']}
                        redirectTo="/"
                        theme={theme.palette.mode}
                    />
                </Box>
            </Grid>
            <Grid item xs={false} sm={4} md={8}
                sx={{
                    backgroundImage: 'url(https://alphabloq.io/img/9.8d569c0f.jpg)',
                    backgroundRepeat: 'repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    );
}