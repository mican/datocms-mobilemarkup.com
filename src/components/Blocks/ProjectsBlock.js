import React from "react";
import classNames from "classnames";
import Image from "../../components/Image";

import * as styles from "../../styles/block-projects.module.sass";

const ProjectsBlock = ({ projects }) => (
  <section className={styles.blockProjects}>
    <div className="container">
      {projects.map((item) => {
        return <h2>{item.name}</h2>;
      })}
    </div>
  </section>
);

export default ProjectsBlock;
