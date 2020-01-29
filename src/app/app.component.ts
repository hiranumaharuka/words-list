import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wordbook';
  constructor(private header: HeaderService) {}
  ngOnInit() {
    this.header.show();
  }
}
