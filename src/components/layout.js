import React, { useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";

import { gsap, ScrollTrigger, ScrollSmoother } from "gsap-trial/all";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";

import "normalize.css";
import "../styles/layout.sass";

const Layout = ({ children, className }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
  });
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
