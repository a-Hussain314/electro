import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="main">{props.children}</main>
      <Footer />
    </>
  );
};
