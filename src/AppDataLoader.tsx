import { Alert, AlertTitle, Grid, LinearProgress, Typography } from "@mui/material";
import { IAppInputData, ICarouselsData } from "./types";
import { Fragment, useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import useGetFromAPI from "./hooks/useGetFromAPI";
import App from "./App";

interface IAppImagesLoaderProps {
  inputData: IAppInputData;

}

export default function AppDataLoader({ inputData }: IAppImagesLoaderProps) {

  // const { error, data, isLoading } = useGetFromAPI<ICarouselsData>(appData.dataURL);
  const { error, data, isLoading } = useGetFromAPI<ICarouselsData>("careouselData.json");

  const [proceed, setProceed] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      //initialize loaded data
      setProceed(true);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  return (
    <Fragment>
      {proceed &&
        <>
          {
            data &&
            data.carousels.map((carousel, index) => {
              const target = document.getElementById(inputData.dataDivs[index]);
              if (target) {
                return createPortal(<App key={index} carouselData={carousel} index={index} />, target);
              }
            })
          }
        </>
      }
      {isLoading &&
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
          <Typography variant="body1">{error.codeText}</Typography>
          <Typography variant="subtitle1">{error.url}</Typography>
        </Alert>
      }
    </Fragment>
  );
}