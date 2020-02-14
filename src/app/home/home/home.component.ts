import { Component, OnInit } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vocabularies$: Observable<
    VocabularyWithAuthor[]
  > = this.vocabularyService.getLatestVocabularies();
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
