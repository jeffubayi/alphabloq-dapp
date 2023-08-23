import React, { useState } from 'react';
import { Dialog, Stack, TextField, Button, Card, CardHeader, DialogActions } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/RequestPage';
import { IconButton, Chip } from '@mui/material';
import { Customers } from "../types";
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import CloseIcon from '@mui/icons-material/ArrowBackIos';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function CustomerList(customer: Customers) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    right: false,
  });



  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  return (
    <div>
      <Drawer
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        <Box
          sx={{ width: 380 }}
          role="presentation"
        >
          <Card >
            <CardHeader
              avatar={
                <IconButton aria-label="settings" onClick={toggleDrawer("right", false)}>
                  <CloseIcon />
                </IconButton>
              }
              title="Tom Sawyer"
              subheader="Last Seen 1 hour ago"
            />
          </Card>
          <Stack
            direction="row" spacing={1} sx={{ p: 2 }}
          >
            <TextField placeholder='Type message' fullWidth size="small" />
            <Button color="primary" variant="contained" size="small" onClick={toggleDrawer('right', false)} >Send</Button>
          </Stack>
        </Box>
      </Drawer>
      <ListItem alignItems="flex-start" secondaryAction={
        <IconButton aria-label="settings" onClick={toggleDrawer("right", true)}>
          <MarkChatUnreadIcon sx={{ fill: '#9369E8' }} />
        </IconButton>
      }>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "primary", color: "text.secondary" }} alt={customer.customer.Contact} src="/" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body2"
              color="text.primary"
            >
              {customer.customer.Contact}
            </Typography>}
          secondary={
            <React.Fragment >
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                {customer.customer.Phone}
              </Typography>
              <Chip size="small" sx={{ display: 'inline', ml: 1, color: 'text.secondary' }} label={customer.customer.Company} />

            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}
