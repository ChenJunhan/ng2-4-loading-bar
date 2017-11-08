import { Injectable } from '@angular/core';
import { PopupComponent } from './popup.component';
import { Popup } from './popup';


/**
 * Popup，弹出提示层
 * Usage: 注入service后，调用open方法
 */
@Injectable()
export class PopupService {
  public static popup: PopupComponent;

  constructor() { }

  open(option: any, callback?: () => void): void {

    if (typeof option === 'string') {
      PopupService.popup.setContent(option);
    }

    if (option.content) {
      PopupService.popup.setContent(option.content);
    }

    if (option.callback) {
      callback = option.callback;
    }

    PopupService.popup.open(callback);
  }

  close(): void {
    PopupService.popup.close();
  }
}
