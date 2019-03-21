import { authRef, databaseRef } from '../config/firebase'
import {
  FETCH_USER,
  FETCH_USER_DETAILS,
  FETCH_USER_PROFILE,
  CHANGE_OBSERVATION,
  SET_VIEW_DATE
} from "./types";
import { Timestamp } from '../config/firebase'
import format from 'date-fns/format'

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
        dispatch(fetchUserDetails(user))
        dispatch({
          type: FETCH_USER,
          payload: user
        });
      } else {
        dispatch({
          type: FETCH_USER,
          payload: false
        });
      }
    });
};

export const fetchUserDetails= (user) => dispatch => {
  databaseRef
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      const userDetails = doc.data()
      // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(doc.empty)
      console.log(userDetails)
      // console.log(source, " data: ", doc.docs.length);
      if(userDetails.profilePrimary.length !== 0)
      {
        dispatch(fetchUserProfile(userDetails.profilePrimary))
      }
      else if(userDetails.profileSecondary.length !== 0)
      {
        dispatch(fetchUserProfile(userDetails.profileSecondary))
      }
      dispatch({
        type: FETCH_USER_DETAILS,
        payload: userDetails
      });
    });
};

export const fetchUserProfile = (profile) => dispatch => {
  databaseRef
    .collection("profiles")
    .doc(profile)
    .get()
    .then((doc) => {
      // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(doc.empty)
      console.log(doc)
      // console.log(source, " data: ", doc.docs.length);
      dispatch({
        type: FETCH_USER_PROFILE,
        payload: Object.assign({profileId: doc.id}, doc.data())
      });
    });
};

export const createUserWithEmailAndPassword = (email, password) => dispatch => {
  authRef
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error(error);
    });
}

export const signInWithEmailAndPassword = (email, password) => dispatch => {
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

export const resetPassword = (email) => dispatch => {
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

export const fetchObservations = (profileId, startDate, endDate) => (dispatch, getState) => {
  return databaseRef
    .collection("profiles")
    .doc(profileId)
    .collection("observations")
    .where('date', '>=', new Timestamp.fromDate(startDate))
    .where('date', '<=', new Timestamp.fromDate(endDate))
    .onSnapshot(snapshot => {
      if(!snapshot.size) return null;

      snapshot.docChanges().forEach(change => {
        var data = change.doc.data()
        data.date = data.date.toDate()
        dispatch({
          type: CHANGE_OBSERVATION,
          changeType: change.type,
          payload: {
            documentId: change.doc.id,
            hasPendingWrites: change.doc.metadata.hasPendingWrites,
            data
          }
        });
      });
    })
}

export const setObservationData = (profileId, date, dataFieldsObject) => (dispatch, getState) => {
  return databaseRef
    .collection("profiles")
    .doc(profileId)
    .collection("observations")
    .doc(format(date, 'yyyyMMdd'))
    .set({date, ...dataFieldsObject})
}

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
