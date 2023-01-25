import React, { useState } from 'react'
import { NetlifyForm, Honeypot, NetlifyFormContext } from 'react-netlify-forms'
import * as styles from '../styles/contact-form.module.sass'
function TextInput({ type = 'text', name }) {
  const [value, setValue] = useState('')
  var label = name.charAt(0).toUpperCase() + name.slice(1)
  const { handleChange } = NetlifyFormContext
  return (
    <p className={styles.field + (value && ' active')}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea className={styles.textarea} cols="50" rows="4" name={name} id={name} onChange={handleChange}></textarea>
      ) : (
        <input className={styles.textInput} type={type} name={name} id={name} onChange={handleChange} required />
      )}
    </p>
  )
}

export default function ContactForm() {
  return (
    <NetlifyForm name="Contact" honeypotName="bot-field">
      <div className={styles.contactForm}>
        <Honeypot />
        <TextInput name="name" />
        <TextInput name="email" type="email" />
        <TextInput name="message" type="textarea" />
        <p className={styles.field}>
          <button className={styles.button} type="submit">
            Send message
          </button>
        </p>
      </div>
    </NetlifyForm>
  )
}
