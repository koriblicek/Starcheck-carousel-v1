import { useMediaQuery, useTheme } from "@mui/material";
import { Slide } from "./components/slide";
import { ICarousel } from "./types";
import { useMemo, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from 'nuka-carousel';
import { splitArray } from "./utils";

interface IAppProps {
  carouselData: ICarousel;
  index: number;
}



export default function AppNukeCarousel({ carouselData }: IAppProps) {

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
    <div ref={ref} className="slider-container">
      <Carousel showArrows={carouselData.navButtonsVisible} showDots={carouselData.indicators} autoplay={carouselData.autoPlay} autoplayInterval={carouselData.interval}>
        {slides}
      </Carousel>
    </div>
  );
}