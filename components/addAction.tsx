import React from 'react'
import { List, ListItem, Typography, ListItemText, Button } from '@mui/material';
import { useRouter } from "next/router";
import AddIcon from '@mui/icons-material/Add';

export default function CardTitle({ title, icon, collection }: { title: string, icon: any, collection: string }) {
  const router = useRouter();
  const handleAddJoke = () => {
    // router.push(
    //   {
    //     pathname: `/${title}/[id]`,
    //     query: {
    //       id: null,
    //       Views: null,
    //       createdAt: null,
    //       Title: "",
    //       Body: "",
    //       Author: "",
    //       method: "Create",
    //     },
    //   },
    //   `/${title}/create`
    // );
  };
  return (
    <List sx={{ borderRadius: "1rem", mb: 1, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" secondaryAction={
        <Button
          variant="contained"
          startIcon={icon}
          onClick={handleAddJoke}
          size="small"
          sx={{ borderRadius: "0.4rem" }}
        >
          {title}
        </Button>}>
        <Typography color="text.secondary" sx={{fontWeight:"bold"}}>
          {collection}
        </Typography>

      </ListItem>
    </List>
  );
}