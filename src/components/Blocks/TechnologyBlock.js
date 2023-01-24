import React from 'react'
import classNames from 'classnames'
import Image from '../../components/Image'

import * as styles from '../../styles/block-technology.module.sass'

const TechnologyBlock = ({ technologies }) => (
  <section className={styles.blockTechnology}>
    <div className="container">
      {technologies.map(tech => {
        return (
          <div className={classNames(styles.techBlock)}>
            {!tech.collection && tech.name}
            {tech.collection && (
              <>
                {/* <span className={styles.techLabel}>{tech.name}</span> */}
                <ul className={styles.techCollection}>
                  {tech.collection.map(t => (
                    <li key={t.id} className={styles.techItem}>
                      {t.image ? <Image className={styles.techImage} image={t.image} alt={t} /> : <span className={styles.itemTechName}>{t.name}</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )
      })}
    </div>
  </section>
)

export default TechnologyBlock
