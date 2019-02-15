import { Component, OnInit, Input, OnChanges, ContentChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line:no-input-rename
  @Input('srvElement') element: {type: string, name: string, content: string};
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {
    console.log('constructor called!');
   }


  ngOnInit() {
    console.log('ngOnInit called!');
    console.log('Text content of paragraph' + this.paragraph.nativeElement.textContent);
  }

  ngAfterViewInit() {
    console.log('Text content of paragraph' + this.paragraph.nativeElement.textContent);
  }

}
