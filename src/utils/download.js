import axios from 'axios'

const service = axios.create({
  responseType: 'arraybuffer'
})

service.interceptors.request.use(
  config => {
    config.headers.Authorization = window.sessionStorage.getItem('tokenStr')
    return config
  },
  error => {
    console.log(error)
  }
)

service.interceptors.response.use(
  resp => {
    const headers = resp.headers
    const reg = RegExp(/application\/json/)
    if (headers['content-type'].match(reg)) {
      resp.data = unitToString(resp.data)
    } else {
      const fileDownload = require('js-file-download')
      let fileName = headers['content-disposition'].split(';')[1].split('filename=')[1]
      const contentType = headers['content-type']
      fileName = decodeURIComponent(fileName)
      fileDownload(resp.data, fileName, contentType)
    }
  },
  error => {
    console.log(error)
  }
)

function unitToString(unitArray) {
  const encodedString = String.fromCharCode.apply(null, new Uint8Array(unitArray))
  const decodedString = decodeURIComponent(escape(encodedString))
  return JSON.parse(decodedString)
}

const base = ''
export const downloadRequest = (url, params) => {
  return service({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}

export default service
