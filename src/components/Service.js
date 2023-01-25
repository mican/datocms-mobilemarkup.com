export const services = {
  'dedicated-team': 'Dedicated Team',
  'software-product-development': 'Software Product Development',
  devops: 'Data Engineering & DevOps',
  'it-staff-augmentation': 'IT Staff Augmentation'
}

const servicesMap = {
  'custom-software': 'software-product-development',
  'front-end-development': 'dedicated-team',
  devsecops: 'devops',
  react: 'dedicated-team'
}

export const calendlyLinks = {
  'dedicated-team': false,
  'software-product-development': 'https://calendly.com/softkraft/30min-consultation',
  'it-staff-augmentation': false,
  devops: false
}

export const getService = () => localStorage && localStorage.service

export const setService = service => {
  if (services[servicesMap[service] || service] && localStorage) {
    localStorage.setItem('service', servicesMap[service] || service)
    return servicesMap[service] || service
  }
}
export const getCalendlyLink = service => (typeof calendlyLinks[service] !== 'undefined' ? calendlyLinks[service] : Object.values(calendlyLinks)[0])
