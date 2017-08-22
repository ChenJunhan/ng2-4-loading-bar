import { Injectable } from '@angular/core';
import { LoadingBarComponent } from './loading-bar.component';

/*
  注入service后调用open即弹出，
*/
@Injectable()
export class LoadingBarService {
  public static loading: LoadingBarComponent;
  constructor() { }

  open(): void {
    LoadingBarService.loading.open();
  }

  close(): void {
    LoadingBarService.loading.close();
  }
}
