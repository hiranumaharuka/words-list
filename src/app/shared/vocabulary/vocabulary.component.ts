import { Component, OnInit, Input } from '@angular/core';
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
  // 親から型を受け取る
  @Input()
  vocabulary: VocabularyWithAuthor;
  isLiked: boolean;
  isLiked$: Observable<boolean>;
  likedCount: number;
  vocabularyId: string;
  vocabulary$: Observable<VocabularyWithAuthor>;
  user$ = this.authService.afUser$;
  sub = new Subscription();
  userId = this.authService.uid;

  constructor(
    private vocabularyService: VocabularyService,
    private likeService: LikeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.vocabulary$ = combineLatest([
      this.vocabularyService.getVocabulary(this.vocabulary.vocabularyId),
      this.vocabularyService.getUser(this.vocabulary.author.id)
    ]).pipe(
      map(([vocabulary, user]) => {
        const result: VocabularyWithAuthor = {
          ...vocabulary,
          author: user
        };
        return result;
      })
    );
    this.isLiked$ = combineLatest([this.vocabulary$, this.user$]).pipe(
      switchMap(([vocabulary, user]) => {
        return this.likeService.isLiked(
          vocabulary.vocabularyId,
          user && user.uid
        );
      })
    );
    this.sub.add(
      this.vocabulary$.pipe(take(1)).subscribe(vocabulary => {
        // これがないと自動でいいねがふくれあがる
        // 2回目以降はif文で弾かれて、最新のlikedcountは代入されない
        // 等しくなければ最新のlikedcountが入ってくる
        if (this.vocabularyId !== vocabulary.vocabularyId) {
          // ページを開いた時点のlikedcountを保持させる、なければ0
          this.likedCount = vocabulary.likedCount || 0;
        }

        this.vocabulary = vocabulary;
        this.vocabularyId = vocabulary.vocabularyId;
      })
    );
    // いいねしてたらisLiked=true,なければfalseを代入
    // 初期状態いいねした状態で表示されるか
    this.sub.add(
      this.isLiked$.pipe(take(1)).subscribe(isLiked => {
        this.isLiked = isLiked;
      })
    );
  }

  likeVocabulary(uid: string) {
    this.isLiked = true;
    this.likedCount++;
    this.likeService.likeVocabulary(this.vocabulary.vocabularyId, uid);
  }
  dislikeVocabulary(uid: string) {
    this.isLiked = false;
    this.likedCount--;
    this.likeService.dislikeVocabulary(this.vocabulary.vocabularyId, uid);
  }
  deleteVocabulary() {
    this.vocabularyService.deleteVocabulary(this.vocabulary.vocabularyId);
    this.vocabularyService.getDeleteVocabularyId(this.vocabulary.vocabularyId);
  }
}
