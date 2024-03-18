import { Box, Button, CardHeader, CardMedia, Grid, darken } from '@mui/material';
import { useState } from 'react';
import { ICarouselTextItem } from 'src/types';

interface ISlideItemProps {
    slide: ICarouselTextItem;
    itemsPerSlide: number;
}

export default function SlideItemText({ slide, itemsPerSlide }: ISlideItemProps) {

    const [hovered, setHovered] = useState<boolean>(false);

    const [random] = useState((Math.random() * 10000).toFixed(0));

    const isCta = (slide.cta !== "" && slide.cta !== undefined && slide.cta !== null);

    return (
        <Grid
            item
            xs={12 / itemsPerSlide}
            sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}
        >
            <CardMedia
                component='img'
                src={slide.bgImage + "?random=" + random}
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
                    isCta && window.open(slide.cta, "_blank");
                }}
            >
                <CardHeader
                    title={slide.title}
                    titleTypographyProps={{
                        fontSize: `calc(3vw / ${Math.sin((Math.PI / 2) * itemsPerSlide / 4)})`,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    }}
                    subheader={slide.subtitle}
                    subheaderTypographyProps={{
                        fontSize: `calc(1.8vw / ${Math.sin((Math.PI / 2) * itemsPerSlide / 4)})`,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        color: 'white'
                    }}
                    sx={{
                        color: 'white',
                        display: 'block',
                        p: `calc(3vw / ${itemsPerSlide})`,

                    }}
                />
                <Button
                    variant="outlined"
                    sx={{
                        // textAlign:'center',
                        left: '50%',
                        transform: `translate(-50%)`,
                        color: 'white',
                        border: `calc(2px / ${Math.sin((Math.PI / 2) * itemsPerSlide / 4)}) solid white`,
                        '&:hover': {
                            border: `calc(2px / ${Math.sin((Math.PI / 2) * itemsPerSlide / 4)}) solid white`,
                            backgroundColor: '#eeeeee',
                            color: 'black'
                        },
                        fontSize: `calc(1vw / ${Math.sin((Math.PI / 2) * itemsPerSlide / 4)})`
                    }}
                >
                    {slide.button}
                </Button>
            </Box>
        </Grid>
    );
}