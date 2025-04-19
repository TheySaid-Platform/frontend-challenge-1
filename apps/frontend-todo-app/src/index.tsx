import './index.css';
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <RecoilRoot>
      <>
      <div className="bg-blue-500 text-white p-4 rounded-xl border border-white">
  Tailwind should be obvious here.
</div>
      <App />
      </>
    </RecoilRoot>
  </StrictMode>
);
