import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
  //sidebar
  curMinPrice:number = 0;
  curMaxPrice:number = 0;
  maxPrice:number = 300;
  maxSale:number = 500;
  curMinSale:number = 0;
  curMaxSale:number = 0;
  searchContent:string = "";
  sortBy:number = 0;
  curPage:number = 0;
  curSize:number = 5;
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
      this.curMaxPrice = this.maxPrice;
      this.curMaxSale = this.maxSale;
    });

    this.productsService.loadCart();
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
    this.curPage = page;
    this.curSize= size;
    this.productsService.getProductsByPage(page, size, this.curMinPrice, this.curMaxPrice, this.curMinSale, this.curMaxSale, this.searchContent, this.sortBy)
      .subscribe(res => {
      this.products = res.content;
      this.totalPages = res.totalPages;
      this.totalElements = res.totalElements;
    });
  }

  filterProducts(){
    this.productsService.getProductsByPage(this.curPage, this.curSize, this.curMinPrice, this.curMaxPrice, this.curMinSale, this.curMaxSale, this.searchContent, this.sortBy)
      .subscribe(res => {
        this.products = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      });
  }
}
