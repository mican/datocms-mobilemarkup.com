import React, { useState } from "react";
import * as styles from "../styles/contact-form.module.sass";

function TextInput({ type = "text", name }) {
  const [value, setValue] = useState("");
  var label = name.charAt(0).toUpperCase() + name.slice(1);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <p className={styles.field + (value && " active")}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === "textarea" && <textarea className={styles.textarea} cols="50" rows="4" value={value} name={name} id={name} onChange={handleInput} required />}
      {type !== "textarea" && <input className={styles.textInput} type={type} value={value} name={name} id={name} onChange={handleInput} required />}
    </p>
  );
}

const ContactForm = ({ id }) => {
  return (
    <form className={styles.contactForm} name="contact" netlify>
      <TextInput name="name" />
      <TextInput name="email" type="email" />
      <TextInput name="message" type="textarea" />
      <p className={styles.field}>
        <button className={styles.button} type="submit">
          Send message
        </button>
      </p>
    </form>
  );
};

export default ContactForm;
