export interface Vocabulary {
  title: string;
  description: string;
  tag: string;
  authorId: string;
  vocabularyId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  userName: string;
}

export interface VocabularyWithAuthor extends Vocabulary {
  author: User;
}
