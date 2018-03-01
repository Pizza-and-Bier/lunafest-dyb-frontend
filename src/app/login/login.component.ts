import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public invalidLogin: boolean = false;

  public formErrors: any = {
    "email": "",
    "password": ""
  };

  private validationMessages: any = {
    "email": {
      "required": "Required.",
      "email": "Invalid email address."
    },
    "password": {
      "required": "Required."
    }
  }

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  public attemptLogin(): void {
    let credentials = this.loginForm.value;
    this.loginService.attemptLogin(credentials).then(
      (data) => {
        console.log(data);
        this.router.navigate(["/user/items/list"]);
      }
    );
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      "email": ["", [
        Validators.required,
        Validators.email
      ]],
      "password": ["", [
        Validators.required
      ]]
    })

    this.loginForm.statusChanges
      .subscribe((data) => {
        this.onValueChanged(data);
      })

    this.onValueChanged();
  }

  private onValueChanged(data?: any): void {
    let form = this.loginForm;

    for (let field in this.formErrors) {
      if (form.get(field) !== null && form.getError(field) !== undefined) {
        this.formErrors[field] = "";
        let control = form.get(field);
        if (control && control.dirty && control.invalid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += `${messages[key]} `;
          }
        }
      }
    }
  }

}
