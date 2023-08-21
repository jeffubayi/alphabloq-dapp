import React from 'react'
import { List, ListItem, Typography, ListItemText, Button } from '@mui/material';
import { useRouter } from "next/router";
import AddIcon from '@mui/icons-material/Add';

export default function CardTitle({title}:{title:string}) {
  const router = useRouter();
  const handleAddJoke = () => {
    router.push(
      {
        pathname: `/${title}/[id]`,
        query: {
          id: null,
          Views: null,
          createdAt: null,
          Title: "",
          Body: "",
          Author: "",
          method: "Create",
        },
      },
      `/${title}/create`
    );
  };
  return (
    <List sx={{ borderRadius: "1rem", mb: 1, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" secondaryAction={
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddJoke}
          size="small"
          sx={{ borderRadius: "0.4rem" }}
        >
          New {title}
        </Button>}>
        <ListItemText
          primary={
            <Typography color="text.primary" >
             {title}s
            </Typography>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              A list of all {title}s
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}