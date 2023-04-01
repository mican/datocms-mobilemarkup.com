import React, { useState, useEffect } from 'react'

import { navigate } from 'gatsby'
import classNames from 'classnames'
import { services, getService, setService, getCalendlyLink } from './Service.js'
import { handleFile, removeFile } from '../utils/form'

import * as styles from '../styles/service-form.module.sass'

export default function ServiceForm() {
  const [data, setData] = useState({ 'form-name': 'Contact', subject: 'SoftKraft enquiry', path: '/contact/' })
  const [formState, setFormState] = useState('')

  // const object = { 'Front-end': 1, 'Back-end': 2, 'Full-stack': 3, Mobile: 4, QA: 5, DevOps: 6, 'UI/UX': 7, Other: 8 }

  // // I need following specialists for 6 months
  // // - 1 x Node.js
  // // - 1 x Glolang

  // const print = object => {
  //   var string = ''
  //   for (const [key, value] of Object.entries(object)) {
  //     string += `- ${value} x ${key}\n`
  //   }
  //   return string
  // }

  const encode = data => {
    const formData = new FormData()
    Object.keys(data).forEach(k => {
      formData.append(k, data[k])
    })
    return formData
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    setFormState('loading')

    fetch('/', {
      body: encode(data),
      method: 'POST'
    })
      .then(() => {
        setFormState('success')
        console.log(new FormData(form))
      })
      .catch(error => setFormState('error'))
  }

  const handleSelect = e => {
    setData({ ...data, service: setService(e.target.value) || data.service })
  }

  const handleInput = e => {
    handleChange(e)
    e.target.parentNode.classList.toggle('active', e.target.value)
  }

  const handleName = e => {
    setData({ ...data, subject: `SoftKraft enquiry from ${e.target.value}`, name: e.target.value })
    e.target.parentNode.classList.toggle('active', e.target.value)
  }

  return (
    <form
      name="Contact"
      method="post"
      action="/contact/thank-you/"
      enctype="multipart/form-data"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={classNames(styles.serviceForm, styles[formState])}
    >
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" onChange={handleChange} />
        </label>
        <input type="hidden" name="form-name" value="Contact" />
        <input type="hidden" name="subject" />
        <input type="hidden" name="path" />
      </p>
      <div className={styles.formHeader}>
        <h2>Tell us about your&nbsp;project</h2>
        <p className={styles.formField}>
          <select name="service" id="service" value={data.service} required onChange={handleSelect}>
            {Object.keys(services).map(key => (
              <option key={key} value={key}>
                {services[key]}
              </option>
            ))}
          </select>
        </p>
      </div>
      <div>
        {/* {formState === 'success' && <p>Thanks for contacting us!</p>}
        {formState === 'error' && <p>Sorry, something went wrong</p>} */}
        <p className={styles.formField}>
          <label htmlFor="name">Your name</label>
          <input type="text" name="name" id="name" required onChange={handleName} />
        </p>
        <p className={styles.formField}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required onChange={handleInput} />
        </p>
        <p className={styles.formField}>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" required rows={7} onChange={handleInput} />
        </p>
        <p className={classNames(styles.formField, 'file')}>
          <input type="file" name="file" id="file" onChange={handleFile} />
          <label htmlFor="file" className={styles.fileLabel}>
            Attach your CV
          </label>
          <span className={styles.fileAttached} data-size="0 kB">
            No file selected <button onClick={removeFile}>Remove</button>
          </span>
        </p>
        <p className={classNames(styles.formField, styles.fieldFlex)}>
          <button disabled={formState === 'loading'} className={styles.formSubmit}>
            {formState === 'loading' ? 'Sending...' : 'Send'}
          </button>
        </p>
      </div>
    </form>
  )
}
