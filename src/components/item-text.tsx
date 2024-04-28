import { Box, Button, CardHeader, CardMedia, Grid, darken } from '@mui/material';
import { useState } from 'react';
import { ConstTargetTypes, ICarouselTextItem } from 'src/types';

interface ISlideItemProps {
    slide: ICarouselTextItem;
    itemsPerSlide: number;
    height: number;
}

export default function SlideItemText({ slide, itemsPerSlide, height }: ISlideItemProps) {

    const [hovered, setHovered] = useState<boolean>(false);

    const isCta = (slide.cta !== "" && slide.cta !== undefined && slide.cta !== null);
    const isTarget = ConstTargetTypes.includes(slide.target);

    return (
        <Grid
            item
            xs={12 / itemsPerSlide}
            sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}
        >
            <CardMedia
                component='img'
                src={slide.bgImage}
                sx={{ display: 'block', width: '100%' }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: hovered ? darken(slide.bgColor, .2) : slide.bgColor,
                    cursor: isCta ? 'pointer' : 'auto',
                    transition: 'background-color .4s'
                }}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onClick={() => {
                    if (isCta) {
                        if (isTarget)
                            window.open(slide.cta, slide.target);
                        else
                            window.open(slide.cta, "_self");
                    }
                }}
            >
                <CardHeader
                    title={slide.title ? slide.title : " "}
                    titleTypographyProps={{
                        fontSize: `calc(${height * 0.20}px)`,
                        textAlign: 'center',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    }}
                    subheader={slide.subtitle ? slide.subtitle : " "}
                    subheaderTypographyProps={{
                        fontSize: `calc(${height * 0.12}px)`,
                        textAlign: 'center',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        color: 'white'
                    }}
                    sx={{
                        color: 'white',
                        display: 'block',
                        p: `calc(${height * .05}px)`,

                    }}
                />
                <Button
                    variant="outlined"
                    sx={{
                        // textAlign:'center',
                        position: 'absolute',
                        left: '50%',
                        bottom: `calc(${height * .05}px)`,
                        transform: `translate(-50%)`,
                        color: 'white',
                        border: `calc(${height * .015}px) solid white`,
                        py: `1px`,
                        '&:hover': {
                            border: `calc(${height * .015}px) solid white`,
                            backgroundColor: '#eeeeee',
                            color: 'black'
                        },
                        fontSize: `calc(${height * 0.08}px)`
                    }}
                >
                    {slide.button}
                </Button>
            </Box>
        </Grid>
    );
}