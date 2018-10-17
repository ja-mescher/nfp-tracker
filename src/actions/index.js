import { authRef } from '../config/firebase'
import { FETCH_USER } from "./types";

export const fetchUser = () => dispatch => {
  authRef
    .onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: FETCH_USER,
          payload: user
        });
      } else {
        dispatch({
          type: FETCH_USER,
          payload: null
        });
      }
    });
};

export const createUserWithEmailAndPassword = (email, password) => async dispatch => {
  authRef
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error(error);
    });
}

export const signInWithEmailAndPassword = (email, password) => async dispatch => {
  console.log(email, password)
  authRef
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error(error);
    });
}

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.error(error);
    });
};

export const resetPassword = (email) => async dispatch => {
  authRef
    .sendPasswordResetEmail(email)
    .then(() => {
      // Email sent.
    })
    .catch((error) => {
      console.error(error)
    });
}


// import moment from 'moment'
//

//
// export const openObservationId = (observationId) => ({
//   type: OPEN_OBSERVATION,
//   observationId
// })
//
// export const addObservation = (
//   date,
//   flow,
//   consistency,
//   sensation,
//   color,
//   observationCount,
//   intercourse,
//   peak,
//   notes
// ) => ({
//   type: ADD_OBSERVATION,
//   date,
//   dateModified: moment.utc().format('x'),
//   flow,
//   consistency,
//   sensation,
//   color,
//   observationCount,
//   intercourse,
//   peak,
//   notes
// })
//
// export const modifyObservation = (observationId) => ({
//   type: MODIFY_OBSERVATION
// })
//
// export const deleteObservation = (observationId) => ({
//   type: DELETE_OBSERVATION
// })

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
