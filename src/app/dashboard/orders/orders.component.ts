import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Product} from "../../shared/models/product";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../shared/services/order.service";
import {Order} from "../../shared/models/order";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {CommentDialogComponent} from "./comment-dialog/comment-dialog.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent{
  columnsToDisplay: string[] = ['id','purchaseDate', 'totalPrice'];
  dataSource!: MatTableDataSource<Order>;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Order | null | undefined;
  orders: Order[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('myTable') table!: MatTable<any>;

  constructor(
    private os: OrderService,
    private as: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    if (sessionStorage.getItem("token") && (this.as.user === null || this.as.user == null)){
      this.as.checkLogin().pipe(switchMap(res => {
        this.as.user = JSON.parse(res.user);
        this.as.roles = res.roles.map(res=> res.substring(5));
        return this.os.getOrdersByUserId(this.as.user!.id);
      })).subscribe(res =>{
        this.dataSource = new MatTableDataSource<Order>(res);
        this.orders = res

        this.dataSource.sort = this.sort;
      })
    }else{
      this.getOrdersData();
    }
  }

  getOrdersData(){
    this.os.getOrdersByUserId(this.as.user!.id).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Order>(res);
        this.orders = res;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCommentDialog(item: Product, id:number) {
    // console.log(item, id);
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '600px',
      data: {item, id}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Perform any necessary actions after the dialog is closed
      this.getOrdersData();
      this.table.renderRows();
    });
  }

  jumpToPage(id:number) {
    this.router.navigate([`courses`, `/${id}`]).then(
      () => {
        window.location.reload();
      }
    );
  }
}
