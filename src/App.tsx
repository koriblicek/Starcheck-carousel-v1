import { useMediaQuery, useTheme } from "@mui/material";
import { Slide } from "./components/slide";
import { ICarousel } from "./types";
import { splitArray } from "./utils";
import { useMemo, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import useResizeObserver from "@react-hook/resize-observer";

interface IAppProps {
  carouselData: ICarousel;
  index: number;
}

export default function App({ carouselData }: IAppProps) {

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const splitted = useMemo(() => {
    return splitArray(carouselData.data, carouselData.itemsPerSlide);
  }, [carouselData]);

  const slides = useMemo(() => {
    return splitted.map((split, index) => <Slide key={index} slideData={split} itemsPerSlide={carouselData.itemsPerSlide} isMobile={md} height={height} />);
  }, [splitted, carouselData, md, height]);

  useResizeObserver(ref, entry => {
    const { blockSize: height } = entry.contentBoxSize[0];
    setHeight(height);
  });

  return (
    <div ref={ref}>
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
    </div>
  );
}