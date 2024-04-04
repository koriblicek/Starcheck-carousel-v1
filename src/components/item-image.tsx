import { Box, CardMedia, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { ConstTargetTypes, ICarouselImageItem } from 'src/types';

interface ISlideItemProps {
    slide: ICarouselImageItem;
    isMobile: boolean;
    itemsPerSlide: number;
}

export default function SlideItemImage({ slide, itemsPerSlide, isMobile }: ISlideItemProps) {

    const [hovered, setHovered] = useState<boolean>(false);

    const [random] = useState((Math.random() * 10000).toFixed(0));

    const isAlt = (slide.alt !== "" && slide.alt !== undefined && slide.alt !== null);
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
                src={(isMobile ? slide.imageMobile : slide.imageDesktop) + "?random=" + random}
                sx={{ display: 'block', width: '100%', transition: 'filter .2s', filter: `brightness(${hovered ? 1.3 : 1})`, cursor: isCta ? 'pointer' : 'auto' }}
                title={slide.alt}
                onClick={() => {
                    if (isCta) {
                        if (isTarget)
                            window.open(slide.cta, slide.target);
                        else
                            window.open(slide.cta);
                    }
                }}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            />
            {isAlt &&
                <Box
                    sx={{ color: 'white', position: 'absolute', textAlign: 'left', bottom: 0, width: '100%', backgroundColor: hovered ? "#000000cc" : "#00000022", p: 0, filter: `opacity(${hovered ? .9 : 1})`, cursor: isCta ? 'pointer' : 'auto', transition: 'all .4s', pointerEvents: "none" }}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    <Typography
                        sx={{
                            fontSize: `calc(2vw / ${Math.sin((Math.PI / 2) * itemsPerSlide / 4)})`,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            userSelect: "none",
                            px: 1,
                            py: hovered ? `calc(1vw / ${Math.sin((Math.PI / 2) * itemsPerSlide / 4)})` : 0,
                            whiteSpace: 'nowrap',
                            transition: 'padding .1s'
                        }}
                    >
                        {slide.alt}
                    </Typography>
                </Box>
            }
        </Grid>
    );
}