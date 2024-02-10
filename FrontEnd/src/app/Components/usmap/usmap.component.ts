import { Component, Input, OnChanges, OnInit, SimpleChanges, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-usmap',
  templateUrl: './usmap.component.html',
  styleUrls: ['./usmap.component.css']
})
export class UsmapComponent implements OnChanges, OnInit {
  @Input() ids: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ids'] && changes['ids'].currentValue) {
      const ids: string[] = changes['ids'].currentValue; // Using bracket notation
      ids.forEach((data: string) => {
        const element = this.el.nativeElement.querySelector(`#${data}`);
        if (element) {
          this.renderer.setStyle(element, 'fill', '#9ADE7B');
          this.renderer.setStyle(element, 'stroke-width', '2.5');
        }
      });
    }
  }

  mouseEnter(id: string) {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    if (element) {
      this.renderer.setStyle(element, 'stroke-width', '2.5');
    }
  }

  mouseLeave(id: string) {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    if (element) {
      this.renderer.setStyle(element, 'stroke-width', '0.970631');
    }
  }
}
