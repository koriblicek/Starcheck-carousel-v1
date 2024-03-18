export const APP_NAME = "APICAROUSEL";

//Error object
export interface IErrorObject {
    code: string;
    codeText: string;
    url: string;
}
//#endregion

//#region APP
//Input data via div/scriptst
export interface IAppInputData {
    dataApiLink: string;
    dataId: string;
    dataModule: string;
    dataVersion: string;
    dataDivs: string[];
}

//Settings from API
export interface IAppData {
    dataURL: string;
}
//#endregion


export interface ICarouselsData {
    carousels: ICarousel[];
}

export interface ICarousel {
    itemsPerSlide: number;
    autoPlay: boolean;
    indicators: boolean;
    navButtonsVisible: boolean;
    animation: "fade" | "slide";
    duration: number;
    interval: number;
    data: ICarouselItem[];
};

export interface ICarouselImageItem extends ICarouselItem {
    imageMobile: string;
    imageDesktop: string;
    alt: string;
}

export interface ICarouselTextItem extends ICarouselItem {
    title: string;
    subtitle: string;
    button: string;
    bgImage: string;
    bgColor: string;
}

export enum EnumCarousalItemTypes { image = "image", text = "text" };

export interface ICarouselItem {
    type: EnumCarousalItemTypes;
    cta: string;
}
