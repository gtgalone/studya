import { merge } from 'lodash/object'
import { combineReducers, AnyAction } from 'redux'
import getConfig from 'next/config'
import { reducer as formReducer } from 'redux-form'

import * as ActionTypes from '../actions'
import { EntitiesState, FilterState, ErrorMessageState, ParcelPolygonState, RootState, ThemeState } from '../../@types/types'

export const _initialState = {}

const defaultEntitiesState: EntitiesState = {
  parcels: {}
}

export const defaultFilterState: FilterState = {
  area: [0, 2000],
  estimatedPrice: [0, 10000000000],
  unitPrice: [0, 80000000],
  age: [0, 60],
  ownType: [],
  mainUse: [],
  landuse: [],
  nearDev: [0, 4],
  areaSafety: [0, 500],
  gfAreaSafety: [0, 2000],
  ageSafety: [40, 60],
  nearDevSafety: [0, 4],
  floor: [2, 5],
  structure: ['목재', '블록', '벽돌', '기타조적', 'PEB', '경량철골', '콘크리트', '기타'],
  maintenanceArea: '0'
}

export const pureFilterState: FilterState = {
  area: [0, 2000],
  estimatedPrice: [0, 10000000000],
  unitPrice: [0, 80000000],
  age: [0, 60],
  ownType: [],
  mainUse: [],
  landuse: [],
  nearDev: [0, 4],
  areaSafety: [0, 500],
  gfAreaSafety: [0, 2000],
  ageSafety: [20, 60],
  nearDevSafety: [0, 4],
  floor: [1, 5],
  structure: [],
  maintenanceArea: '0'
}

function user(state: any = null, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_USER) {
    return action.data
  }
  return state
}

// Updates an entity cache in response to any action with response.entities.
function entities(state: EntitiesState = defaultEntitiesState, action: AnyAction) {
  if (action.response && action.response.entities) {
    // 파셀 갯 수가 5개가 되면 초기화
    if (Object.keys(state.parcels).length > 4) {
      return merge({}, {
        parcels: {
          [Object.keys(state.parcels)[Object.keys(state.parcels).length - 1]]: state.parcels[Object.keys(state.parcels)[Object.keys(state.parcels).length - 1]]
        }
      }, action.response.entities)
    } else {
      return merge({}, state, action.response.entities)
    }
  }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state: ErrorMessageState = null, action: AnyAction) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

function loading(state: boolean = false, action: AnyAction) {
  const { type } = action

  if (type === ActionTypes.SET_LOADING) {
    return action.data
  }

  return state
}

function currentParcel(state: string = null, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_CURRENT_PARCEL) {
    return action.id ? action.id : null
  }

  return state
}

function currentPosition(state: number[] = [], action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_CURRENT_POSITION) {
    return action.data
  }
  return state
}

function selectedParcel(state: ParcelPolygonState = null, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_SELECTED_PARCEL) {
    return action.data ? action.data : null
  }

  return state
}

function isDistrict(state: boolean = false, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_DISTRICT_TYPE) {
    return !state
  }
  return state
}

function routeChange(state: boolean = false, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_ROUTE_CHANGE) {
    return !state
  }
  return state
}

function authModal(state: boolean = false, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_AUTH_MODAL) {
    return !state
  }
  return state
}

function feedbackModal(state: boolean = false, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_FEEDBACK_MODAL) {
    return !state
  }
  return state
}

function isFilter(state: boolean = false, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_IS_FILTER) {
    return action.data
  }
  return state
}

function filter(state: FilterState = defaultFilterState, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_FILTER) {
    return action.data
  }
  return state
}

function isEstimatedPrice(state: boolean = false, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_IS_ESTIMATED_PRICE) {
    return !state
  }
  return state
}

function isDevelopmentCase(state: boolean = false, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_IS_DEVELOPMENT_CASE) {
    return !state
  }
  return state
}


function isDevelopmentCaseSafety(state: boolean = true, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_IS_DEVELOPMENT_CASE_SAFETY) {
    return !state
  }
  return state
}

function isWindows(state: boolean = null, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_IS_WINDOWS) {
    return action.data
  }
  return state
}

// function theme(state: ThemeState = getConfig().publicRuntimeConfig.THEME, action: AnyAction) {
//   const { type } = action
//   if (type == ActionTypes.SET_THEME) {
//     return action.data
//   }
//   return state
// }

function authModalType(state: string = 'prevent', action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_AUTH_MODAL_TYPE) {
    return action.data
  }
  return state
}

function mapType(state: number = 1, action: AnyAction) {
  const { type } = action
  if (type == ActionTypes.SET_MAP_TYPE) {
    return action.data
  }
  return state
}

const rootReducer = combineReducers<RootState>({
  user,
  entities,
  form: formReducer,
  errorMessage,
  loading,
  currentParcel,
  currentPosition,
  selectedParcel,
  isDistrict,
  routeChange,
  authModal,
  isFilter,
  filter,
  isEstimatedPrice,
  isDevelopmentCase,
  isDevelopmentCaseSafety,
  isWindows,
  // theme,
  authModalType,
  mapType,
  feedbackModal
})

export default rootReducer
