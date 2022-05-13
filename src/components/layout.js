import React, { useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";

import { gsap, ScrollTrigger, ScrollSmoother } from "gsap-trial/all";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";

import "normalize.css";
import "../styles/layout.sass";

gsap.registerPlugin(ScrollTrigger); //, ScrollSmoother);
// ScrollSmoother.create({
//   smooth: 1,
// });

const Layout = ({ children, className }) => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);
  return (
    <main className={className}>
      <Header />
      {children}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
