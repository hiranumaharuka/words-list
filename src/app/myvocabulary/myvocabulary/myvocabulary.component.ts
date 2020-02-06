import { VocabularyWithAuthor } from './../../interfaces/vocabulary';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { Observable } from 'rxjs';
import { VocabularyService } from 'src/app/services/vocabulary.service';

@Component({
  selector: 'app-myvocabulary',
  templateUrl: './myvocabulary.component.html',
  styleUrls: ['./myvocabulary.component.scss']
})
export class MyvocabularyComponent implements OnInit {
  vocabulary$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getVocabularies();
  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit() { }
}
