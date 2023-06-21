import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {ProductsService} from "../shared/services/products.service";
import {Product} from "../shared/models/product";
import {Page} from "../shared/models/page";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy{
  deviceXs?:boolean;
  mediaSub?: Subscription;
  products: Product[] | undefined;
  totalPages: number | undefined;
  totalElements:number | undefined;
  constructor(private route: ActivatedRoute,
              public mediaObserver: MediaObserver,
              private productsService: ProductsService
  ) { }
  ngOnInit() {
    // @ts-ignore
    this.mediaSub = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      this.deviceXs = change[0].mqAlias === "xs" ? true : false;
    });
    this.productsService.getProducts().subscribe(res => {
      this.products = res.content;
      this.totalPages = res.totalPages;
      this.totalElements = res.totalElements;
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

  handlePageEvent(event:PageEvent) {
    let page:number = event.pageIndex;
    let size:number = event.pageSize;
    this.productsService.getProductsByPage(page, size).subscribe(res => {
      this.products = res.content;
    });
  }
}
