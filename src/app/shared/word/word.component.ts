import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/interfaces/word';
import { Observable } from 'rxjs';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { ActivatedRoute } from '@angular/router';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { WordService } from 'src/app/services/word.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  @Input()
  word: Word;
  vocabulary$: Observable<Vocabulary>;
  vocabularyId: string;
  editState: boolean;
  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService,
    private wordService: WordService
  ) {}

  ngOnInit() {
    this.vocabulary$ = this.route.paramMap.pipe(
      switchMap(map => {
        const vocabularyId = map.get('vocabularyId');
        return this.vocabularyService.getVocabulary(vocabularyId);
      })
    );
    this.vocabularyId = this.route.snapshot.paramMap.get('vocabularyId');
    console.log(this.editWord());
  }
  deleteWord() {
    this.wordService.deleteWord(this.vocabularyId, this.word.wordId);
  }
  editWord() {
    return (this.editState = true);
  }
}
