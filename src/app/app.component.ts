import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderService } from './header/header.service';
import { LoadingService } from './services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'wordbook';
  loading$: Observable<boolean> = this.loadingService.loading$;
  loading: boolean;
  constructor(
    private header: HeaderService,
    private loadingService: LoadingService
  ) {}
  ngOnInit() {
    this.header.show();
  }
  ngAfterViewInit() {
    this.loading$.subscribe(data => console.log(data));
  }
}
