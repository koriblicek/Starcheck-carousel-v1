import { Alert, AlertTitle, Grid, LinearProgress, Typography } from "@mui/material";
import { IAppData, IAppInputData } from "./types";
import { Fragment, useEffect, useState } from "react";
import useGetFromAPI from "./hooks/useGetFromAPI";
import AppDataLoader from "./AppDataLoader";


interface IAppProps {
  inputData: IAppInputData;
}

export default function AppSettingsLoader({ inputData }: IAppProps) {

  const { error, data, isLoading } = useGetFromAPI<IAppData>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings");

  const [proceed, setProceed] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      //initialize loaded data
      setProceed(true);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, inputData]);

  return (
    <Fragment>
      {proceed && <AppDataLoader inputData={inputData} />}
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