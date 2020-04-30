import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';
@Directive({
  selector: '[appView]'
})
export class ViewDirective implements AfterViewInit, OnDestroy {
  @Output() public visible: EventEmitter<any> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;

  constructor(private element: ElementRef) {}

  public ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(entries => {
      console.log(entries[0].intersectionRatio);
      this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(this.element.nativeElement as Element);
  }

  public ngOnDestroy() {
    this.intersectionObserver.disconnect();
  }

  private checkForIntersection = (
    entries: Array<IntersectionObserverEntry>
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const isIntersecting =
        (entry as any).isIntersecting &&
        entry.target === this.element.nativeElement;

      if (isIntersecting) {
        this.visible.emit();
      }
    });
  };
}
