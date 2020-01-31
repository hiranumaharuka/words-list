import { Component, OnInit } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  vocabulary$: Observable<Vocabulary> = this.vocabularyService.getVocabulary(
    this.authService.uid
  );
  constructor(
    private vocabularyService: VocabularyService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
}
