import * as React from 'react';
import { Typography, List, Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Property } from "../types"
import Divider from '@mui/material/Divider';

export default function PropertyList(property: Property) {
    console.log(`props`, property)
    return (
        <List sx={{ bgcolor: 'background.paper', p: 2, borderRadius: "0.7rem" }}>
            <Typography>Top Listings</Typography>
            <ListItem
            >
                <ListItemAvatar>
                    <Avatar src="https://alphabloq.vercel.app/_next/image?url=%2Fimages%2Fhotani.jpeg&w=1920&q=75" />
                </ListItemAvatar>
                <ListItemText primary="Hotani" secondary="USD 130,000" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar src="https://alphabloq.vercel.app/_next/image?url=%2Fimages%2Fgerryville.jpeg&w=1920&q=75" />
                </ListItemAvatar>
                <ListItemText primary="GerryVille" secondary="USD 650,000" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar src="https://alphabloq.vercel.app/_next/image?url=%2Fimages%2Fhotani.jpeg&w=1920&q=75" />
                </ListItemAvatar>
                <ListItemText primary="Kileleshwa" secondary="USD 490,000" />
            </ListItem>
        </List>
    );
}
