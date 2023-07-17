import {Component, Input} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title:String = "E-ducateeee";
  @Input() deviceXs?:boolean;
  constructor(public dialog: MatDialog,
              public auth: AuthService) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // location.reload();
      // Perform any necessary actions after the dialog is closed
    });
  }

}
