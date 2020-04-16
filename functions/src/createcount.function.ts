import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './util.function';

const db = admin.firestore();
// カウントアップ
export const countUpCreate = functions.firestore
  .document('vocabularies/{vocabularyId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      const uid = snap.data()!.authorId;
      if (should) {
        // tslint:disable-next-line: no-floating-promises
        db.doc(`users/${uid}`).update(
          'createdVocabulary',
          admin.firestore.FieldValue.increment(1)
        );
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

//カウントダウン
export const countDownCreate = functions.firestore
  .document('vocabularies/{vocabularyId}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      const uid = snap.data()!.authorId;
      if (should) {
        // tslint:disable-next-line: no-floating-promises
        db.doc(`users/${uid}`).update(
          'createdVocabulary',
          admin.firestore.FieldValue.increment(-1)
        );
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });
