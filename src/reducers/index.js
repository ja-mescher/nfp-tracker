import { combineReducers } from 'redux'
import {
  OPEN_OBSERVATION,
  ADD_OBSERVATION,
  MODIFY_OBSERVATION,
  DELETE_OBSERVATION
} from '../actions'

const observations = (state = [], action) => {
  switch(action.type) {
    case ADD_OBSERVATION:
      return state
    case MODIFY_OBSERVATION:
     return state
    case DELETE_OBSERVATION:
      return state
    default:
      return state
  }
}

const openObservationId = (state = null, action) => {
  switch(action.type) {
    case OPEN_OBSERVATION:
      return action.observationId
    case ADD_OBSERVATION:
      return null
    case MODIFY_OBSERVATION:
     return null
    case DELETE_OBSERVATION:
      return null
    default:
      return state
  }
}

export default combineReducers({
  observations,
  openObservationId
})
