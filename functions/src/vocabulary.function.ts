import * as functions from 'firebase-functions';
import {
  addVocabularyIndex,
  removeVocabularyIndex,
  updateVocabularyIndex
} from './algolia';

export const createVocabulary = functions.firestore
  .document('vocabularies/{vocabularyId}')
  .onCreate(async (snap, context) => {
    return addVocabularyIndex(snap.data());
  });

export const updateVocabularyMeta = functions.firestore
  .document('vocabularies/{vocabularyId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();

    if (!newData) {
      throw new Error('データが存在しません');
    }

    return updateVocabularyIndex(newData);
  });

export const deleteVocabulary = functions.firestore
  .document('vocabularies/{vocabularyId}')
  .onDelete(async (snapshot, context) => {
    console.log(context.params.vocabularyId);
    return removeVocabularyIndex(context.params.vocabularyId);
  });
