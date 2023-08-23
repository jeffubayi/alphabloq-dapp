import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/StarBorder';
import { Button, Paper, IconButton, Avatar, Card, Stack, TextField, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { supabase } from "../../utility/supabaseClient";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import CloseIcon from '@mui/icons-material/ArrowBackIos';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function ChatDrawer() {
  const [state, setState] = React.useState({
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

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['right', 'left', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Card sx={{ m: 1, borderRadius: '0.5rem' }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" onClick={toggleDrawer("right", true)}>
                  <MarkChatUnreadIcon sx={{fill:'#9369E8'}}/>
                </IconButton>
              }
              title="Tom Sawyer"
              subheader="Whats the price for this estate..."
            />
          </Card>

          <Drawer
            anchor='right'
            open={state[anchor]}
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
                    <CloseIcon  />
                  </IconButton>
                  }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title="Tom Sawyer"
                  subheader="Last Seen 1 hour ago"
                />
              </Card>
              <Stack
                direction="row" spacing={1} sx={{ p: 2 }}
              >
                <TextField placeholder='Type message' fullWidth size="small" />
                <Button color="primary" variant="contained" size="small" onClick={toggleDrawer(anchor, false)} >Send</Button>
              </Stack>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
