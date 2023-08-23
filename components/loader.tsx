import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export default function Loader() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      mt={8}
      spacing={2}
    >
      <CircularProgress />
    </Stack>
  );
}
