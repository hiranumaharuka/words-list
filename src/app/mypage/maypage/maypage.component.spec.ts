import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaypageComponent } from './maypage.component';

describe('MaypageComponent', () => {
  let component: MaypageComponent;
  let fixture: ComponentFixture<MaypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
