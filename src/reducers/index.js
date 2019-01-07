import { combineReducers } from 'redux'
import {
  FETCH_USER,
  FETCH_USER_PROFILES,
  CHANGE_OBSERVATION,
  ADD_OBSERVATION,
  MODIFY_OBSERVATION,
  DELETE_OBSERVATION,
  SET_VIEW_DATE
} from '../actions/types'

const user = (state = null, action) => {
  switch(action.type) {
    case FETCH_USER:
      return action.payload
    default:
      return state
  }
}

const userProfiles = (state = [], action) => {
  switch(action.type) {
    case FETCH_USER_PROFILES:
      return action.payload
    default:
      return state
  }
}

const observations = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_OBSERVATION:
      switch(action.changeType) {
        case ADD_OBSERVATION:
        case MODIFY_OBSERVATION:
          return {
            ...state,
            [action.payload.documentId]: {
              hasPendingWrites: action.payload.hasPendingWrites,
              data: action.payload.data
            }
          }
        case DELETE_OBSERVATION:
          let {[action.payload.documentId]: deletedObservation, ...newState} = state
          return newState
        default:
          return state
      }
    default:
      return state
  }
}

const viewDate = (state = new Date(), action) => {
  switch(action.type) {
    case SET_VIEW_DATE:
      return action.viewDate
    default:
      return state
  }
}

export default combineReducers({
  user,
  userProfiles,
  observations,
  viewDate
})
