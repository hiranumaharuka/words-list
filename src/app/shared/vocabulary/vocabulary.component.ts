import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { LikeService } from 'src/app/services/like.service';
import { combineLatest, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {
  @Output() deleted = new EventEmitter();
  @Input() vocabulary: VocabularyWithAuthor;

  isLiked: boolean;
  userId = this.authService.uid;
  sub = new Subscription();
  user$ = this.authService.afUser$;

  constructor(
    private vocabularyService: VocabularyService,
    private likeService: LikeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initLikeStatus();
  }

  initLikeStatus() {
    const isLiked$ = this.likeService.isLiked(
      this.vocabulary.vocabularyId,
      this.userId
    );

    // いいねしてたらisLiked=true,なければfalseを代入
    // 初期状態いいねした状態で表示されるか
    this.sub.add(
      isLiked$.subscribe(isLiked => {
        this.isLiked = isLiked;
      })
    );
  }

  likeVocabulary(uid: string) {
    this.isLiked = true;
    this.vocabulary.likedCount++;
    this.likeService.likeVocabulary(this.vocabulary.vocabularyId, uid);
  }

  dislikeVocabulary(uid: string) {
    this.isLiked = false;
    this.vocabulary.likedCount--;
    this.likeService.dislikeVocabulary(this.vocabulary.vocabularyId, uid);
  }

  deleteVocabulary() {
    this.vocabularyService.deleteVocabulary(this.vocabulary.vocabularyId);
    this.vocabularyService.getDeleteVocabularyId(this.vocabulary.vocabularyId);
    this.deleted.emit(this.vocabulary.vocabularyId);
  }
}
