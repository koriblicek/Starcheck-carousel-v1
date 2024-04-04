import { Grid } from '@mui/material';
import { useMemo } from 'react';
import { EnumCarouselItemTypes, ICarouselImageItem, ICarouselItem, ICarouselTextItem } from 'src/types';
import SlideItemImage from './item-image';
import SlideItemText from './item-text';

export interface ISlideProps {
    slideData: ICarouselItem[];
    isMobile: boolean;
    itemsPerSlide: number;
}

export function Slide({ slideData, isMobile, itemsPerSlide }: ISlideProps) {
    const items = useMemo(() => {
        return slideData.map((slide, index) => {
            if (slide.type === EnumCarouselItemTypes.image) {
                return <SlideItemImage slide={slide as ICarouselImageItem} key={index} itemsPerSlide={itemsPerSlide} isMobile={isMobile} />;
            }
            if (slide.type === EnumCarouselItemTypes.text) {
                return <SlideItemText slide={slide as ICarouselTextItem} key={index} itemsPerSlide={itemsPerSlide} />;
            }
            return null;
        });
    }, [slideData]);

    return (
        <Grid container spacing={0} height='100%' sx={{ position: 'relative' }}>
            {items}
        </Grid>
    );
}
