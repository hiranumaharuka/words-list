import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { ActivatedRoute } from '@angular/router';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Word } from 'src/app/interfaces/word';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.scss']
})
export class WordlistComponent implements OnInit {
  vocabulary$: Observable<Vocabulary>;
  userId: string = this.authService.uid;
  lastDoc;
  words: Word[] = [];
  isComplete: boolean;
  vocabularyId: string;
  constructor(
    private route: ActivatedRoute,
    private vocabularyService: VocabularyService,
    private authService: AuthService,
    private wordService: WordService
  ) {}

  ngOnInit(): void {
    this.vocabulary$ = this.route.paramMap.pipe(
      switchMap(map => {
        const vocabularyId = map.get('vocabularyId');
        return this.vocabularyService.getVocabulary(vocabularyId);
      })
    );
    this.vocabularyId = this.route.snapshot.paramMap.get('vocabularyId');
    this.getWords();
  }
  getWords() {
    if (this.isComplete) {
      return;
    }

    this.wordService
      .getWords(this.vocabularyId, this.lastDoc)
      .pipe(take(1))
      .subscribe(docs => {
        if (docs) {
          if (!docs.length) {
            this.isComplete = true;
            return;
          }
          this.lastDoc = docs[docs.length - 1];
          const words = docs.map(doc => doc.data());
          this.words.push(...words);
        }
      });
  }

  deleteWord(wordId: string) {
    const targetIndex = this.words.findIndex(word => word.wordId === wordId);
    this.words.splice(targetIndex, 1);
  }
}
