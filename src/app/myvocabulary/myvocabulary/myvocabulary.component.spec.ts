import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvocabularyComponent } from './myvocabulary.component';

describe('MyvocabularyComponent', () => {
  let component: MyvocabularyComponent;
  let fixture: ComponentFixture<MyvocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyvocabularyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyvocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
