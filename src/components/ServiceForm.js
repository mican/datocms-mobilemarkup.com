import React, { useState, useEffect } from 'react'
import { NetlifyForm } from 'react-netlify-forms'

import { navigate } from 'gatsby'
import classNames from 'classnames'
import { services, getService as getGlobalService, setService as setGlobalService, getCalendlyLink } from './Service.js'

import * as styles from '../styles/service-form.module.sass'

export default function ServiceForm() {
  const [path, setPath] = useState('')
  const [subject, setSubject] = useState('')
  const [service, setService] = useState(Object.keys(services)[0])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(localStorage.getItem('entry') || '/contact/')
      window.scrollTo(0, 0)
      window.location.hash.length > 0 ? setService(setGlobalService(window.location.hash.substring(1)) || service) : setService(getGlobalService() || service)
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'form_start',
        formName: 'Contact',
        service: services[localStorage.getItem('service')]
      })
    }
  }, [])

  const serviceKeyFrom = value => Object.keys(services).find(key => services[key] === value)

  const handleSelect = e => {
    setService(setGlobalService(serviceKeyFrom(e.target.value)) || service)
  }

  const handleInput = e => {
    e.target.parentNode.classList.toggle('active', e.target.value)
  }

  const updateSubject = e => {
    handleInput(e)
    setSubject(`SoftKraft enquiry from ${e.target.value}`)
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
    var select = context.formRef.current.elements.service
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'form_sent',
      formName: 'Contact',
      email: context.formRef.current.elements.email.value,
      service: select.options[select.selectedIndex].text
    })

    navigate('/contact/thank-you/')
    localStorage.removeItem('entry')
  }

  return (
    <form name="SoftKraft" method="post" netlify className={classNames(styles.serviceForm)}>
      <div className={styles.formHeader}>
        <h2>Tell us about your&nbsp;project</h2>
        <p className={styles.formField}>
          <select name="service[]" id="service" required onChange={handleSelect}>
            {Object.keys(services).map(key => (
              <option key={key} data-value={key} value={services[key]} selected={key === service}>
                {services[key]}
              </option>
            ))}
          </select>
        </p>
      </div>
      <div>
        <input type="hidden" id="subject" name="subject" value={subject} r />
        <input type="hidden" id="path" name="path" value={path} />
        <p className={styles.formField}>
          <label htmlFor={'name'}>Your name</label>
          <input type={'text'} name={'name'} id={'name'} required onChange={updateSubject} />
        </p>
        <p className={styles.formField}>
          <label htmlFor={'email'}>Email</label>
          <input type={'email'} name={'email'} id={'email'} required onChange={handleInput} />
        </p>
        <p className={styles.formField}>
          <label htmlFor={'message'}>Message</label>
          <textarea type={'text'} name={'message'} id={'message'} required rows={7} onChange={handleInput} />
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
          <button disabled={false} className={styles.formSubmit}>
            {false ? 'Sending...' : 'Send'}
          </button>
        </p>
      </div>
    </form>
  )
}
