import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../shared/services/auth.service";
import {ProductsService} from "../../shared/services/products.service";
import {MatDialog} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {ReviewService} from "../../shared/services/review.service";
import {Review} from "../../shared/models/review";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReviewListComponent{
  columnsToDisplay: string[] = ['id', 'orderId', 'date', 'userId', 'userName', 'productId','productName'];
  dataSource!: MatTableDataSource<Review>;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Review | null | undefined;
  reviews: Review[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('myTable') table!: MatTable<any>;
  constructor(
    private as: AuthService,
    private ps: ProductsService,
    private dialog: MatDialog,
    private rs: ReviewService
  ) {
    if (localStorage.getItem("token") && (this.as.user === null || this.as.user == null)){
      this.as.checkLogin().pipe(switchMap(res => {
        this.as.user = JSON.parse(res.user);
        this.as.roles = res.roles.map(res=> res.substring(5));
        return this.rs.findAll();
      })).subscribe(res =>{
        this.dataSource = new MatTableDataSource<Review>(res);
        this.reviews = res;
        console.log(res);
        this.dataSource.sort = this.sort;
      })
    }else{
      this.getReviewsData();
    }
  }

  getReviewsData(){
    if (this.as.user !== null){
      this.rs.findAll().subscribe(res =>{
        this.dataSource = new MatTableDataSource<Review>(res);
        this.dataSource.sort = this.sort;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  delete(id:number) {
    console.log(id);
    this.rs.deleteById(id).subscribe(res =>{
      console.log(res);
      this.getReviewsData();
      this.table.renderRows();
    })
  }

}
