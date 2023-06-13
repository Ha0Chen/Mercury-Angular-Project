import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit{
  registerFormGroup!:FormGroup;
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<RegisterDialogComponent>) {

  }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      username: ['admin', [Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, {validators:[RegisterDialogComponent.passwordValidator]})
    });
  }

  static passwordValidator({value:{password, confirmPassword}}:FormGroup):null | {[key:string]:string}{
    return password === confirmPassword ? null : {passwordNotMatch: 'Password and confirmPassword must be the same'};
  }

  register(){
    //auth injection and logics..
    const username = this.registerFormGroup.get("username")?.value;
    const password = this.registerFormGroup.get("passwordGroup")?.value["password"];
    console.log(username, password);
    this.dialogRef.close();
  };
}
