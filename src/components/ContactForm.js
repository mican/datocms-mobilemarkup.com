import React, { useState } from 'react'
import { NetlifyForm, Honeypot } from 'react-netlify-forms'
import * as styles from '../styles/contact-form.module.sass'

function TextInput({ type = 'text', name, handleChange }) {
  const [value, setValue] = useState('')
  var label = name.charAt(0).toUpperCase() + name.slice(1)

  const handleInput = e => {
    handleChange()
    setValue(e.target.value)
  }

  return (
    <p className={styles.field + (value && ' active')}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea className={styles.textarea} cols="50" rows="4" name={name} id={name} onChange={handleInput}></textarea>
      ) : (
        <input className={styles.textInput} type={type} name={name} id={name} onChange={handleInput} required />
      )}
    </p>
  )
}

export default function ContactForm() {
  return (
    <NetlifyForm name="Contact" honeypotName="bot-field">
      {({ handleChange, success, error }) => (
        <div className={styles.contactForm}>
          <Honeypot />
          {success && <p>Thanks for contacting us!</p>}
          {error && <p>Sorry, we could not reach our servers. Please try again later.</p>}
          <TextInput name="name" handleChange={handleChange} />
          <TextInput name="email" type="email" handleChange={handleChange} />
          <TextInput name="message" type="textarea" handleChange={handleChange} />
          <p className={styles.field}>
            <button className={styles.button} type="submit">
              Send message
            </button>
          </p>
        </div>
      )}
    </NetlifyForm>
  )
}
