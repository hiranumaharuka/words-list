import { Component, OnInit, Input } from '@angular/core';
import { Popularwordbook } from 'src/app/interfaces/popularwordbook';

@Component({
  selector: 'app-popularwordbook',
  templateUrl: './popularwordbook.component.html',
  styleUrls: ['./popularwordbook.component.scss']
})
export class PopularwordbookComponent implements OnInit {

  @Input() popularwordbook: Popularwordbook;
  constructor() { }

  ngOnInit() {
  }

}
