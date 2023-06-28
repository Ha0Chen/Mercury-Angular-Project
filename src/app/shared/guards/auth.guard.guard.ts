import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../login-dialog/login-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private auth:AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    !localStorage.getItem('token') && this.dialog.open(LoginDialogComponent, {
      width: '300px'
    }).afterClosed().subscribe(result => {
      // Perform any necessary actions after the dialog is closed
      this.router.navigate(['/courses']).catch();
    });
    return !!localStorage.getItem('token');
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    !this.auth.user && this.dialog.open(LoginDialogComponent, {
      width: '300px'
    }).afterClosed().subscribe(result => {
      // Perform any necessary actions after the dialog is closed
      this.router.navigate(['/courses']).catch();
    });
    return !!this.auth.user;
  }

}
