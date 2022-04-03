import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { generalContext } from "../context/mainContext";
import { Layout } from "../componenets/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const initialContextValue = "initial";
  const [contextData, setContextData] = React.useState(initialContextValue);
  return (
    <generalContext.Provider value={{ contextData, setContextData }}>
      <Layout>
        <Component {...{ ...pageProps }} />
      </Layout>
    </generalContext.Provider>
  );
}

export default MyApp;
