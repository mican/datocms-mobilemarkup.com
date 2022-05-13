import React from "react";
import classNames from "classnames";
import Image from "../../components/Image";
import Slider from "../../components/Slider";
import Video from "../../components/Video";

import * as styles from "../../styles/block-projects.module.sass";

const ProjectsBlock = ({ projects }) => {
  return (
    <section className={styles.blockProjects} id="blockProjects">
      <ul className={styles.projectsCollection} id="projectsWrapper">
        {projects &&
          projects.map((project) => (
            <li key={project.id} className={styles.projectItem}>
              {project.images.length > 0 && (
                <div className={classNames(styles.projectImages, "shadow-lg bg-white")}>
                  <Slider>
                    {project.images.map((image) => (
                      <figure className={"overflow-hidden"}>
                        <Image image={image} className={styles.projectImage} alt={project.name} />
                      </figure>
                    ))}
                  </Slider>
                </div>
              )}
              {project.video && (
                <figure className={styles.projectVideo}>
                  <Video id={project.video.providerUid} title={project.video.title} />
                </figure>
              )}
              <h3 className={classNames("project-name", styles.projectName)}>{project.name}</h3>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ProjectsBlock;
