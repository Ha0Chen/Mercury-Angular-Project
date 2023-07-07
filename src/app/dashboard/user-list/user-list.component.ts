import {Component, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Order} from "../../shared/models/order";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../shared/services/order.service";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {switchMap} from "rxjs";
import {Product} from "../../shared/models/product";
import {CommentDialogComponent} from "../orders/comment-dialog/comment-dialog.component";
import {User} from "../../shared/models/user";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserListComponent{
  columnsToDisplay: string[] = ['id','username', 'password'];
  dataSource!: MatTableDataSource<User>;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: User | null | undefined;
  users: User[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('myTable') table!: MatTable<any>;

  constructor(
    private os: OrderService,
    private as: AuthService,
    private dialog: MatDialog
  ) {
    if (localStorage.getItem("token") && (this.as.user === null || this.as.user == null)){
      this.as.checkLogin().pipe(switchMap(res => {
        this.as.user = JSON.parse(res.user);
        this.as.roles = res.roles.map(res=> res.substring(5));
        return this.as.findAll();
      })).subscribe(res =>{
        this.dataSource = new MatTableDataSource<User>(res);
        this.users = res
        console.log(res);
        this.dataSource.sort = this.sort;
      })
    }else{
      this.getOrdersData();
    }
  }

  getOrdersData(){
    this.as.findAll().subscribe(
      res => {
        this.dataSource = new MatTableDataSource<User>(res);
        this.users = res;
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
}
