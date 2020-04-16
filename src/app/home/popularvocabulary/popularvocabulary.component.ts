import { Component, OnInit, OnDestroy } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-popularvocabulary',
  templateUrl: './popularvocabulary.component.html',
  styleUrls: ['./popularvocabulary.component.scss']
})
export class PopularvocabularyComponent implements OnInit, OnDestroy {
  vocabularies$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getPopularVocabularies();
  deleteVocabularyIds = [];
  private sub: Subscription;
  constructor(private vocabularyService: VocabularyService) {}

  vocabularies: VocabularyWithAuthor[];
  ngOnInit() {
    this.sub = this.vocabularyService.deleteVocabularyId$.subscribe(id => {
      this.deleteVocabularyIds.push(id);
    });
  }

  findId(vocabularyId) {
    return this.deleteVocabularyIds.find(id => id === vocabularyId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
