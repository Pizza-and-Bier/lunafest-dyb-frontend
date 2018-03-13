import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

import { LoginService } from '../services/login.service';

import makeCustomValidator from '../util/valid-input.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loggingIn = false;
  private invalidEmail = false;
  private invalidPassword = false;

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

  public loginFromEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.attemptLogin();
    }
  }

  public attemptLogin(): void {
    const credentials = this.loginForm.value;
    this.loggingIn = true;
    this.loginService.attemptLogin(credentials).then(
      (data) => {
        this.router.navigate(["/user/items/list"]);
      },
      (err) => {
        this.loggingIn = false;

        if (err.code === 'auth/user-not-found') {
          this.invalidEmail = true;
          this.formErrors.email = err.message;
        }
        if (err.code === 'auth/wrong-password') {
          this.invalidPassword = true;
          this.formErrors.password = err.message;
        }
      }
    );
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      "email": ["", [
        Validators.required,
        Validators.email,
        makeCustomValidator(() => (!this.invalidEmail), 'email')
      ]],
      "password": ["", [
        Validators.required,
        makeCustomValidator(() => (!this.invalidPassword), 'password')
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

    this.invalidEmail = false;
    this.invalidPassword = false;

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
