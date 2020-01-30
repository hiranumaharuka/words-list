import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavvocabularyComponent } from './favvocabulary.component';

describe('FavvocabularyComponent', () => {
  let component: FavvocabularyComponent;
  let fixture: ComponentFixture<FavvocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavvocabularyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavvocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
