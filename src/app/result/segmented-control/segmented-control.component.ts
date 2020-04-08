import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
type Mode = 'vocabularies' | 'words';
@Component({
  selector: 'app-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss']
})
export class SegmentedControlComponent implements OnInit {
  @Input() mode: Mode;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(map => {
      this.mode = map.get('mode') as Mode;
    });
  }

  ngOnInit() {}
  changeMode(mode: Mode) {
    this.mode = mode;
    // resultの後にqueryparams追加する
    this.router.navigate([/result/], {
      queryParams: {
        mode
      }
    });
  }
}
