import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.firestore();
const settings = {
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
};
databaseRef.settings(settings)
databaseRef.enablePersistence({synchronizeTabs: true})
  .catch(function(err) {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.warn('Failed Enable Persistence')
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.warn('Failed Enable Persistence')
      }
  });
export const authRef= firebase.auth();
// export const todosRef = databaseRef.child("todos");

export const Timestamp = firebase.firestore.Timestamp
