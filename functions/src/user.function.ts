import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.auth.user().onCreate(user => {
  db.doc(`users/${user.uid}`).set({
    id: user.uid,
    userName: user.displayName,
    createdVocabulary: 0,
    likedVocabulary: 0,
    isCustomer: false,
    createdAt: new Date()
  });
});
