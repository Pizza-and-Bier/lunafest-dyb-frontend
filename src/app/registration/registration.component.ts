import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkStepper } from '@angular/cdk/stepper';

import { RegistrationService } from '../services/registration.service';
import { PasswordMatchValidator } from "../util/password-match-validator";
import { validPhoneValidator } from '../util/valid-phone.validator';


@Component({
  selector: 'dyb-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  public currentStep: string = "";

  public formErrors: any = {
    "loginInfo": {
      "email": "",
      "password": "",
      "confirmPassword": ""
    },
    "personalInfo": {
      "firstName": "",
      "lastName": "",
      "phoneNumber": ""
    }
  };

  private validationMessages: any = {
    "loginInfo": {
      "email": {
        "required": "Required.",
        "email": "Invalid email address."
      },
      "password": {
        "required": "Required.",
        "minlength": "At least 10 characters required."
      },
      "confirmPassword": {
        "required": "Required.",
        "passwordsDontMatch": "Password fields must match"
      }
    },
    "personalInfo": {
      "firstName": {
        "required": "Required."
      },
      "lastName": {
        "required": "Required."
      },
      "phoneNumber": {
        "required": "Required.",
        "validPhoneNumber": "Invalid phone number."
      }
    }
  }


  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.currentStep = "loginInfo";
  }

  public nextStep(stepName: string): void {
    this.currentStep = stepName;
  }

  public previousStep(stepName: string): void {
    this.currentStep = stepName;
  }

  public setPhoneField(data): void {
    console.log(data);
    this.registrationForm.get("personalInfo").get("phoneNumber").markAsDirty();
    this.registrationForm.get("personalInfo").get("phoneNumber").setValue(data);
    this.registrationForm.get("personalInfo").get("phoneNumber").updateValueAndValidity();
  }

  public signupUser(): void {
    
  }

  private buildForm(): void {
    this.registrationForm = this.fb.group({
      "loginInfo": this.fb.group({
        "email": ["", [
          Validators.required,
          Validators.email
        ]],
        "password": ["", [
          Validators.required,
          Validators.minLength(10)
        ]],
        "confirmPassword": ["", [
          Validators.required,
        ]],
      }, {validator: PasswordMatchValidator.matchPasswords("password", "confirmPassword")}),
      "personalInfo": this.fb.group({
        "firstName": ["", [
          Validators.required
        ]],
        "lastName": ["", [
          Validators.required
        ]],
        "phoneNumber": ["", [
          Validators.required,
          validPhoneValidator()
        ]]
      })
    });

    this.registrationForm.statusChanges.subscribe(
      (data) => {
        this.onValueChanged(data);
      }
    )
  }

  private onValueChanged(data?: any): void {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;
    
      for (const field in this.formErrors) {
        if (field === "loginInfo" || field === "personalInfo") {
          if (form.get(field) !== null && form.get(field) !== undefined) {
            for (const nestedField in this.formErrors[field]) {
              this.formErrors[field][nestedField] = '';
              const control = form.get(field).get(nestedField);
              if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field][nestedField];
                for (const key in control.errors) {
                  this.formErrors[field][nestedField] += messages[key] + ' ';
                }
              }
            }
          }
        }
        else {
          // clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
  }

}
