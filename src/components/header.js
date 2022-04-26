import * as React from "react";
import { Link, withPrefix } from "gatsby";

import * as styles from "../styles/header.module.sass";

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navigation}>
          <Link to="/">
            <img src={withPrefix("/mobilemarkup-logo.svg")} alt={siteTitle} />
          </Link>
          <ul>
            <li>
              <Link to="/about" activeClassName={styles.linkActive}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" activeClassName={styles.linkActive}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
