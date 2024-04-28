import { IAppInputData } from './types/index.ts';
import ReactDOM from 'react-dom/client';
import AppSettingsLoader from './AppSettingsLoader.tsx';
import isDev from './utils/index.ts';

//input data
let inputData: IAppInputData;

//error logs
let errorMessage = "";

//curent script reference live/local
function getCurrentScript() {
  if (isDev())
    return document.getElementById("local-test");
  else
    return document.currentScript;
}
const currentScript = getCurrentScript();

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
    ReactDOM.createRoot(document.getElementById(`${dm}-root`)!).render(
      // <Provider store={store}>
      <AppSettingsLoader inputData={inputData} />
      // </Provider>
    );
  } else {
    errorMessage = `Some of required input data are missing! 'data-id'='${di}','data-module'='${dm}','data-version'='${dv}','data-divs'='${dd}'`;
    console.error(`(Starcheck-carousel): ${errorMessage}`);
  }
}
