import React, { useState, useEffect } from 'react'

import { navigate } from 'gatsby'
import classNames from 'classnames'
import { services, getService, setService, getCalendlyLink } from './Service.js'

import * as styles from '../styles/service-form.module.sass'
import { NetlifyForm } from 'react-netlify-forms'

export default function ServiceForm() {
  const [state, setState] = useState({ service: Object.keys(services)[0], subject: 'SoftKraft enquiry', path: '/contact/' })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      setState({ ...state, path: localStorage.getItem('entry') || '/contact/' })
      window.location.hash.length > 0
        ? setState({ ...state, service: setService(window.location.hash.substring(1)) || state['service'] })
        : setState({ ...state, service: getService() || state['service'] })
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'form_start',
        formName: 'Contact',
        service: services[state['service']]
      })
    }
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSelect = e => {
    setState({ ...state, service: setService(e.target.value) || state['service'] })
  }

  const handleInput = e => {
    handleChange(e)
    e.target.parentNode.classList.toggle('active', e.target.value)
  }

  const handleName = e => {
    setState({ ...state, subject: `SoftKraft enquiry from ${e.target.value}`, name: e.target.value })
    e.target.parentNode.classList.toggle('active', e.target.value)
  }

  const handleSubmit = e => {
    if (false) {
      e.preventDefault()
      navigate('/contact/submitted/')
    }
  }

  const onFailure = (response, context) => {
    console.log(context.formRef.current.elements)
  }

  const onSuccess = (response, context) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'form_sent',
      formName: 'Contact',
      email: state['email'],
      service: services[state['service']]
    })

    navigate('/contact/thank-you/')
    localStorage.removeItem('entry')
  }

  return (
    <NetlifyForm name="Contact" onSuccess={onSuccess} onFailure={onFailure}>
      {({ success, error, submitting }) => (
        <div className={classNames(styles.contactForm, { loading: submitting, success: success })}>
          <div className={styles.formHeader}>
            <h2>Tell us about your&nbsp;project</h2>
            <p className={styles.formField}>
              <select name="service" id="service" required onChange={handleSelect}>
                {Object.keys(services).map(key => (
                  <option key={key} data-value={key} value={services[key]} selected={key === state['service']}>
                    {services[key]}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <div>
            {/* {success && <p>Thanks for contacting us!</p>} */}
            {error && <p>Sorry, something went wrong</p>}
            <input type="hidden" name="subject" />
            <input type="hidden" name="path" />
            <p className={styles.formField}>
              <label htmlFor={'name'}>Your name</label>
              <input type={'text'} name={'name'} id={'name'} required onChange={handleName} />
            </p>
            <p className={styles.formField}>
              <label htmlFor={'email'}>Email</label>
              <input type={'email'} name={'email'} id={'email'} required onChange={handleInput} />
            </p>
            <p className={styles.formField}>
              <label htmlFor={'message'}>Message</label>
              <textarea type={'text'} name={'message'} id={'message'} required onChange={handleInput} rows={7} />
            </p>
            <p className={styles.formField}>
              <input type="checkbox" required id={'privacy'} />
              <label htmlFor={'privacy'}>
                I consent processing my personal data according to the{' '}
                <a href="/privacy/" target="_blank">
                  Privacy Policy
                </a>
              </label>
            </p>
            <p className={classNames(styles.formField, styles.fieldFlex)}>
              <button disabled={submitting || success} className={styles.formSubmit} onClick={handleSubmit}>
                {submitting ? 'Sending...' : 'Send'}
              </button>
            </p>
          </div>
        </div>
      )}
    </NetlifyForm>
  )
}
