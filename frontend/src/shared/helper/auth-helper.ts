import Router from 'next/router'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import isBefore from 'date-fns/is_before'
import moment from 'moment'

axios.defaults.withCredentials = true

const WINDOW_USER_SCRIPT_VARIABLE = `__USER__`

export const decode = ({ token }) => {
  if (!token) {
    return {}
  }
  const { email, type }: any = token
  const { exp } = jwt.decode(token.token)
  return { user: { email, token: token.token, type, exp } }
}

export const getUserScript = (user) => {
  const json = JSON.stringify(user)
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${json};`
}

export const getServerSideToken = (req) => {
  const { signedCookies } = req

  if (!signedCookies) {
    return {}
  }
  try {
    return decode(signedCookies)
  } catch (parseError) {
    return {}
  }
}

export const getClientSideToken = () => {
  if (typeof window !== 'undefined') {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || null
    return { user }
  }
  return { user: null }
}

// const getRedirectPath = (userType) => {
//   switch (userType) {
//     case 'authenticated':
//       return '/profile'
//     default:
//       return '/login'
//   }
// }

const redirect = (res, path) => {
  if (res) {
    res.redirect(302, path)
    res.finished = true
    return {}
  }
  Router.replace(path)
  return {}
}

export const authInitialProps = (redirectIfAuth: boolean = false, secured: boolean = false) => ({ req, res }) => {
  const auth: any = req ? getServerSideToken(req) : getClientSideToken()
  const user = auth.user

  const isAnonymous = !user
  if (secured && isAnonymous) {
    return redirect(res, '/')
  } else if (user && isBefore(moment.unix(user.exp).format(), new Date())) {
    return redirect(res, '/')
  }

  return user
}

export const getProfile = async () => {
  const response = await axios.get('/api/profile')
  return response.data
}

export const processLogin = async ({email, password}) => {
  const response = await axios.post('/api/login', { auth: { email, password } })
  const { data } = response
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || null
  }
  return data
}

export const processLogout = async () => {
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_VARIABLE] = null
  }
  await axios.post('/api/logout')
}
