import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyresultComponent } from './vocabularyresult.component';

describe('VocabularyresultComponent', () => {
  let component: VocabularyresultComponent;
  let fixture: ComponentFixture<VocabularyresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyresultComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
