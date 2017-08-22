# ng2-4-loading-bar
这是自己写的一款angular2/4 loading-bar插件,封装了http,导入后自动监听项目中所有的http请求,当网络延迟超过0.6s就会触发,也可以在customHttp.ts里面改时间。

## Installation

```sh
git clone git@github.com:ChenJunhan/ng2-4-loading-bar.git
git clone https://github.com/ChenJunhan/ng2-4-loading-bar.git
```

## Usage
1.在customHttp.ts和share文件夹放跟app.module.ts同一级目录中,然后在app.module.ts中引入：
```javascript
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { LoadingBarService } from './share/loading-bar/loading-bar.service';
import { CustomHttp } from './customHttp';
import { providerHttp } from './customHttp';
import { LoadingBarComponent } from './share/loading-bar/loading-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingBarComponent,
  ],
  providers: [
    AppService,
    LoadingBarService,
    {
    provide: Http,
    useFactory: providerHttp,
    deps: [XHRBackend, RequestOptions, LoadingBarService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

2.在app.component.html中写入就可以了：
```javascript
<div id="app">
  <router-outlet></router-outlet>
  <loading-bar></loading-bar>
</div>
```


