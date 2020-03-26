import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const firebaseTools = require('firebase-tools');
const db = admin.firestore();

export const recursiveDelete = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .https.onCall(async vocabulary => {
    const path = `vocabularies/${vocabulary.vocabularyId}`;
    const docs = await db
      .collectionGroup('likedVocabularies')
      .where('vocabularyId', '==', vocabulary.vocabularyId)
      .get();
    for (const doc of docs.docs) {
      await doc.ref.delete();
    }
    return firebaseTools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token
      })
      .then(() => {
        return {
          path: path
        };
      });
  });
