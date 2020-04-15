import { Component, OnInit, OnDestroy } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable, Subscription } from 'rxjs';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-latestvocabulary',
  templateUrl: './latestvocabulary.component.html',
  styleUrls: ['./latestvocabulary.component.scss']
})
export class LatestvocabularyComponent implements OnInit, OnDestroy {
  vocabularies$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getLatestVocabularies();

  deleteVocabularyIds = [];
  private sub: Subscription;

  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {
    this.sub = this.vocabularyService.deleteVocabularyId$.subscribe(id => {
      this.deleteVocabularyIds.push(id);
    });
  }

  findIds(vocabularyId) {
    return this.deleteVocabularyIds.find(id => id === vocabularyId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
