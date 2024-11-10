import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { SmoothScrollProvider } from "./hooks/SmoothScrollContext";
import SmoothScrolling from "./SmoothScrolling.tsx";
import App from "./App.tsx";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <SmoothScrollProvider>
        <SmoothScrolling>
          <App />
        </SmoothScrolling>
      </SmoothScrollProvider>
    </StrictMode>
  );
}
