export interface Vocabulary {
  title: string;
  description: string;
  tag: string;
  authorId: string;
  vocabularyId: string;
}

export interface User {
  id: string;
  userName: string;
}

export interface VocabularyWithAuthor extends Vocabulary {
  author: User;
}
