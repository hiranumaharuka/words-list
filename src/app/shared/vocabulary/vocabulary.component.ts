import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { LikeService } from 'src/app/services/like.service';
import { combineLatest, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit, OnDestroy {
  // 親からvocabularyという型を受け取る
  @Input()
  vocabulary: VocabularyWithAuthor;
  isLiked: boolean;
  likedCount: number;
  vocabularyId: string;
  vocabulary$: Observable<VocabularyWithAuthor>;
  user$ = this.authService.afUser$;
  sub = new Subscription();

  isLiked$ = combineLatest([this.vocabulary$, this.user$]).pipe(
    switchMap(([vocabulary, user]) => {
      return this.likeService.isLiked(vocabulary.vocabularyId, user.uid);
    }),
    tap(isLiked => console.log(isLiked))
  );
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

    this.sub.add(
      this.vocabulary$.subscribe(vocabulary => {
        // これがないと自動でいいねがふくれあがる
        // 2回目以降はif文で弾かれて、最新のlikedcountは代入されない
        if (this.vocabularyId !== vocabulary.vocabularyId) {
          // ページを開いた時点のlikedcountを保持させる、なければ0
          this.likedCount = vocabulary.likedCount || 0;
          console.log(this.vocabularyId);
        }

        console.log(vocabulary.likedCount);
        console.log(vocabulary.vocabularyId);
        console.log(this.vocabularyId);

        this.vocabulary = vocabulary;
        this.vocabularyId = vocabulary.vocabularyId;
      })
    );
    // いいねしてたらisLiked=true,なければfalseを代入
    // 初期状態いいねした状態で表示されるか
    this.sub.add(
      this.isLiked$.subscribe(isLiked => {
        console.log(isLiked);
        this.isLiked = isLiked;
      })
    );
    this.isLiked$.pipe(tap(isLiked => console.log(isLiked)));
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
