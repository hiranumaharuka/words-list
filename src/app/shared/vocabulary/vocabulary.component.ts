import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { VocabularyWithAuthor } from 'src/app/interfaces/vocabulary';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { LikeService } from 'src/app/services/like.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit, OnDestroy {
  @Output() deleted = new EventEmitter();
  @Input() vocabulary: VocabularyWithAuthor;
  isLiked: boolean;
  user$ = this.authService.afUser$;
  sub = new Subscription();
  userId = this.authService.uid;

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
    this.deleted.emit(this.vocabulary.vocabularyId);
    this.vocabularyService.getDeleteVocabularyId(this.vocabulary.vocabularyId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
