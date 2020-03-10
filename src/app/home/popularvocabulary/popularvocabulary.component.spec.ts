import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularvocabularyComponent } from './popularvocabulary.component';

describe('PopularvocabularyComponent', () => {
  let component: PopularvocabularyComponent;
  let fixture: ComponentFixture<PopularvocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopularvocabularyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularvocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
