import { MergeuserPipe } from './mergeuser.pipe';

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MergeuserPipe', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MergeuserPipe]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MergeuserPipe);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wordbook'`, () => {
    const fixture = TestBed.createComponent(MergeuserPipe);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('wordbook');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MergeuserPipe);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'wordbook app is running!'
    );
  });
});
