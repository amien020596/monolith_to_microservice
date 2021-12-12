import React, { PropsWithChildren } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";

function Wrapper(props: PropsWithChildren<any>) {
  return (
    <>
      <Nav />
      <main role="main">

        <Header />

        <div className="album py-5 bg-light">
          <div className="container">
            {props.children}
          </div>
        </div>

      </main>

      <Footer />
    </>
  )
}
export default Wrapper;