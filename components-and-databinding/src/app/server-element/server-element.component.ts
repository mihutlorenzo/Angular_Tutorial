import { Component, OnInit, Input, ViewEncapsulation,
  OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
  // tslint:disable-next-line:no-input-rename
  @Input('srvElement') element: {type: string, name: string, content: string};
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit() {
    // console.log(this.header.nativeElement.textContent);
    console.log(this.paragraph.nativeElement.textContent);
    console.log('ngOnInit called');
  }

  ngAfterViewInit() {
    console.log(this.header.nativeElement.textContent);
  }

  ngAfterContentInit() {
    console.log(this.paragraph.nativeElement.textContent);
  }

}
