import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'educate';
  // @ts-ignore
  mediaSub: Subscription;
  // @ts-ignore
  deviceXs: boolean;
  constructor(public mediaObserver: MediaObserver) {

  }
  ngOnInit() {
    // @ts-ignore
    this.mediaSub = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      // console.log(change[0].mqAlias);
      this.deviceXs = change[0].mqAlias === "xs" ? true : false;
    });
  }
  ngOnDestroy() {
    // @ts-ignore
    this.mediaSub.unsubscribe();
  }
}
