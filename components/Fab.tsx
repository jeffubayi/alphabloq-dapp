import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButtons() {
  return (
    <Fab color="primary"   aria-label="add" sx={{
      position: 'fixed',
      bottom: 60,
      right: 16,
    }}>
      <AddIcon />
    </Fab>
  );
}
