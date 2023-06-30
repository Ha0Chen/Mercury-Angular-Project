import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../shared/services/products.service";
import {UserService} from "../../shared/services/user.service";
import {AuthService} from "../../shared/services/auth.service";
import {Product} from "../../shared/models/product";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LoginDialogComponent} from "../../login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditCourseComponent} from "./edit-course/edit-course.component";
import {switchMap} from "rxjs";
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
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private as: AuthService,
    private ps: ProductsService,
    private us: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.as.user !== null){
      this.us.getCoursesByTeacherName(this.as.user.username).subscribe(res =>{
        this.dataSource = new MatTableDataSource<Product>(res);
        this.dataSource.sort = this.sort;
      });
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  openEditDialog(element:Product) {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '600px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      // Perform any necessary actions after the dialog is closed
    });
  }

  delete(id:number) {

  }
}
