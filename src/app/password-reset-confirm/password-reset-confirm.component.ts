import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { PasswordMatchValidator } from '../util/password-match-validator';
import { PasswordResetService } from './password-reset.service';

@Component({
  selector: 'dyb-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.scss']
})
export class PasswordResetConfirmComponent implements OnInit {
  
  public passwordFields: FormGroup;

  public codeMissing = false;

  public resettingPassword = false;

  public resetSuccess = false;

  private authCode: string;

  private formErrors = {
    "password": "",
    "confirm": ""
  };

  private validationMessages = {
    "password": {
      "required": "Required.",
      "minlength": "At least 10 characters required.",
      "pattern": "Password should container at least one letter and one number."
    },
    "confirm": {
      "required": "Required.",
      "passwordsDontMatch": "Password fields must match."
    }
  };

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private resetService: PasswordResetService) { }

  ngOnInit() {
    this.buildForm();
    this.activatedRoute.queryParamMap.subscribe(
      (data) => {
        if (data.get("oobCode") && (data.get("mode") === "resetPassword")) {
          console.log("code missing");
          this.codeMissing = false;
          this.authCode = data.get("oobCode");
        }
        else {
          this.codeMissing = true;
        }
      }
    )
  }

  public resetPassword(): void {
    console.log("resetting password");
    this.resettingPassword = true;
    console.log("auth code", this.authCode);
    this.resetService.resetPassword(this.passwordFields.get("password").value, this.authCode).then(
      (data) => {
        this.resetSuccess = true;
      },
      (err) => {
        console.warn(err);
      }
    );
  }

  private buildForm(): void {
    const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9]*.*$/);
    this.passwordFields = this.fb.group({
      "password": ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(passwordPattern)
      ]],
      "confirm": ["", [
        Validators.required
      ]]
    }, {validator: PasswordMatchValidator.matchPasswords("password", "confirm")});
    
    this.passwordFields.statusChanges.subscribe(
      (data) => {
        this.onValueChanged(data);
      }
    );
  }

  private onValueChanged(data?: any): void {
    if (!this.passwordFields) { return; }
    const form = this.passwordFields;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors[key] !== null) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }

}
