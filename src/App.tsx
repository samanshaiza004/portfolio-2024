// src/App.tsx
import { Helmet } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <html lang="en" />
        <meta
          name="description"
          content="Personal website of Saman Shaiza, software developer"
        />
      </Helmet>
      <RootLayout />
    </BrowserRouter>
  );
}
