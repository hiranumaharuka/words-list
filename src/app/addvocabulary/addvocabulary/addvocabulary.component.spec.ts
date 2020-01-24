import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvocabularyComponent } from './addvocabulary.component';

describe('AddvocabularyComponent', () => {
  let component: AddvocabularyComponent;
  let fixture: ComponentFixture<AddvocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvocabularyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
