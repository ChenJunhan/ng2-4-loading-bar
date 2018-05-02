import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoadingBarService } from './share/loading-bar/loading-bar.service';
import { PopupService } from './share/popup/popup.service';

@Injectable()
export class CustomHttp extends Http {
  timer: Array<any> = [];
  count = 0;
  sum = 0;

  constructor(
      backend: ConnectionBackend,
      defaultOptions: RequestOptions,
      private loading: LoadingBarService,
      private popup: PopupService
  ) {
      super(backend, defaultOptions);
  }
    request(url: string | Request, options ?: RequestOptionsArgs): Observable < Response > {
 
        // 每多一个请求加一个定时器
        this.timer.push(setTimeout(() => {
            this.loading.open();
        }, 600));
        
        this.count++;
        return this.intercept(super.request(url, options));
    }
    
    get(url: string, options ?: RequestOptionsArgs): Observable < Response > {
        this.count++;
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: string, options ?: RequestOptionsArgs): Observable < Response > {
        this.count++;
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable < Response > {
        this.count++;
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options ?: RequestOptionsArgs): Observable < Response > {
        this.count++;
        return this.intercept(super.put(url, this.getRequestOptionArgs(options)));
    }

    getRequestOptionArgs(options ?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        // options.headers.append('Content-Type', 'application/json');
  
        return options;
    }

    // 拦截器
    intercept(observable: Observable < Response >): Observable < Response > {
        // console.log('请求前');
        return Observable.create((observer) => {
          observable.subscribe(res => {

            // 每完成一个请求sum+1,直到所有的请求完成后才清除loading-bar定时器并关闭
            this.sum++;

            if (this.sum === this.count) {
              this.closeLoading()
            }
            observer.next(res);
          }, (err) => {
            
            observer.error(err);
            this.handleError(err)
            
          }, () => {
            observer.complete(); // 注意添加这句，否则有可能一些第三方的包不能正常使用，如ng2-translate
          });
        });
    }

    // 关闭loading框并清空计数
    closeLoading(): void {

      // 清空count与sum计数
      this.sum = 0;
      this.count = 0;
      setTimeout(() => {
        this.timer.forEach((c, i) => {
          clearTimeout(this.timer[i]);
        });
        if (this.sum === this.count) this.loading.close();     // 如果还有请求未完成则不隐藏loding...
      }, 300)
    }

    // 报错状态码
    handleError(d) {

        let res;
        try {
          res = d.json();
        }catch(error) {

          const status = d.status;
          if (status === 0) {
            this.popup.open('请求响应错误，请检查网络');
            this.closeLoading();
          } else if (status === 404) {
            this.popup.open('请求链接不存在，请联系管理员');
            this.closeLoading();
          } else if (status === 500) {
            this.popup.open('服务器出错，请稍后再试');
            this.closeLoading();
          } else {
            this.popup.open('未知错误，请检查网络');
            this.closeLoading();
          }
          return;
        }

        this.closeLoading();
        this.popup.open(res.message)


    }
}

export function providerHttp( backend: XHRBackend,
                defaultOptions: RequestOptions,
                loading: LoadingBarService,
                popup: PopupService){ return new CustomHttp(backend, defaultOptions, loading, popup) } ;
