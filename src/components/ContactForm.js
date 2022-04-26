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
      {type === "textarea" && <textarea className={styles.textarea} cols="50" rows="4" name={name} id={name} onChange={handleInput}></textarea>}
      {type !== "textarea" && <input className={styles.textInput} type={type} name={name} id={name} onChange={handleInput} required />}
    </p>
  );
}

const ContactForm = ({ id }) => {
  return (
    <form name="contact" method="POST" data-netlify="true">
      <p>
        <label>
          Your Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Your Email: <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Your Role:{" "}
          <select name="role[]" multiple>
            <option value="leader">Leader</option>
            <option value="follower">Follower</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message" defaultValue={""} />
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  );
};

export default ContactForm;
