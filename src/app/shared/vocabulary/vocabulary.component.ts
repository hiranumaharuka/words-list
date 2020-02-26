import { Component, OnInit, Input } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { LikeService } from 'src/app/services/like.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {
  // 親からvocabularyという型を受け取る
  @Input() vocabulary: VocabularyWithAuthor;
  isLiked$: Observable<boolean>;

  constructor(
    private vocabularyService: VocabularyService,
    private likeService: LikeService,
    private db: AngularFirestore,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  likeVocabulary() {
    this.likeService.likeVocabulary(
      this.vocabulary.vocabularyId,
      this.authService.uid
    );
  }
  dislikeVocabulary() {
    this.likeService.dislikeVocabulary(
      this.vocabulary.vocabularyId,
      this.authService.uid
    );
  }
}
