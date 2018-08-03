import { schema, normalize, Schema } from 'normalizr'
import getConfig from 'next/config'
import 'isomorphic-fetch'
import { AxiosInstance } from 'axios'
import { processLogout } from '../../shared/helper/auth-helper'

// Extracts the next page URL from Github API response.
function getNextPageUrl(response: any) {
  const link: string = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint: string, schema: Schema, token: string) {
  const fullUrl = (endpoint.indexOf(getConfig().publicRuntimeConfig.API_URL) === -1) ? getConfig().publicRuntimeConfig.API_URL + endpoint : endpoint
  const options: any = {
    method: 'GET',
    headers: Object.assign(
      {'Site': getConfig().publicRuntimeConfig.CURRENT_SITE},
      token && { 'Authorization': 'Bearer ' + token }
    ),
    credentials: 'include'
  }

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then<{}>(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      const nextPageUrl = getNextPageUrl(response)

      return Object.assign({},
        normalize(json, schema),
        { nextPageUrl }
      )
    })
    .then(
      response => ({response}),
      error => {
        processLogout()
        return { error: error.message || 'Something bad happened' }
      }
    )
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const parcelsSchema = new schema.Entity('parcels')

// api services
export const fetchParcel = (endpoint: string, token: string) => callApi(endpoint, parcelsSchema, token)
export const fetchLogin = async (http: AxiosInstance, payload: any) => {
  // try {
  //   return await http.post('/api/login', {
  //     user: payload,
  //   })
  // } catch (error) {
  //   // error.message
  // }

  return fetch('/api/login', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ user: payload }),
  }).then((response) => response, (error) => {
    error.message //=> String
  })
}

export const fetchSignup = (payload: any) => {
  return fetch('/api/signup', {
    method: 'POST',
    headers : {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({ user: payload })
  }).then((response) => response, (error) => {
    error.message //=> String
  })
}

export const fetchUnconfirmation = (payload: any) => {
  return fetch('/api/unconfirmation', {
    method: 'POST',
    headers : {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  }).then((response) => response, (error) => {
    error.message //=> String
  })
}

export const fetchPassword = (payload: any) => {
  return fetch('/api/password', {
    method: 'POST',
    headers : {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  }).then((response) => response, (error) => {
    error.message //=> String
  })
}

export const fetchResetPassword = (payload: any) => {
  return fetch('/api/reset-password', {
    method: 'POST',
    headers : {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  }).then((response) => response, (error) => {
    error.message //=> String
  })
}

export const fetchFeedback = (payload: any) => {
  return fetch(`${getConfig().publicRuntimeConfig.API_URL}feedbacks`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
      'Site': getConfig().publicRuntimeConfig.CURRENT_SITE
    },
    credentials: 'include',
    body: JSON.stringify({ contents: payload.contents })
  }).then((response) => response, (error) => {
    error.message //=> String
  })
}


export const fetchSelectedParcel = (id: string) => {
  if (id) {
    return fetch(`${getConfig().publicRuntimeConfig.API_URL}pnu_polygons?pnu=${id}`, {
      headers: {
        'Site': getConfig().publicRuntimeConfig.CURRENT_SITE
      },
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(
        response => ({response}),
        error => ({error: error.message || 'Something bad happened'})
      )
  } else {
    return { response: null }
  }
}
