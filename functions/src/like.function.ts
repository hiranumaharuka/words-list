import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './util.function';

const db = admin.firestore();
// カウントアップ
export const countUpLiked = functions.firestore
  .document('vocabularies/{vocabularyId}/likedUserIds/{userId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async should => {
      if (should) {
        // tslint:disable-next-line: no-floating-promises
        db.doc(`vocabularies/${context.params.vocabularyId}`).update(
          'likedCount',
          admin.firestore.FieldValue.increment(1)
        );
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

//カウントダウン
export const countDownLiked = functions.firestore
  .document('vocabularies/{vocabularyId}/likedUserIds/{userId}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async should => {
      if (should) {
        // tslint:disable-next-line: no-floating-promises
        db.doc(`vocabularies/${context.params.vocabularyId}`).update(
          'likedCount',
          admin.firestore.FieldValue.increment(-1)
        );
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });
