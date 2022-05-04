import React from "react";
import classNames from "classnames";
import Image from "../../components/Image";

import * as styles from "../../styles/block-projects.module.sass";

const ProjectsBlock = ({ projects }) => (
  <section className={styles.blockProjects} id="blockProjects">
    <ul className={styles.projectsCollection} id="projectsWrapper">
      {projects &&
        projects.map((project) => (
          <li key={project.id} className={styles.projectItem}>
            {project.images && (
              <div className={styles.projectImages}>
                {project.images.map((image) => (
                  <Image image={image} className={styles.projectImage} alt={project.name} />
                ))}
              </div>
            )}
            <h3 className={styles.projectName}>{project.name}</h3>
          </li>
        ))}
    </ul>
  </section>
);

export default ProjectsBlock;
