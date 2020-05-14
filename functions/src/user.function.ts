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
    isDeleted: false,
    createdAt: new Date(),
    startDate: null,
    endDate: null
  });
});

export const deleteUserData = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    const uid: string | undefined = context.auth?.uid;
    const vaocabularies = await db
      .collection('vocabularies')
      .where('authorId', '==', uid)
      .get();
    await db
      .doc(`users/${uid}`)
      .update({
        isDeleted: true
      })
      .then(() => {
        vaocabularies.docs.forEach(
          async (vocabulary: {
            data: () => { (): any; new (): any; vocabularyId: any };
          }) => {
            const vocabularyId = vocabulary.data().vocabularyId;
            db.doc(`vocabularies/${vocabularyId}`).update({
              isDeleted: true
            });
            const docs = await db
              .collectionGroup('words')
              .where('vocabularyId', '==', vocabularyId)
              .get();
            return docs.docs.forEach((doc: { data: () => any }) => {
              if (!doc.data().wordId.length) {
                return;
              }
              const wordId = doc.data().wordId;
              db.doc(`vocabularies/${vocabularyId}/words/${wordId}`).update({
                isDeleted: true
              });
            });
          }
        );
      })
      .then(() => {
        admin.auth().deleteUser(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
