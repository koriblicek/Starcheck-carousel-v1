import { useMediaQuery, useTheme } from "@mui/material";
import { Slide } from "./components/slide";
import { ICarousel } from "./types";
import { splitArray } from "./utils";
import Carousel from "react-material-ui-carousel";
import { Fragment, useMemo } from "react";

interface IAppProps {
  carouselData: ICarousel;
  index: number;
}

export default function App({ carouselData }: IAppProps) {

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const splitted = useMemo(() => {
    return splitArray(carouselData.data, carouselData.itemsPerSlide);
  }, [carouselData]);

  const slides = useMemo(() => {
    return splitted.map((split, index) => <Slide key={index} slideData={split} itemsPerSlide={carouselData.itemsPerSlide} isMobile={md} />);
  }, [splitted]);


  return (
    <Fragment>
      <Carousel
        stopAutoPlayOnHover={true}
        cycleNavigation={true}
        swipe={false}
        autoPlay={carouselData.autoPlay}
        indicators={carouselData.indicators}
        navButtonsAlwaysVisible={carouselData.navButtonsVisible}
        animation={carouselData.animation}
        duration={carouselData.duration}
        interval={carouselData.interval}
      >
        {slides}
      </Carousel >
    </Fragment>
  );
};