import React, { useState, useEffect } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useSession, useUser } from '@supabase/auth-helpers-react'
import { TextField, Grid, Button, Box, List, ListItem, Skeleton, ListItemIcon, ListItemText, ListSubheader, Paper, Switch, Tab, Tabs, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";

import Profile from "../components/card";
import InviteList from "../components/account";
import { toggleColorMode } from '../redux/themeSlice';
import { setUserProfile } from '../redux/userProfileSlice'
import { supabase } from "../utility/supabaseClient";

interface RootState {
    darkMode: boolean;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function About() {
    const session = useSession()
    const user = useUser()
    const dispatch = useDispatch();
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [company, setCompany] = useState("")
    const [website, setWebsite] = useState("")
    const [avatar_url, setAvatarUrl] = useState("")
    const isDarkMode = useSelector((state: RootState) => state.darkMode);

    const handleDarkModeToggle = () => {
        dispatch(toggleColorMode());
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true)
                if (!user) throw new Error('No user')

                let { data, error, status } = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url,company`)
                    .eq('id', user.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                    setCompany(data.company)
                    dispatch(setUserProfile(data))
                }
            } catch (error) {
                toast.error('Error loading user data!');
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getProfile()
    }, [user, dispatch])




    async function updateProfile({
        username,
        website,
        avatar_url,
        company,
    }: {
        username: string,
        website: string,
        avatar_url?: string,
        company: string
    }) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                company,
                updated_at: new Date().toISOString(),
            }
            let { data, error } = await supabase.from('profiles').upsert(updates).select()
            console.log(`  data`, data)
            if (error) throw error
            dispatch(setUserProfile(updates))
            toast.success('Profile updated successfully!');

        } catch (error) {
            toast.error('Error updating the data!');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid container spacing={2}>

            <Grid item xs={12} md={4}>
                <Profile
                    onUpload={(event: React.SyntheticEvent, url: string) => {
                        setAvatarUrl(url)
                        updateProfile({ username, website, avatar_url: url, company })
                    }}
                    url={avatar_url}
                    username={company}
                    website={website}
                />
            </Grid>
            <Grid item xs={12} md={8} sx={{mb:60}}>

                <Paper sx={{ width: '100%', px: 2, py: 4, borderRadius: "0.7rem", mt: 2 }} elevation={0} >

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab iconPosition="start" label="Profile" {...a11yProps(0)} />
                            <Tab iconPosition="start" label="Theme" {...a11yProps(1)} />
                            <Tab iconPosition="start" label="Invite" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Paper sx={{ width: '100%', py: 2, px: 1, borderRadius: "1rem" }} elevation={0}>
                            {session ? (
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 5 }}>
                                    <Grid item xs={12} >
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="username"
                                            type="text"
                                            value={username || user?.user_metadata.name}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField fullWidth size="small" label="email" type="text" value={session?.user?.email} disabled />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Location"
                                            type="url"
                                            value={website || ''}
                                            onChange={(e) => setWebsite(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}  >
                                        <TextField select fullWidth size="small" label="Account" type="text" value={company || ''} onChange={(e) => setCompany(e.target.value)} >
                                            <option>Seller</option>
                                            <option>Buyer</option>
                                            </TextField>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Button
                                            fullWidth
                                            size="small"
                                            sx={{ color: `contrastText` }}
                                            variant="contained"
                                            onClick={() => updateProfile({ username, website, avatar_url, company })}
                                            disabled={loading}
                                        >
                                            {loading ? 'Loading ...' : 'Save Changes'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (<Skeleton />)}
                        </Paper>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <List
                            sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', borderRadius: "1rem" }}
                            subheader={<ListSubheader>Theme preferences</ListSubheader>}
                        >
                            <ListItem>
                                <ListItemIcon>
                                    <Brightness4Icon color="primary" />
                                </ListItemIcon>
                                <ListItemText id="switch-list-label-bluetooth" primary="Dark theme" />
                                <Switch
                                    edge="end"
                                    checked={isDarkMode} onChange={handleDarkModeToggle}
                                    inputProps={{
                                        'aria-labelledby': 'switch-list-label-bluetooth',
                                    }}
                                />
                            </ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <InviteList />
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );
}
