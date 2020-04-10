import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordresultComponent } from './wordresult.component';

describe('WordresultComponent', () => {
  let component: WordresultComponent;
  let fixture: ComponentFixture<WordresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordresultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
