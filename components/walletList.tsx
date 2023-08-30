import * as React from 'react';
import { Typography, List, Button, IconButton } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Add';

export default function WalletList() {
  return (
    <List sx={{ width: '100%',  p: 2, borderRadius: "0.7rem" }}>
      <Typography>Connect Wallet</Typography>
      <ListItem
       >
        <ListItemAvatar>
          <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png" />
        </ListItemAvatar>
        <ListItemText primary="Metamask" secondary="Etherium" />
      </ListItem>
      <ListItem
        >
        <ListItemAvatar>
          <Avatar src="https://images.ctfassets.net/c5bd0wqjc7v0/3dFdY6GvgLgCIXmBiN6eiA/d4acc5d4c5d557566cf0e46f9b58de43/icon-buy-and-sell.svg" />
        </ListItemAvatar>
        <ListItemText primary="Coinbase" secondary="Bitcoin" />
      </ListItem>
      <ListItem
       >
        <ListItemAvatar>
          <Avatar src="https://workablehr.s3.amazonaws.com/uploads/account/open_graph_logo/492879/social?1675329233000" />
        </ListItemAvatar>
        <ListItemText primary="WalletConnect" secondary="Bitcoin" />
      </ListItem>
    </List >
  );
}