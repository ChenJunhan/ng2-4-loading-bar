import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';
@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.less']
})
export class LoadingBarComponent implements OnInit {
  show: boolean = false;
  timer;
  constructor() {
    LoadingBarService.loading = this;
  }

  ngOnInit() {
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
