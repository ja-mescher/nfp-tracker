import { authRef, databaseRef } from '../config/firebase'
import {
  FETCH_USER,
  FETCH_USER_PROFILES,
  FETCH_PROFILE_OBSERVATIONS,
  CHANGE_OBSERVATION,
  SET_VIEW_DATE
} from "./types";

var firebaseUnsubscribes = {}

export const unsubscribeFirebaseListener = (listenerId) => {
  var unsubscribe = firebaseUnsubscribes[listenerId]
  unsubscribe()
  delete firebaseUnsubscribes[listenerId]
}

export const fetchUser = () => dispatch => {
  authRef
    .onAuthStateChanged(user => {
      if (user) {
        dispatch(fetchUserProfiles(user))
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

export const fetchUserProfiles = (user) => async dispatch => {
  firebaseUnsubscribes[FETCH_USER_PROFILES] = databaseRef
    .collection("profiles")
    .where("users", "array-contains", user.uid)
    .get()
    .then((doc) => {
      // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(doc.empty)
      console.log(doc)
      // console.log(source, " data: ", doc.docs.length);
      dispatch({
        type: FETCH_USER_PROFILES,
        payload: doc.docs.map(doc => Object.assign({documentId: doc.id}, doc.data()))
      });
      if(doc.docs.length === 1) dispatch(fetchProfileObservations(doc.docs[0].id))
    });
};

export const fetchProfileObservations = (documentId) => async dispatch => {
  firebaseUnsubscribes[FETCH_PROFILE_OBSERVATIONS] = databaseRef
    .collection("profiles")
    .doc(documentId)
    .collection("observations")
    .onSnapshot(snapshot => {
      if(!snapshot.size) return null;

      snapshot.docChanges().forEach(change => {
        dispatch({
          type: CHANGE_OBSERVATION,
          changeType: change.type,
          payload: {
            documentId: change.doc.id,
            hasPendingWrites: change.doc.metadata.hasPendingWrites,
            data: change.doc.data()
          }
        });
      });
    })
}

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

export const setViewDate = (viewDate) => ({
  type: SET_VIEW_DATE,
  viewDate
})

//
// export const openObservationId = (observationId) => ({
//   type: OPEN_OBSERVATION,
//   observationId
// })
//
// dateModified: date.format('x'),
// export const addObservation = (
//   observationId,
//   date,
//   dateModified,
//   flow,
//   consistency,
//   sensation,
//   color,
//   observationCount,
//   intercourse,
//   peak,
//   notes = ""
// ) => ({
//   type: ADD_OBSERVATION,
//   observationId,
//   date,
//   dateModified,
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
