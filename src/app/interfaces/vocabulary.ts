export interface Vocabulary {
  title: string;
  description: string;
  tags: string[];
  authorId: string;
  vocabularyId: string;
  createdAt: Date;
  likedCount: number;
  isDeleted: boolean;
}

export interface User {
  id: string;
  userName: string;
  createdVocabulary: number;
  likedVocabulary: number;
  isCustomer: boolean;
  createdAt: Date;
  startDate: number;
  endDate: number;
  isDeleted: boolean;
}
export interface Customer {
  customerId: string;
  uid: string;
}

export interface VocabularyWithAuthor extends Vocabulary {
  author: User;
}
