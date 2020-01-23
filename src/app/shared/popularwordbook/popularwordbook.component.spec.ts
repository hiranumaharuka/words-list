import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularwordbookComponent } from './popularwordbook.component';

describe('PopularwordbookComponent', () => {
  let component: PopularwordbookComponent;
  let fixture: ComponentFixture<PopularwordbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularwordbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularwordbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
