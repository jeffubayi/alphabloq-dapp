import * as React from 'react';
import { Card, Chip,CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';


export default function ItemCard() {
  return (
    <Card sx={{ borderRadius: "0.4rem",maxWidth:250,minWidth:150, }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          width="50"
          image="/"
          alt="item image"
        />
        <CardContent>
        <Typography variant="caption" color="primary">
        hello
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            mr
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ksh 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
