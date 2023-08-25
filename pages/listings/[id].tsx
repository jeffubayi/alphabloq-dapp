import { Dialog, AppBar,Tooltip, useMediaQuery, Toolbar, IconButton, Typography, Button, Box, Paper, Grid, Stack, ListItemText, Rating, Divider } from "@mui/material";
import Head from "next/head";
import React from "react";
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import Accordions from "../../components/accordion";
import ImageStepper from "../../components/imageList";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListingDialog() {
    const router = useRouter();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const {
        title,
        location,
        price,
        rating,
        favourite,
        details,
        about,
        bath,
        bed,
        sqft,
        shareUrl,
        floor,
        dsq,
        roof,
        villa
    } = router.query;

    const extra = {
        floor,
        dsq,
        roof,
        villa
    }
    const [open, setOpen] = React.useState(true)

    const handleClose = () => {
        router.back()
        setOpen(false);
    };
    return (
        <div>
            <Head>
        <title> {title} | AlphabloQ  </title>
      </Head>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }} color="inherit" elevation={0}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {title}
                        </Typography>
                        <Button size="small" startIcon={<MarkChatUnreadIcon />} autoFocus color="primary" variant="contained" onClick={handleClose} sx={{ px: 2, borderRadius: "0.5rem" }}>
                            {isSmallScreen ? "Bid":  "Bid Property"}
                        </Button>
                    </Toolbar>
                </AppBar>


                <Box component={Paper} sx={{ flexGrow: 1, p: 2 }}>
                    <Grid container spacing={4}>
                        <Grid item md={8} sm={12}>

                            <ImageStepper />
                        </Grid>
                        <Grid item md={4} sm={12}>
                            <Stack
                                direction="row" spacing={2}

                                justifyContent="space-between"
                            >
                                <div>
                                    <ListItemText primary="Location" secondary={location} />
                                </div>
                                <div>
                                    <IconButton size="small" aria-label="add to favorites">
                                        <FavoriteIcon sx={{ fill: favourite ? "red" : "#fff" }} />
                                    </IconButton>
                                    <Tooltip title={shareUrl}>
                                        <IconButton size="small" aria-label="share">
                                            <ShareIcon sx={{ fontSize: "1rem" }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Stack>
                            <div>
                                <Rating defaultValue={rating} precision={0.5} />
                            </div>
                            <ListItemText primary="Price" secondary={
                                <Stack
                                    direction="row" spacing={3}
                                    mb={4}
                                    divider={<Divider orientation="vertical" flexItem />}
                                >
                                    <Typography variant="subtitle1" color="primary" >
                                        KSH {price}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary" >
                                        USD {price}
                                    </Typography>
                                </Stack>
                            } />
                            <ListItemText primary="About this listing" secondary={about} />

                            <Typography variant="caption" color="text.secondary" >
                                {details}
                            </Typography>
                            <Box sx={{ mt: 4 }}>
                                <Accordions extra={extra} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>

        </div >
    );
}