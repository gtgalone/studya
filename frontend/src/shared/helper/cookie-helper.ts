export const setCookie = (cname, cvalue, exdays) => {
  if (typeof window === 'undefined') {
    return
  }
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires='+d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const getCookie = (cname) => {
  if (typeof window === 'undefined') {
    return null
  }
  let name = cname + '='
  let ca = document.cookie.split(';')
  for(let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
          c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length)
      }
  }
  return null
}