/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Button, useMediaQuery, Stack, Chip, ListItemText, Tooltip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import Divider from '@mui/material/Divider';

import { Property } from "../types"
import { useRouter } from 'next/router';




export default function propertyCard(property: Property | any) {
    const router = useRouter();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const { title, id, image, location,
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
    } = property.property

    const handleClickOpen = () => {
        router.push(
            {
                pathname: "/listings/[id]",
                query: {
                    id,
                    title,
                    image,
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

                },
            },
            `/listings/${id}`
        );
    };


    return (
        <div>

            <Card sx={{ minWidth: isSmallScreen ? 350 : 270, borderRadius: "0.5rem" }}>
                <CardMedia
                    component="img"
                    height="220"
                    image={image}
                    alt="Property"
                />
                <CardContent>
                    <Stack
                        direction="row" spacing={2}
                        justifyContent="space-between"
                    >
                        <div>
                            <ListItemText primary={location} secondary={title} />
                        </div>
                        <div>
                            <IconButton size="small" aria-label="add to favorites">
                                <FavoriteIcon sx={{ fontSize: "1rem", fill: favourite ? "red" : "#fff" }} />
                            </IconButton>
                            <Tooltip title={shareUrl}>
                                <IconButton size="small" aria-label="share">
                                    <ShareIcon sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Stack>
                    <Stack
                        direction="row" spacing={3}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Typography variant="caption" color="primary" >
                            KSH {price}
                        </Typography>
                        <Typography variant="caption" color="primary" >
                            USD {price}
                        </Typography>
                    </Stack>
                    <div>

                        <Rating defaultValue={rating} precision={0.5} size="small" />
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
                            <Chip size="small" sx={{ fontSize: "0.5rem", color: "text.secondary" }} icon={<HotelIcon sx={{ fontSize: "0.2rem", fill: "text.secondary" }} />} label={`${bed} bd`} />
                        </div>
                        <div>
                            <Chip sx={{ fontSize: "0.5rem", color: "text.secondary" }} size="small" icon={<BathtubIcon sx={{ fontSize: "0.2rem", fill: "text.secondary" }} />} label={`${bath} ba`} />
                        </div>
                        <div>
                            <Chip size="small" sx={{ fontSize: "0.5rem", color: "text.secondary" }} icon={<NightShelterIcon sx={{ fontSize: "0.2rem", fill: "text.secondary" }} />} label={`${sqft} ft`} />
                        </div>
                    </Stack>
                </CardActions>
            </Card>
        </div>
    );
}
