import React, { useState } from 'react'
import * as styles from '../styles/contact-form.module.sass'

function TextInput({ type = 'text', name, required }) {
  const [value, setValue] = useState('')
  const [v, setV] = useState('')
  var label = name.charAt(0).toUpperCase() + name.slice(1)

  const handleInput = e => {
    setValue('value ' + e.target.value)
    setV('v ' + e.target.value)
  }

  return (
    <p className={styles.field + (value && ' active')}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === 'textarea' && <textarea className={styles.textarea} cols="50" rows="4" name={name} id={name} onChange={handleInput}></textarea>}
      {type !== 'textarea' && <input className={styles.textInput} type={type} name={name} id={name} onChange={handleInput} required={required} />}
    </p>
  )
}

export default function ContactForm({ id }) {
  return (
    <form className={styles.contactForm} name="contact" enctype="multipart/form-data" data-netlify="true" onSubmit="submit">
      <input type="hidden" name="form-name" value="contact" />
      <TextInput name="name" />
      <TextInput name="email" type="email" required />
      <TextInput name="message" type="textarea" required />
      {/* <TextInput name="file" type="file" required /> */}

      <p className={styles.field}>
        <button className={styles.button} type="submit">
          Send message
        </button>
      </p>
    </form>
  )
}
