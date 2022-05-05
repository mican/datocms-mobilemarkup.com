import React from "react";
import { Link } from "gatsby";

import * as styles from "../../styles/block-home.module.sass";

const HomeBlock = () => {
  return (
    <section className={styles.blockHome}>
      <div className="container">
        <h1 className={styles.title}>
          <span className={styles.t1}>Responsive &amp; responsible</span>
          <span className={styles.t2}>web development with edge</span>
          <span className={styles.t3}>solutions and great performance</span>
        </h1>
        <div className={styles.actions}>
          <Link to="/contact" className={styles.button}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlock;
