import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtagsComponent } from './searchtags.component';

describe('SearchtagsComponent', () => {
  let component: SearchtagsComponent;
  let fixture: ComponentFixture<SearchtagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchtagsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
