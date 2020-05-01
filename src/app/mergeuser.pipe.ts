import { Pipe, PipeTransform } from '@angular/core';
import { VocabularyService } from './services/vocabulary.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vocabulary } from './interfaces/vocabulary';

@Pipe({
  name: 'mergeuser'
})
export class MergeuserPipe implements PipeTransform {
  constructor(private vocabularyService: VocabularyService) {}
  transform(vocabularies: Vocabulary[]): Observable<any> {
    const authorIds: string[] = vocabularies
      .filter((vocabulary, index, self) => {
        return (
          self.findIndex(item => vocabulary.authorId === item.authorId) ===
          index
        );
      })
      .map(vocabulary => vocabulary.authorId);
    const authors$ = authorIds.map(id => this.vocabularyService.getUser(id));
    return combineLatest(authors$).pipe(
      map(authors => {
        const result = vocabularies.map(vocabulary => {
          return {
            ...vocabulary,
            author: authors.find(author => author.id === vocabulary.authorId)
          };
        });
        return result;
      })
    );
  }
}
