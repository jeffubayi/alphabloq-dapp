import * as React from 'react';
import {BottomNavigation,Paper,BottomNavigationAction} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import { useRouter } from "next/router"; 

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/${newValue}`)
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 , mt:2}} elevation={3}>
    <BottomNavigation  showLabels value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Property"
        value="property"
        icon={<InventoryIcon />}
      />
       <BottomNavigationAction
        label="Wallet"
        value="wallet"
        icon={<SendIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="settings"
        icon={<PeopleIcon />}
      />
    </BottomNavigation>
    </Paper>
  );
}
