import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Button, Paper, useMediaQuery, Stack, Chip, ListItemText, Grid, Box } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/ArrowBackIos';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Divider from '@mui/material/Divider';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';

import { Property } from "../types"
import Accordions from "./accordion";
import ImageStepper from "./imageList"

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function propertyCard(property: Property) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = React.useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ minWidth: isSmallScreen ? 300 : 270, borderRadius: "0.5rem" }}>
            {open && (
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
                                {property.property.title}
                            </Typography>
                            <Button size="small" startIcon={<MarkChatUnreadIcon />} autoFocus color="primary" variant="contained" onClick={handleClose} sx={{ px: 2, borderRadius: "0.5rem" }}>
                                {!isSmallScreen && "Contact  Agent"}
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
                                        <ListItemText primary="Location" secondary={property.property.location} />
                                    </div>
                                    <div>
                                        <IconButton size="small" aria-label="add to favorites">
                                            <FavoriteIcon sx={{ fill: property.property.favourite ? "red" : "#fff" }} />
                                        </IconButton>
                                        <IconButton size="small" aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                    </div>
                                </Stack>
                                <div>

                                    <Rating defaultValue={property.property.rating} precision={0.5} />
                                </div>
                                <ListItemText primary="Price" secondary={
                                    <Stack
                                        direction="row" spacing={3}
                                        mb={4}
                                        divider={<Divider orientation="vertical" flexItem />}
                                    >
                                        <Typography variant="subtitle1" color="primary" >
                                            KSH {property.property.price}
                                        </Typography>
                                        <Typography variant="subtitle1" color="primary" >
                                            USD {property.property.price}
                                        </Typography>
                                    </Stack>
                                } />
                                <ListItemText primary="About this listing" secondary={property.property.about} />

                                <Typography variant="caption" color="text.secondary" >
                                    {property.property.details}
                                </Typography>
                                <Box sx={{ mt: 4 }}>
                                    <Accordions />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Dialog>
            )
            }
            <CardMedia
                component="img"
                height="220"
                image={property.property.image}
                alt="Property"
            />
            <CardContent>
                <Stack
                    direction="row" spacing={2}
                    justifyContent="space-between"
                >
                    <div>
                        <ListItemText primary={property.property.location} secondary={property.property.title} />
                    </div>
                    <div>
                        <IconButton size="small" aria-label="add to favorites">
                            <FavoriteIcon sx={{ fontSize: "1rem", fill: property.property.favourite ? "red" : "#fff" }} />
                        </IconButton>
                        <IconButton size="small" aria-label="share">
                            <ShareIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                    </div>
                </Stack>
                <Stack
                    direction="row" spacing={3}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Typography variant="caption" color="primary" >
                        KSH {property.property.price}
                    </Typography>
                    <Typography variant="caption" color="primary" >
                        USD {property.property.price}
                    </Typography>
                </Stack>
                <div>

                    <Rating defaultValue={property.property.rating} precision={0.5} size="small" />
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <Stack
                    direction="row" spacing={0.7}
                    justifyContent="space-between"
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={handleClickOpen}
                        >
                            View
                        </Button>
                    </div>
                    <div>
                        <Chip size="small" sx={{ fontSize: "0.5rem", color: "text.secondary" }} icon={<HotelIcon sx={{ fontSize: "0.2rem", fill: "text.secondary" }} />} label={`${property.property.bed} bd`} />
                    </div>
                    <div>
                        <Chip sx={{ fontSize: "0.5rem", color: "text.secondary" }} size="small" icon={<BathtubIcon sx={{ fontSize: "0.2rem", fill: "text.secondary" }} />} label={`${property.property.bath} ba`} />
                    </div>
                    <div>
                        <Chip size="small" sx={{ fontSize: "0.5rem", color: "text.secondary" }} icon={<NightShelterIcon sx={{ fontSize: "0.2rem", fill: "text.secondary" }} />} label={`${property.property.sqft} ft`} />
                    </div>
                </Stack>
            </CardActions>
        </Card>
    );
}
