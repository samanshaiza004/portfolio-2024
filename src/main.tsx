import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import SmoothScrolling from "./SmoothScrolling.tsx";
import App from "./App.tsx";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <SmoothScrolling>
        <App />
      </SmoothScrolling>
    </StrictMode>
  );
}
