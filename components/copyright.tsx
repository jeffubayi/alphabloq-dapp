import * as React from 'react';
import { Link,Typography } from '@mui/material';

export default function CopyRight(props: any) {
  return (
    <Typography variant="body2" color="secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="text.secondary" href="/">
        AlphabloQ Inc
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}