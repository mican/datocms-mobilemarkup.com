import * as React from 'react'

import Layout from '../components/layout'
import ContactForm from '../components/ContactForm'
import ServiceForm from '../components/ServiceForm'
import * as styles from '../styles/page-contact.module.sass'

export default function ContactPage() {
  return (
    <Layout>
      <section className={styles.sectionContact}>
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </Layout>
  )
}
