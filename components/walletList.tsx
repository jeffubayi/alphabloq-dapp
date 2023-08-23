import * as React from 'react';
import { Typography, List,Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Add';

export default function WalletList() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', p: 2, borderRadius: "0.7rem" }}>
      <Typography>Wallets</Typography>
      <ListItem
        secondaryAction={
          <Button variant="outlined" size="small" startIcon={<CommentIcon />}>
            connect
          </Button>
        }>
        <ListItemAvatar>
          <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png" />
        </ListItemAvatar>
        <ListItemText primary="Metamask" secondary="Etherium" />
      </ListItem>
      <ListItem
        secondaryAction={
          <Button variant="outlined" size="small" startIcon={<CommentIcon />}>
            connect
          </Button>
        }>
        <ListItemAvatar>
          <Avatar src="https://images.ctfassets.net/c5bd0wqjc7v0/3dFdY6GvgLgCIXmBiN6eiA/d4acc5d4c5d557566cf0e46f9b58de43/icon-buy-and-sell.svg" />
        </ListItemAvatar>
        <ListItemText primary="Coinbase" secondary="Bitcoin" />
      </ListItem>
      <ListItem
        secondaryAction={
          <Button variant="outlined" size="small" startIcon={<CommentIcon />}>
            connect
          </Button>
        }>
        <ListItemAvatar>
          <Avatar src="https://s2.coinmarketcap.com/static/img/coins/200x200/5964.png" />
        </ListItemAvatar>
        <ListItemText primary="Trustwallet" secondary="Smart chain" />
      </ListItem>
    </List>
  );
}