import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBarComponent } from './loading-bar.component';

describe('LoadingBarComponent', () => {
  let component: LoadingBarComponent;
  let fixture: ComponentFixture<LoadingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
