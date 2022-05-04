import React from "react";
// import { renderText } from "../../utils";
import Image from "../../components/Image";

import * as styles from "../../styles/block-team.module.sass";

const TeamBlock = ({ people, content }) => (
  <section className={styles.blockTeam}>
    <div className="container">
      <div className={styles.collection}>
        {people &&
          people.map((person) => (
            <div key={person.id} className={styles.person}>
              <Image className={styles.personImage} image={person.image} alt={person.name} />
              <h2 className={styles.personName}>{person.name}</h2>
              <span className={styles.personPosition}>{person.specialization}</span>
            </div>
          ))}
      </div>
      {/* {content && <div className={styles.content}>{renderText(content)}</div>} */}
    </div>
  </section>
);

export default TeamBlock;
