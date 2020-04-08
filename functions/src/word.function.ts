import * as functions from 'firebase-functions';
import { addWordIndex, removeWordIndex, updateWordIndex } from './algolia';

export const createWord = functions.firestore
  .document('vocabularies/{vocabularyId}/words/{wordId}')
  .onCreate(async (snap, context) => {
    return addWordIndex(snap.data());
  });

export const updateWordMeta = functions.firestore
  .document('vocabularies/{vocabularyId}/words/{wordId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();

    if (!newData) {
      throw new Error('データが存在しません');
    }
    return updateWordIndex(newData);
  });

export const deleteWord = functions.firestore
  .document('vocabularies/{vocabularyId}/words/{wordId}')
  .onDelete(async (snapshot, context) => {
    console.log(context.params.wordId + ' deleteword');
    return removeWordIndex(context.params.wordId);
  });
