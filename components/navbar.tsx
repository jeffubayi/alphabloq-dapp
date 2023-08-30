
import * as React from 'react';
import { useRouter } from "next/router";
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useMediaQuery, IconButton, Button, AppBar, Avatar, Box, CssBaseline, Divider, GlobalStyles, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image'
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WalletIcon from '@mui/icons-material/Wallet';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { supabase } from "../utility/supabaseClient";
import { toggleColorMode } from '../redux/themeSlice';
import { clearUserProfile } from '../redux/userProfileSlice'
import { setLoginState } from '../redux/loginSlice'
import { RootState } from "../redux/types";
import LoginDialog from "./loginDialog";


export default function Navbar() {
    const session = useSession();
    const router = useRouter();
    const theme = useTheme();
    const user = useUser();
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const userProfile = useSelector((state: RootState) => state.userProfile);
    const { isLoggedIn } = useSelector((state: RootState) => state.isLoggedIn);
    const supabaseClient = useSupabaseClient()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const currentRoute: string = router.pathname;
    const [account, setAccount] = React.useState<any>();

    React.useEffect(() => {
        const fetchOrders = async () => {
            const { data } = await supabase.from('profiles').select(`account`).eq('id', user?.id).single();
            setAccount(data?.account)

        }

        fetchOrders()
    }, [user?.id])


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        router.push(`/login`)
        supabaseClient.auth.signOut()
        dispatch(clearUserProfile())
    };

    const handleDarkModeToggle = () => {
        dispatch(toggleColorMode());
    };

    const navItems = [
        { url: "/home", title: "Home", icon: <HomeIcon /> },
        { url: "/property", title: "Listings", icon: <LocationCityIcon /> },
        { url: "/wallet", title: "Wallet", icon: <WalletIcon /> },
        { url: "/chat", title: "Chat", icon: <MarkChatUnreadIcon /> },
    ]

    return (
        <React.Fragment>
            <AppBar
                position={"fixed"}
                color="inherit"
                elevation={0}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>

                    <Image src={theme.palette.mode === 'dark' ? "/alpha-dark.png" : "/alpha.png"} alt="logo" width={100} height={30} quality={97} />
                    {/* <Avatar src="alpha.png" sx={{ width: "6rem", height: "3rem",mr:1 }} /> */}
                    <Typography variant="subtitle1" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        {/* AlphabloQ */}
                    </Typography>
                    {session && !isSmallScreen && currentRoute !== "/" && (
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <MenuItem onClick={() => router.push("/home")} sx={{ color: currentRoute === "/home" ? "text.primary" : "text.secondary" }}>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" sx={{ fill: currentRoute === "/home" ? "#0AE8E7" : "text.secondary" }} />
                                </ListItemIcon>
                                Home
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/listings")} sx={{ color: currentRoute === "/listings" ?"text.primary" : "text.secondary"  }} >
                                <ListItemIcon>
                                    <LocationCityIcon fontSize="small" sx={{ fill: currentRoute === "/listings" ? "#0AE8E7" : "text.secondary" }} />
                                </ListItemIcon>
                                Listings
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/wallet")} sx={{ color: currentRoute === "/wallet" ? "text.primary" : "text.secondary"  }}>
                                <ListItemIcon>
                                    <WalletIcon fontSize="small" sx={{ fill: currentRoute === "/wallet" ? "#0AE8E7" : "text.secondary" }} />
                                </ListItemIcon>
                                Wallet
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/agents")} sx={{ color: currentRoute === "/agents" ? "text.primary" : "text.secondary"  }}>
                                <ListItemIcon>
                                    <MarkChatUnreadIcon fontSize="small" sx={{ fill: currentRoute === "/agents" ? "#0AE8E7" : "text.secondary" }} />
                                </ListItemIcon>
                               Agents
                            </MenuItem>
                        </Box>
                    )}
                    <div>
                        <Tooltip title="Toggle theme">
                            <IconButton onClick={handleDarkModeToggle} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon color="primary" /> : <Brightness4Icon />}
                            </IconButton>
                        </Tooltip>
                        {!session ? (<Button onClick={handleLogout} variant="contained" size="small" sx={{ my: 1, mx: 1.5, borderRadius: "0.5rem", px: 4 }}>
                            Login
                        </Button>) : (
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 1 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={user?.user_metadata?.avatar_url || "logo.png"} sx={{ width: 32, height: 32 }} />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <Avatar sx={{ bgcolor: "#323952", color: "#B5CDF5", height: '4rem', width: "4rem" }} alt={session?.user?.email} src={user?.user_metadata?.avatar_url || ""} />
                                    <ListItemText primary={session?.user?.email || "Not signed in"} secondary={account || "Signed In"} />
                                </ListItem>
                            </List>
                            <Divider />

                            <MenuItem onClick={() => router.push("/settings")}>
                                <ListItemIcon>
                                    <Settings fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Account
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/")}>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" color="secondary" />
                                </ListItemIcon>
                                Wallet
                            </MenuItem>

                            <MenuItem onClick={handleLogout}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    onClick={handleLogout}
                                    size="small"
                                    sx={{ borderRadius: "0.4rem" }}
                                >
                                    Logout
                                </Button>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}