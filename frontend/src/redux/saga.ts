/* eslint-disable no-constant-condition */
import { take, put, call, fork, all, getContext } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import formActionSaga from 'redux-form-saga'
import { toast } from 'react-toastify'

import { api } from './services'
import * as actions from './actions'
import { decode } from '../shared/helper/auth-helper'

// each entity defines 3 creators { request, success, failure }
const { parcels, LOGIN, SIGNUP, UNCONFIRMATION, PASSWORD,
  RESET_PASSWORD, FEEDBACK, setLoading, selectedParcel } = actions
const WINDOW_USER_SCRIPT_VARIABLE = `__USER__`
/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | id
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity: actions.Entity, apiFn: (...args: any[]) => any, id: string, token: string, url: string) {
  yield put( entity.request(id, token) )
  yield put( setLoading(true) )

  const {response, error} = yield call(apiFn, url || id, token)

  if (response) {
    yield put( entity.success(id, response) )
    yield put( setLoading(false) )
  } else {
    yield put( entity.failure(id, error) )
    yield put( setLoading(false) )
  }
}

// yeah! we can also bind Generators
export const fetchParcel = fetchEntity.bind(null, parcels, api.fetchParcel)

// load user unless it is cached
function* loadParcel(endpoint: string, token: string) {
  yield call(fetchParcel, endpoint, token)
}

function* submitLogin(payload: any) {
  try {
    const http = yield getContext('http')

    const response = yield call(api.fetchLogin, http, payload)
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    if (response.status == 403) {
      yield put(actions.setAuthModalType('unconfirmation'))
      return
    } else if (response.status == 422) {
      throw response
    } else {
      yield put(LOGIN.success())

      const user = decode({ token: yield response.json() }).user

      if (typeof window !== 'undefined') {
        window[WINDOW_USER_SCRIPT_VARIABLE] = user || null
        window.gtag('set', { user_id: user.email })
      }

      yield put(actions.setUser(user))
      yield put(actions.setAuthModal(false))

      toast(`${user.email}님 환영합니다`)
    }

  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      // email: 'User with this login is not found', // specific field error
      _error: '이메일/비밀번호를 다시 확인해주세요.', // global form error
    })

    yield put(LOGIN.failure(formError))
  }
}

function* submitSignup(payload: any) {
  try {
    yield call(api.fetchSignup, payload)
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    yield put(SIGNUP.success())
    yield put(actions.setAuthModal(false))

    toast(`${payload.email}(으)로 인증메일을 보냈습니다. 이메일에 있는 링크를 클릭해주세요!`)

    // do something else here ...
  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      // email: 'User with this login is not found', // specific field error
      _error: '입력 내용을 다시 확인해주세요.', // global form error
    })

    yield put(SIGNUP.failure(formError))
  }
}

function* submitUnconfirmation(payload: any) {
  try {
    yield call(api.fetchUnconfirmation, payload)
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    yield put(UNCONFIRMATION.success())
    yield put(actions.setAuthModal(false))

    toast(`${payload.email}(으)로 인증메일을 보냈습니다. 이메일에 있는 링크를 클릭해주세요!`)

    // do something else here ...
  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      // email: 'User with this login is not found', // specific field error
      _error: '입력 내용을 다시 확인해주세요.', // global form error
    })

    yield put(UNCONFIRMATION.failure(formError))
  }
}

function* submitPassword(payload: any) {
  try {
    yield call(api.fetchPassword, payload)
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    yield put(PASSWORD.success())
    yield put(actions.setAuthModal(false))

    toast(`${payload.email}(으)로 인증메일을 보냈습니다. 이메일에 있는 링크를 클릭해주세요!`)

    // do something else here ...
  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      // email: 'User with this login is not found', // specific field error
      _error: '입력 내용을 다시 확인해주세요.', // global form error
    })

    yield put(PASSWORD.failure(formError))
  }
}

function* submitResetPassword(payload: any) {
  try {
    const http = yield getContext('http')
    console.log(http)

    yield call(api.fetchResetPassword, payload)
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    yield put(RESET_PASSWORD.success())

    // do something else here ...
  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      // email: 'User with this login is not found', // specific field error
      _error: '입력 내용을 다시 확인해주세요.', // global form error
    })

    yield put(RESET_PASSWORD.failure(formError))
  }
}

function* submitFeedback(payload: any) {
  try {
    yield call(api.fetchFeedback, payload)
    // it should return promise
    // promise should be resolved if login successfull
    // or rejected if login credentials is wrong

    // so if apiClient promise resolved, then we can notify our form about successful response
    yield put(FEEDBACK.success())

    // do something else here ...
  } catch (error) {
    // if apiClient promise rejected, then we will be here
    // we need mark form as failed and pass errors to it
    const formError = new SubmissionError({
      // email: 'User with this login is not found', // specific field error
      _error: '입력 내용을 다시 확인해주세요.', // global form error
    })

    yield put(FEEDBACK.failure(formError))
  }
}

function* setSelectedParcel(id: string) {
  const {response, error} = yield call(api.fetchSelectedParcel, id)

  if (response) {
    yield put( selectedParcel.success(id, response) )
    yield put( actions.setSelectedParcel(response) )
  } else {
    yield put( selectedParcel.failure(id, error) )
    yield put( actions.setSelectedParcel(null) )
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchLoadParcelPage() {
  while(true) {
    const { endpoint, token, requiredFields = [] } = yield take(actions.LOAD_PARCEL_PAGE)
    yield fork(loadParcel, endpoint, token, requiredFields)
  }
}

function* watchSubmitLogin() {
  while(true) {
    const { payload } = yield take(LOGIN.REQUEST)

    yield fork(submitLogin, payload)
  }
}

function* watchSubmitSignup() {
  while(true) {
    const { payload } = yield take(SIGNUP.REQUEST)

    yield fork(submitSignup, payload)
  }
}

function* watchSubmitUnconfirmation() {
  while(true) {
    const { payload } = yield take(UNCONFIRMATION.REQUEST)

    yield fork(submitUnconfirmation, payload)
  }
}

function* watchSubmitPassword() {
  while(true) {
    const { payload } = yield take(PASSWORD.REQUEST)

    yield fork(submitPassword, payload)
  }
}

function* watchSubmitResetPassword() {
  while(true) {
    const { payload } = yield take(RESET_PASSWORD.REQUEST)

    yield fork(submitResetPassword, payload)
  }
}

function* watchSubmitFeedback() {
  while(true) {
    const { payload } = yield take(FEEDBACK.REQUEST)

    yield fork(submitFeedback, payload)
  }
}

function* watchSetSelectedParcel() {
  while(true) {
    const { id } = yield take(actions.LOAD_SELECTED_PARCEL)

    yield fork(setSelectedParcel, id)
  }
}

export default function* root() {
  yield all([
    fork(watchLoadParcelPage),
    fork(watchSubmitLogin),
    fork(watchSubmitSignup),
    fork(watchSubmitFeedback),
    fork(watchSetSelectedParcel),
    fork(formActionSaga),
    fork(watchSubmitUnconfirmation),
    fork(watchSubmitPassword),
    fork(watchSubmitResetPassword)
  ])
}
