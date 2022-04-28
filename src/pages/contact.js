import * as React from "react";

import Layout from "../components/layout";
import ContactForm from "../components/ContactForm.js";

import * as styles from "../styles/page-contact.module.sass";

const ContactPage = () => {
  return (
    <Layout>
      <section className={styles.sectionContact}>
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
