import get from 'lodash/get'

export const bytesToSize = bytes => {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 0) + ' ' + sizes[i]
}

export const handleFile = e => {
  e.stopPropagation()
  const fileInput = get(e, 'target.form.elements.file')
  const fileAttached = e.target.parentNode.querySelector('span')
  const selectedFile = fileInput.files[0]
  fileAttached.style.display = selectedFile ? 'block' : 'none'
  if (selectedFile) {
    fileAttached.childNodes[0].textContent = selectedFile.name
    fileAttached.dataset.size = bytesToSize(selectedFile.size)
  }
}

export const removeFile = e => {
  e.preventDefault()
  const fileInput = get(e, 'target.form.elements.file')
  const fileAttached = e.target.parentNode
  fileAttached.style.display = 'none'
  fileInput.files = null
}
