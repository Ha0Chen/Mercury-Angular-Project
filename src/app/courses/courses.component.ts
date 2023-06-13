import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy{
  longText:string = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  deviceXs?:boolean;
  mediaSub?: Subscription;
  constructor(private route: ActivatedRoute,
              public mediaObserver: MediaObserver) { }
  // ngOnChanges() {
  //   this.route.params.subscribe(params => {
  //     this.deviceXs = params['deviceXs']; // Access the parameter value
  //     // Perform any other operations using the parameter value
  //   });
  // }
  ngOnInit() {
    // @ts-ignore
    this.mediaSub = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      this.deviceXs = change[0].mqAlias === "xs" ? true : false;
    });
  }
  ngOnDestroy() {
    // @ts-ignore
    this.mediaSub.unsubscribe();
  }

  topVal = 0;
  onScroll(e:any) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }
}
