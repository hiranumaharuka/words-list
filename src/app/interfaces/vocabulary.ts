export interface Vocabulary {
  title: string;
  description: string;
  tag: string;
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
