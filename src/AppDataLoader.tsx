import { Alert, AlertTitle, Grid, LinearProgress, Typography } from "@mui/material";
import { IAppData, IAppInputData, ICarouselsData } from "./types";
import { Fragment, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import App from "./App";
import useAxiosFunction from "./hooks/useAxiosFunction";
import isDev from "./utils";

interface IAppImagesLoaderProps {
  inputData: IAppInputData;
  appData: IAppData;
}

export default function AppDataLoader({ inputData, appData }: IAppImagesLoaderProps) {

  const { error, response, isRequesting, axiosRequest } = useAxiosFunction<ICarouselsData, null>();

  useEffect(() => {
    if (isDev())
      axiosRequest("careouselData.json", "get");
    else
      axiosRequest(appData.dataURL, "get");
  }, [axiosRequest, appData]);

  const [proceed, setProceed] = useState<boolean>(false);

  useEffect(() => {
    if (response) {
      //initialize loaded data
      setProceed(true);
    }
    if (error) {
      console.log(error);
    }
  }, [response, error]);

  return (
    <Fragment>
      {proceed &&
        <>
          {
            response &&
            response.carousels.map((carousel, index) => {
              const target = document.getElementById(inputData.dataDivs[index]);
              if (target) {
                return createPortal(<App key={index} carouselData={carousel} index={index} />, target);
              }
            })
          }
        </>
      }
      {isRequesting &&
        <Grid container p={1}>
          <Grid item xs textAlign='center'>
            <LinearProgress sx={{
              backgroundColor: 'white',
              '& .MuiLinearProgress-bar': {
                backgroundColor: "lightGray"
              }
            }} />
          </Grid>
        </Grid>
      }
      {
        error &&
        <Alert variant="standard" color="error">
          <AlertTitle>{error.code}</AlertTitle>
          <Typography variant="body1">{error.message}</Typography>
          <Typography variant="subtitle1">{error.url}</Typography>
        </Alert>
      }
    </Fragment>
  );
}