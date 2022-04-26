import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";

import * as styles from "../styles/main-page.module.sass";

const IndexPage = () => {
  return (
    <Layout>
      <section className={styles.about}>
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
            {/* <span>or see</span>
            <a href="#portfolio">our projects</a> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
