import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Product} from "../../shared/models/product";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../shared/services/auth.service";
import {ProductsService} from "../../shared/services/products.service";
import {UserService} from "../../shared/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../shared/services/order.service";
import {Order} from "../../shared/models/order";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

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
    private as: AuthService
  ) {
    if (localStorage.getItem("token") && this.as.user === null){
      this.as.checkLogin().pipe(switchMap(res => {
        this.as.user = JSON.parse(res.user);
        this.as.roles = res.roles.map(res=> res.substring(5));
        return this.os.getOrdersByUserId(this.as.user!.id);
      })).subscribe(res =>{
        this.dataSource = new MatTableDataSource<Order>(res);
        this.orders = res;
        this.dataSource.sort = this.sort;
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
