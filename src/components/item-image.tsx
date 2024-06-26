import { Box, CardMedia, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { ConstTargetTypes, ICarouselImageItem } from 'src/types';

interface ISlideItemProps {
    slide: ICarouselImageItem;
    isMobile: boolean;
    itemsPerSlide: number;
    height: number;
}

export default function SlideItemImage({ slide, itemsPerSlide, isMobile, height }: ISlideItemProps) {

    const [hovered, setHovered] = useState<boolean>(false);

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
                src={(isMobile ? slide.imageMobile : slide.imageDesktop)}
                sx={{ display: 'block', width: '100%', transition: 'filter .2s', filter: `brightness(${hovered ? 1.3 : 1})`, cursor: isCta ? 'pointer' : 'auto' }}
                title={slide.alt}
                onClick={() => {
                    if (isCta) {
                        if (isTarget)
                            window.open(slide.cta, slide.target);
                        else
                            window.open(slide.cta, "_self");
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
                            fontSize: `calc(${height * 0.1}px)`,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            userSelect: "none",
                            px: 1,
                            py: hovered ? `calc(${height * 0.05}px)` : 0,
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