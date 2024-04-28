import { Alert, AlertTitle, Grid, LinearProgress, Typography } from "@mui/material";
import { IAppData, IAppInputData } from "./types";
import { Fragment, useEffect, useState } from "react";
import AppDataLoader from "./AppDataLoader";
import useAxiosFunction from "./hooks/useAxiosFunction";


interface IAppProps {
  inputData: IAppInputData;
}

export default function AppSettingsLoader({ inputData }: IAppProps) {

  const { error, response, isRequesting, axiosRequest } = useAxiosFunction<IAppData, null>();

  const [proceed, setProceed] = useState<boolean>(false);

  useEffect(() => {
    axiosRequest(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings", "get");
  }, [axiosRequest, inputData]);

  useEffect(() => {
    if (response) {
      //initialize loaded data
      setProceed(true);
    }
    if (error) {
      console.log(error);
    }
  }, [response, error, inputData]);

  return (
    <Fragment>
      {proceed && response && <AppDataLoader inputData={inputData} appData={response} />}
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