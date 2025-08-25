import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { registerLicense } from "@syncfusion/ej2-base";

// Read from env (Create React App uses process.env.REACT_APP_*)
const key = process.env.REACT_APP_SYNCFUSION_LICENSE_KEY;
console.log("Key: ", key);

if (key && key.trim().length > 0) {
  registerLicense(key);
} else {
  // Optional: keep a friendly warning in dev
  // eslint-disable-next-line no-console
  console.warn(
    "Syncfusion license key is missing. Components will run in trial mode."
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
