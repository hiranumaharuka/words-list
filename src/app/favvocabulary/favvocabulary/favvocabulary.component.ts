import { Component, OnInit } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favvocabulary',
  templateUrl: './favvocabulary.component.html',
  styleUrls: ['./favvocabulary.component.scss']
})
export class FavvocabularyComponent implements OnInit {
  vocabulary$: Observable<
    Vocabulary[]
  > = this.vocabularyService.getVocabularies();
  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit() {}
}
