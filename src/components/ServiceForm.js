import React, { useState, useEffect } from 'react'

import { navigate } from 'gatsby'
import classNames from 'classnames'
import { services, getService, setService, getCalendlyLink } from './Service.js'

import * as styles from '../styles/service-form.module.sass'

export default function ServiceForm() {
  const [state, setState] = useState({ service: Object.keys(services)[0], subject: 'SoftKraft enquiry', path: '/contact/' })
  const [formState, setFormState] = useState('')

  const object = { 'Front-end': 1, 'Back-end': 2, 'Full-stack': 3, Mobile: 4, QA: 5, DevOps: 6, 'UI/UX': 7, Other: 8 }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      setState({ ...state, path: localStorage.getItem('entry') || '/contact/' })
      window.location.hash.length > 0
        ? setState({ ...state, service: setService(window.location.hash.substring(1)) || state.service })
        : setState({ ...state, service: getService() || state.service })
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'form_start',
        formName: 'Contact',
        service: services[state.service]
      })
    }
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    setFormState('loading')

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': form.getAttribute('name'),
        ...state,
        message: state.message + '\n' + object
      }).toString()
    })
      .then(() => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'form_sent',
          formName: 'Contact',
          email: state.email,
          service: services[state.service]
        })

        navigate(form.getAttribute('action'))
        localStorage.removeItem('entry')
        setFormState('success')
      })
      .catch(error => setFormState('error'))
  }

  const handleSelect = e => {
    setState({ ...state, service: setService(e.target.value) || state.service })
  }

  const handleInput = e => {
    handleChange(e)
    e.target.parentNode.classList.toggle('active', e.target.value)
  }

  const handleName = e => {
    setState({ ...state, subject: `SoftKraft enquiry from ${e.target.value}`, name: e.target.value })
    e.target.parentNode.classList.toggle('active', e.target.value)
  }

  return (
    <form
      name="Contact"
      method="post"
      action="/contact/thank-you/"
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
          <select name="service" id="service" value={state.service} required onChange={handleSelect}>
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
        <p className={styles.formField}>
          <input type="checkbox" required id="privacy" />
          <label htmlFor="privacy">
            I consent processing my personal data according to the{' '}
            <a href="/privacy/" target="_blank">
              Privacy Policy
            </a>
          </label>
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
