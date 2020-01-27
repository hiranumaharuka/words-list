import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofsaleComponent } from './termsofsale.component';

describe('TermsofsaleComponent', () => {
  let component: TermsofsaleComponent;
  let fixture: ComponentFixture<TermsofsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsofsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
