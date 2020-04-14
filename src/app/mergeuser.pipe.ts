import { Pipe, PipeTransform } from '@angular/core';
import { VocabularyService } from './services/vocabulary.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'mergeuser'
})
export class MergeuserPipe implements PipeTransform {
  constructor(private vocabularyService: VocabularyService) {}
  transform(vocabularies: { authorId: string }[]): Observable<any> {
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
      map(authors =>
        authors.map((author, index) => {
          return {
            ...vocabularies[index],
            author
          };
        })
      )
    );
  }
}
