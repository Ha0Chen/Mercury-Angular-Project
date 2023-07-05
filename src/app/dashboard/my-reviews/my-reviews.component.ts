import {Component, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Product} from "../../shared/models/product";
import {MatSort} from "@angular/material/sort";
import {ReviewService} from "../../shared/services/review.service";
import {switchMap} from "rxjs";
import {Order} from "../../shared/models/order";
import {AuthService} from "../../shared/services/auth.service";
import {Review} from "../../shared/models/review";
import {EditCourseComponent} from "../courses-management/edit-course/edit-course.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MyReviewsComponent {
  columnsToDisplay: string[] = ['id','date', 'productName', 'rating'];
  dataSource!: MatTableDataSource<Review>;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Review | null | undefined;
  reviews: Review[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('myTable') table!: MatTable<any>;

  constructor(
    private rs:ReviewService,
    private as:AuthService,
    private dialog: MatDialog,
    private router:Router
  ) {
    if (localStorage.getItem("token") && this.as.user === null){
      this.as.checkLogin().pipe(switchMap(res => {
        this.as.user = JSON.parse(res.user);
        this.as.roles = res.roles.map(res=> res.substring(5));
        return this.rs.findReviewsByUserId(this.as.user?.id as unknown as string);
      })).subscribe(res =>{
        this.dataSource = new MatTableDataSource<Review>(res);
        this.reviews = res;
        this.dataSource.sort = this.sort;
      })
    }else{
      this.getReviewsData();
    }
  }

  getReviewsData(){
    this.rs.findReviewsByUserId(this.as.user?.id as unknown as string).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Review>(res);
        this.reviews = res;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  jumpToPage(element:Review) {
    console.log(`localhost:4200/courses/${element.productId}`);
    this.router.navigate([`courses`, `/${element.productId}`]).catch();
  }
}
