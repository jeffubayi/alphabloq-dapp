import React, { useState } from 'react';
import { Dialog,Stack , TextField, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
import MpesaPay from 'mpesapay';

const body = {
  "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNjIxMDcxMzQx",
  "Timestamp": "20230621071341",
  "BusinessShortCode": 174379,
  "TransactionType": "CustomerPayBillOnline",
  "Amount": 1,
  "PartyA": 254726837366,
  "PartyB": 174379,
  "PhoneNumber": 254707748115,
  "CallBackURL": "https://mydomain.com/path",
  "AccountReference": "Astro",
  "TransactionDesc": "Order payment"
}
const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

export default function CustomerList(customer: Customers) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const initiateSTKPush = async () => {
    const Amount = '1';
    const PhoneNumber = '254707748115';
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: {
          "content-type": "application/json",
          // "Authorization": `Bearer yAoycN6ONq1y8qHGMH1e0n6Dj7jy`,
        },
        body: JSON.stringify({ ...body, Amount, PhoneNumber })
      });
      const content = await response.json();
      console.log(`data`, content);
      toast.success(`${content?.CustomerMessage}`);
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hire services from {customer.customer.Company}</DialogTitle>
        <DialogContent sx={{ py: 2, mt: 2 }}>
          <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
            <TextField size="small" fullWidth value={customer.customer.Phone} label="Phone Number" />
            <TextField size="small" fullWidth value="1,000" label="Amount" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose}>Cancel</Button>
          <Button size="small" type="submit" onClick={initiateSTKPush} variant="contained">Hire</Button>
        </DialogActions>
      </Dialog>
      <ListItem alignItems="flex-start" secondaryAction={
          <Button onClick={() => setOpen(true)} variant="outlined">Hire</Button>
        
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
