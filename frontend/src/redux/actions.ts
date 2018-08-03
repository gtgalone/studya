import { createFormAction } from 'redux-form-saga'

enum RequestType {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

interface RequestTypes {
  [RequestType.REQUEST]: string
  [RequestType.SUCCESS]: string
  [RequestType.FAILURE]: string
}

function createRequestTypes(base: string) {
  return [
    RequestType.REQUEST,
    RequestType.SUCCESS,
    RequestType.FAILURE,
  ].reduce<RequestTypes>((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {} as RequestTypes)
}

export const PARCEL = createRequestTypes('PARCEL')
export const SELECTED_PARCEL = createRequestTypes('SELECTED_PARCEL')
export const LOGIN = createFormAction('LOGIN')
export const SIGNUP = createFormAction('SIGNUP')
export const FEEDBACK = createFormAction('FEEDBACK')
export const UNCONFIRMATION = createFormAction('UNCONFIRMATION')
export const PASSWORD = createFormAction('PASSWORD')
export const RESET_PASSWORD = createFormAction('RESET_PASSWORD')

export const LOAD_PARCEL_PAGE = 'LOAD_PARCEL_PAGE'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const SET_CURRENT_PARCEL = 'SET_CURRENT_PARCEL'
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION'
export const SET_SELECTED_PARCEL = 'SET_SELECTED_PARCEL'
export const LOAD_SELECTED_PARCEL = 'LOAD_SELECTED_PARCEL'
export const SET_DISTRICT_TYPE = 'SET_DISTRICT_TYPE'
export const SET_ROUTE_CHANGE = 'SET_ROUTE_CHANGE'
export const SET_USER = 'SET_USER'
export const SET_AUTH_MODAL = 'SET_AUTH_MODAL'
export const SET_FEEDBACK_MODAL = 'SET_FEEDBACK_MODAL'
export const SET_IS_FILTER = 'SET_IS_FILTER'
export const SET_FILTER = 'SET_FILTER'
export const SET_IS_ESTIMATED_PRICE = 'SET_IS_ESTIMATED_PRICE'
export const SET_IS_DEVELOPMENT_CASE = 'SET_IS_DEVELOPMENT_CASE'
export const SET_IS_DEVELOPMENT_CASE_SAFETY = 'SET_IS_DEVELOPMENT_CASE_SAFETY'
export const SET_IS_GROSS_PROFIT_CASE = 'SET_IS_GROSS_PROFIT_CASE'
export const SET_LOADING = 'SET_LOADING'
export const SET_IS_WINDOWS = 'SET_IS_WINDOWS'
export const SET_THEME = 'SET_THEME'
export const SET_AUTH_MODAL_TYPE = 'SET_AUTH_MODAL_TYPE'
export const SET_MAP_TYPE = 'SET_MAP_TYPE'

function action(type: string, payload = {}) {
  return { type, ...payload }
}

interface Response {}

interface ActionError {}

export interface Entity {
  request: (endpoint: string, token: string) => any
  success: (endpoint: string, response: Response) => any
  failure: (endpoint: string, error: ActionError) => any
}

export const parcels: Entity = {
  request: (endpoint: string, token: string) => action(PARCEL[RequestType.REQUEST], { endpoint, token }),
  success: (endpoint: string, response: Response) => action(PARCEL[RequestType.SUCCESS], { endpoint, response }),
  failure: (endpoint: string, error: ActionError) => action(PARCEL[RequestType.FAILURE], { endpoint, error }),
}

export const selectedParcel: any = {
  request: (id: string) => action(SELECTED_PARCEL[RequestType.REQUEST], { id }),
  success: (id: string, response: Response) => action(SELECTED_PARCEL[RequestType.SUCCESS], { id, response }),
  failure: (id: string, error: ActionError) => action(SELECTED_PARCEL[RequestType.FAILURE], { id, error }),
}

export const loadParcelPage = (endpoint: string, token: string, requiredFields: string[] = []) => action(LOAD_PARCEL_PAGE, { endpoint, token, requiredFields })
export const setCurrentParcel = (id) => action(SET_CURRENT_PARCEL, { id })
export const setCurrentPosition = (data) => action(SET_CURRENT_POSITION, { data })
export const loadSelectedParcel = (id) => action(LOAD_SELECTED_PARCEL, { id })
export const setSelectedParcel = (data) => action(SET_SELECTED_PARCEL, { data })
export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
export const setDistrictType = () => action(SET_DISTRICT_TYPE)
export const setRouteChange = () => action(SET_ROUTE_CHANGE)
export const setUser = (data) => action(SET_USER, { data })
export const setAuthModal = (data) => action(SET_AUTH_MODAL, { data })
export const setFeedbackModal = (data) => action(SET_FEEDBACK_MODAL, { data })
export const setFilter = (data) => action(SET_FILTER, { data })
export const setIsFilter = (data) => action(SET_IS_FILTER, { data })
export const setIsEstimatedPrice = () => action(SET_IS_ESTIMATED_PRICE)
export const setIsDevelopmentCase = () => action(SET_IS_DEVELOPMENT_CASE)
export const setIsDevelopmentCaseSafety = () => action(SET_IS_DEVELOPMENT_CASE_SAFETY)
export const setIsGrossProfitCase = () => action(SET_IS_GROSS_PROFIT_CASE)
export const setLoading = (data) => action(SET_LOADING, { data })
export const setIsWindows = (data) => action(SET_IS_WINDOWS, { data })
export const setTheme = (data) => action(SET_THEME, { data })
export const setAuthModalType = (data) => action(SET_AUTH_MODAL_TYPE, { data })
export const setMapType = (data) => action(SET_MAP_TYPE, { data })
