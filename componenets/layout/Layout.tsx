import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = (props: any) => {
  return (
    <>
      <Header />
      <main className="main">{props?.children}</main>
      <Footer />
    </>
  );
};
