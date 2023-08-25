import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia } from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: '1',
        imgPath:
            'https://alphabloq.io/img/6.09306367.jpg',
    },
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://alphabloq.io/img/1.1b5cf1bc.jpg',
    },
    {
        label: 'Bird',
        imgPath:
            'https://alphabloq.io/img/4.fca2bff2.jpg',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://alphabloq.io/img/3.ea9effb0.jpg',
    },
    {
        label: '2',
        imgPath:
            'https://alphabloq.io/img/5.77007ffc.jpg',
    },
 
];

function ImageStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          
                            <CardMedia
                                sx={{ borderRadius: "0.5rem" }}
                                component="img"
                                height={600}
                                width={500}
                                image={step.imgPath}
                                alt="Property"
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                style={{borderRadius: "0.5rem",backgroundColor:theme.palette.mode == "dark" ? "#172848": "#fff"}}
                color="inherit"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                      
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        
                    </Button>
                }
            />
        </Box>
    );
}

export default ImageStepper;
