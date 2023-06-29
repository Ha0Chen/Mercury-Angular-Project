import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../shared/services/products.service";
import {UserService} from "../../shared/services/user.service";
import {AuthService} from "../../shared/services/auth.service";
import {Product} from "../../shared/models/product";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
@Component({
  selector: 'app-courses-management',
  templateUrl: './courses-management.component.html',
  styleUrls: ['./courses-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CoursesManagementComponent implements OnInit{
  columnsToDisplay: string[] = ['id','name', 'price', 'sales'];
  dataSource!: MatTableDataSource<Product>;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Product | null | undefined;

  constructor(
    private as: AuthService,
    private ps: ProductsService,
    private us: UserService
  ) {
  }

  ngOnInit(): void {
    if (this.as.user !== null){
      this.us.getCoursesByTeacherName(this.as.user.username).subscribe(res =>{
        console.log(res);
        this.dataSource = new MatTableDataSource<Product>(res);
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
