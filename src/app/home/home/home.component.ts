import { Component, OnInit } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vocabulary$: Observable<
    Vocabulary[]
  > = this.vocabularyService.getVocabularies();
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
