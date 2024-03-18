import { IAppInputData } from './types/index.ts';
import ReactDOM from 'react-dom/client';
import AppSettingsLoader from './AppSettingsLoader.tsx';

//input data
let inputData: IAppInputData;

//error logs
let errorMessage = "";

//curent script reference live/local
//const currentScript = document.currentScript;
const currentScript = document.getElementById("local-test");

if (currentScript) {
  const dal = "https://www.starcheck.sk/apijs/";
  const di = currentScript.getAttribute("data-id");
  const dm = currentScript.getAttribute("data-module");
  const dv = currentScript.getAttribute("data-version");
  const dd = currentScript.getAttribute("data-divs");
  if ((dal !== null) && (di !== null) && (dm !== null) && (dv !== null) && (dd !== null)) {
    inputData = {
      dataApiLink: dal,
      dataId: di,
      dataModule: dm,
      dataVersion: dv,
      dataDivs: dd.split(",").map(div => div.trim())
    };
    /*
        // Make a request for a user with a given ID
        axios.get(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/setti1ngs")
          .then(function (response) {
            // handle success
            inputData.dataDivs.map((div, index) => {
              ReactDOM.createRoot(document.getElementById(div)!).render(
                <Provider store={store}>
                  <AppDataLoader inputData={inputData} index={index} />
                </Provider>
              );
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    */
    ReactDOM.createRoot(document.getElementById(`${dm}-root`)!).render(
      // <Provider store={store}>
      <AppSettingsLoader inputData={inputData} />
      // </Provider>
    );
  } else {
    errorMessage = `Some of required input data are missing! 'data-id'='${di}','data-module'='${dm}','data-version'='${dv}','data-ui-template'='${dd}'`;
    console.error(`(Starcheck-carousel): ${errorMessage}`);
  }
}
