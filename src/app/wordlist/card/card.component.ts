import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/interfaces/word';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(180deg)'
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)'
        })
      ),

      transition('active => inactive', animate('400ms ease-out')),
      transition('inactive => active', animate('400ms ease-in'))
    ])
  ]
})
export class CardComponent implements OnInit {
  @Input() word: Word;
  flip = 'inactive';
  constructor() {}

  ngOnInit() {}

  toggleFlip() {
    this.flip = this.flip === 'inactive' ? 'active' : 'inactive';
  }
}
