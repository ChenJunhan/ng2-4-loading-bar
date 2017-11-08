import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { PopupService } from './popup.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less'],
  animations: [
    trigger('popup', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})
export class PopupComponent implements OnInit {
  @Input() visible;
  content: string;

  constructor(
    private popup: PopupService
  ) { }

  ngOnInit(): void {
    PopupService.popup = this;
  }

  close(): void {
    this.visible = false;
  }

  open(callback: Function = () => {}): void {
    this.visible = true;

    setTimeout(() => {
      this.close();
      callback();
    }, 2000);
  }

  setContent(text: string) {
    this.content = text;
  }

}
