import moment from 'moment'

export const OPEN_OBSERVATION = 'OPEN_OBSERVATION'
export const ADD_OBSERVATION = 'ADD_OBSERVATION'
export const MODIFY_OBSERVATION = 'MODIFY_OBSERVATION'
export const DELETE_OBSERVATION = 'DELETE_OBSERVATION'

export const openObservationId = (observationId) => ({
  type: OPEN_OBSERVATION,
  observationId
})

export const addObservation = (
  date,
  flow,
  consistency,
  sensation,
  color,
  observationCount,
  intercourse,
  peak,
  notes
) => ({
  type: ADD_OBSERVATION,
  date,
  dateModified: moment.utc().format('x'),
  flow,
  consistency,
  sensation,
  color,
  observationCount,
  intercourse,
  peak,
  notes
})

export const modifyObservation = (observationId) => ({
  type: MODIFY_OBSERVATION
})

export const deleteObservation = (observationId) => ({
  type: DELETE_OBSERVATION
})

// flow
// consistency
// sensation
//
// sensation (boolean lubrication)
// consistency (stretch)
// color
//
// observationCount
// intercourse
// peak
// notes
