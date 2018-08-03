import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import withRedux from 'next-redux-wrapper'
import nextReduxSaga from 'next-redux-saga'
import createSagaMiddleware from 'redux-saga'
import axios, { AxiosInstance } from 'axios'
import getConfig from 'next/config'

import rootReducer, { _initialState } from './reducers'
import rootSaga from './saga'

const getTokenFromCookie = req => {
  return req.cookies && req.cookies['swt']
}

export function configureStore(initialState = _initialState, { isServer, req }) {
  let axiosClient: AxiosInstance

  if (isServer) {
    const token = getTokenFromCookie(req)

    axiosClient = axios.create({
      headers: Object.assign(
        { Site: getConfig().publicRuntimeConfig.CURRENT_SITE },
        token && { Authorization: `Bearer ${getTokenFromCookie(req)}` }
      )
    })
  } else {
    axiosClient = axios.create({
      withCredentials: true,
      headers: {
        Site: getConfig().publicRuntimeConfig.CURRENT_SITE
      }
    })
  }

  const sagaMiddleware = createSagaMiddleware({
    context: { http: axiosClient },
  })

  const store: any = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }
  store.runSagaTask()

  return store
}

export function withReduxSaga(BaseComponent: any) {
  return withRedux(configureStore)(nextReduxSaga(BaseComponent))
}
