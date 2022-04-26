import React from "react";
import PropTypes from "prop-types";
import Header from "./header";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";

import "normalize.css";
import "../styles/layout.sass";

const Layout = ({ children, className }) => {
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
