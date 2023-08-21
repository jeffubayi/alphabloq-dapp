import * as React from 'react';
import { Card, Chip,CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Inventory } from "../types"

export default function ItemCard(product: Inventory) {
  return (
    <Card sx={{ borderRadius: "0.7rem",maxWidth:150,minWidth:150, }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          width="40"
          image={product.product.Picture}
          alt="item image"
        />
        <CardContent>
        <Typography variant="caption" color="primary">
        {product.product.Collection}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {product.product.Item}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ksh {product.product.Price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
