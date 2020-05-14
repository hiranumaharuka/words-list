import * as functions from 'firebase-functions';
const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const vocabularyIndex = client.initIndex('vocabularies');
const wordIndex = client.initIndex('words');

const addVocabularyRecords = (vocabulary: any) => {
  const records = vocabulary.description
    .match(/[\s\S]{1,500}/gm)
    .map((description: any, i: number) => {
      return {
        ...vocabulary,
        objectID: vocabulary.vocabularyId + '-' + i,
        description
      };
    });

  return Promise.all(
    records.map((record: any) => vocabularyIndex.saveObject(record))
  );
};

export const addVocabularyIndex = (data: any) => {
  const vocabulary = {
    vocabularyId: data.vocabularyId,
    objectID: data.vocabularyId,
    title: data.title,
    description: data.description,
    createdAt: data.createdAt.toMillis(),
    authorId: data.authorId,
    tags: data.tags,
    likedCount: data.likedCount,
    isDeleted: data.isDeleted
  };
  if (vocabulary.description && vocabulary.description.length > 500) {
    return addVocabularyRecords(vocabulary);
  } else {
    return vocabularyIndex.saveObject(vocabulary);
  }
};

// 削除
export const removeVocabularyIndex = (id: string) => {
  return vocabularyIndex.deleteBy({ filters: `vocabularyId:${id}` }); // 特定のidをもつレコードをすべて削除
};

// 更新
export const updateVocabularyIndex = async (data: any) => {
  const vocabulary = {
    vocabularyId: data.vocabularyId,
    objectID: data.vocabularyId,
    title: data.title,
    description: data.description,
    createdAt: data.createdAt.toMillis(),
    authorId: data.authorId,
    tags: data.tags,
    likedCount: data.likedCount,
    isDeleted: data.isDeleted
  };
  await removeVocabularyIndex(vocabulary.vocabularyId);
  if (vocabulary.description && vocabulary.description.length > 500) {
    return addVocabularyRecords(vocabulary);
  } else {
    return vocabularyIndex.saveObject(vocabulary);
  }
};

const addWordRecords = (word: any) => {
  const records = word.surface
    .match(/[\s\S]{1,500}/gm)
    .map((surface: any, i: number) => {
      return {
        ...word,
        objectID: word.wordId + '-' + i,
        surface
      };
    });
  return Promise.all(
    records.map((record: any) => wordIndex.saveObject(record))
  );
};

export const addWordIndex = (data: any) => {
  const word = {
    surface: data.surface,
    backside: data.backside,
    createdAt: data.createdAt.toMillis(),
    wordId: data.wordId,
    objectID: data.wordId,
    authorId: data.authorId,
    vocabularyId: data.vocabularyId,
    isDeleted: data.isDeleted
  };

  if (word.surface && word.surface.length > 500) {
    return addWordRecords(word);
  } else {
    return wordIndex.saveObject(word);
  }
};

export const removeWordIndex = (id: string) => {
  return wordIndex.deleteBy({ filters: `wordId:${id}` }); // 特定のidをもつレコードをすべて削除
};

export const updateWordIndex = async (data: any) => {
  const word = {
    surface: data.surface,
    backside: data.backside,
    createdAt: data.createdAt.toMillis(),
    wordId: data.wordId,
    objectID: data.wordId,
    authorId: data.authorId,
    vocabularyId: data.vocabularyId,
    isDeleted: data.isDeleted
  };
  await removeWordIndex(word.wordId);
  if (word.surface && word.surface.length > 500) {
    return addWordRecords(word);
  } else {
    return wordIndex.saveObject(word);
  }
};
