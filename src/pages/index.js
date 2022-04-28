import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

import * as styles from "../styles/page-home.module.sass";

export default function IndexPage({ data: { allProjects, site } }) {
  return (
    <Layout>
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
            {/* <span>or see</span>
            <a href="#portfolio">our projects</a> */}
          </div>
        </div>
      </section>
      {/* <section className={styles.blockProjects}>
        <div className="container"></div>
      </section> */}
    </Layout>
  );
}

export const query = graphql`
  {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    allProjects: allDatoCmsProject {
      nodes {
        name
        id
      }
    }
  }
`;
