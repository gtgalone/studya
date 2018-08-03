import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import axios from 'axios'

const calculatePercentage = (loaded: number, total: number) => (Math.floor(loaded * 1.0) / total)

const setupUpdateProgress = () => {
  axios.defaults.onUploadProgress = e => {
    const percentage = calculatePercentage(e.loaded, e.total)
    NProgress.set(percentage)
  }
}

const setupStopProgress = () => {
  axios.interceptors.response.use(response => {
    NProgress.done(true)
    return response
  })
}

export function load(config: NProgressConfigureOptions = {}) {
  if (typeof window !== 'undefined') {
    NProgress.configure(config)
    setupUpdateProgress()
    setupStopProgress()
  }
}
