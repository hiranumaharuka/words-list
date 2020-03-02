import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddwordComponent } from './addword.component';

describe('AddwordComponent', () => {
  let component: AddwordComponent;
  let fixture: ComponentFixture<AddwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddwordComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
