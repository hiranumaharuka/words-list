import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestvocabularyComponent } from './latestvocabulary.component';

describe('LatestvocabularyComponent', () => {
  let component: LatestvocabularyComponent;
  let fixture: ComponentFixture<LatestvocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestvocabularyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestvocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
