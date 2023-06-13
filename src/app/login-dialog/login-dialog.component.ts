import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private auth: AuthService,
              public dialog: MatDialog
  ) {}


  login({value}: NgForm):void{
    // this.auth.login(value).subscribe(res =>{
    //   if (res.success){
    //     this.auth.user = res.user;
    //     localStorage.setItem('token', res.token);
    //     // this.router.navigate(['/products']).catch();
    //     this.dialogRef.close();
    //   }
    // });
    console.log(value);
    this.dialogRef.close();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Perform any necessary actions after the dialog is closed
    });
  }
}
