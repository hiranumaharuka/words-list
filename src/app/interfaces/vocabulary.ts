export interface Vocabulary {
  title: string;
  description: string;
  // tags: string[] | firebase.firestore.FieldValue;
  tags: string[];
  authorId: string;
  vocabularyId: string;
  createdAt: Date;
  likedCount: number;
}

export interface User {
  id: string;
  userName: string;
  createdVocabulary: number;
  likedVocabulary: number;
}

export interface VocabularyWithAuthor extends Vocabulary {
  author: User;
}
