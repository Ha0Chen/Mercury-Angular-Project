import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit{
  errorMessage:string | null = null;
  registerFormGroup!:FormGroup;
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<RegisterDialogComponent>,
              private as: AuthService
  ) {

  }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      username: ['admin', [Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, {validators:[RegisterDialogComponent.passwordValidator]}),
      isTeacher: [false]
    });
  }

  static passwordValidator({value:{password, confirmPassword}}:FormGroup):null | {[key:string]:string}{
    return password === confirmPassword ? null : {passwordNotMatch: 'Password and confirmPassword must be the same'};
  }

  register(){
    //auth injection and logics..
    const username = this.registerFormGroup.get("username")?.value;
    const password = this.registerFormGroup.get("passwordGroup")?.value["password"];
    const teacher = this.registerFormGroup.get("isTeacher")?.value;
    // console.log(username, password, isTeacher);
    this.as.register({username, password, teacher}).subscribe(res =>{
      if (res.success){
        this.as.user = JSON.parse(res.user);
        localStorage.setItem('token', res.token);
        this.as.roles = res.roles.map(res=> res.substring(5));
        this.dialogRef.close();
      }else{
        this.errorMessage = res.message;
      }

      console.log(res);
    });



  };
}
