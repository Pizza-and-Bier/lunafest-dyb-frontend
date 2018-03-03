import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { debounceTime } from "rxjs/operators/debounceTime";

import { RegistrationService } from './registration.service';
import { PasswordMatchValidator } from "../util/password-match-validator";
import { validPhoneValidator } from '../util/valid-phone.validator';
import { SerializationHelper } from '../util';
import { AuthenticatedUser } from '../models';
import { stateAbbreviations } from "./states.const";
import { BaseAuthService } from '../base-services';

@Component({
  selector: 'dyb-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  public currentStep = "";

  public registeringUser = false;

  public registrationSuccess = false;

  public signUpErrorMsg = "";

  public filteredStates: Observable<string[]>;

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
    },
    "contactInfo": {
      "street": "",
      "city": "",
      "state": "",
      "zip": ""
    }
  };

  public states = stateAbbreviations;

  private quotaExceeded = false;

  private validationMessages: any = {
    "loginInfo": {
      "email": {
        "required": "Required.",
        "email": "Invalid email address.",
        "usernameUnavailable": "This email is already in use."
      },
      "password": {
        "required": "Required.",
        "minlength": "At least 10 characters required.",
        "pattern": "Password should container at least one letter and one number."
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
    },
    "contactInfo": {
      "street": "",
      "city": "",
      "state": "",
      "zip": ""
    }
  }


  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private authService: BaseAuthService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.currentStep = "loginInfo";
  }

  public cancel(): void {
    this.router.navigate(["/login"]);
  }

  public nextStep(): void {
    // Doing it this way to eliminate some buttons from the UI.
    switch (this.currentStep) {
      case "loginInfo":
        this.currentStep = "personalInfo";
        break;
      case "personalInfo":
        this.currentStep = "contactInfo";
        break;
      case "contactInfo":
        this.currentStep = "terms";
        break;
      case "terms":
        break;
      default:
        break;
    }
  }

  public previousStep(): void {
    // Doing it this way to eliminate some buttons from the UI.
    switch (this.currentStep) {
      case "terms":
        this.currentStep = "contactInfo";
        break;
      case "contactInfo":
        this.currentStep = "personalInfo";
        break;
      case "personalInfo":
        this.currentStep = "loginInfo";
        break;
      case "loginInfo":
        this.router.navigate(["/login"]);
      default:
        break;
    }
  }

  public getCurrentStepValidity(): boolean {
    return (this.registrationForm.get(this.currentStep).invalid);
  }

  public signupUser(): void {
    const loginInfo = this.registrationForm.get("loginInfo").value;
    delete loginInfo.confirmPassword;
    const personalInfo = this.registrationForm.get("personalInfo").value;
    const contactInfo = this.registrationForm.get("contactInfo").value;
    const combined = Object.assign({}, loginInfo, personalInfo, contactInfo);
    const user = SerializationHelper.toInstance(new AuthenticatedUser(), combined);
    this.registeringUser = true;
    this.registrationService.signupUser(user).then(
      (data) => {
        this.registrationSuccess = true;
        setTimeout((_) => {
          this.router.navigate(["/login"]);
        }, 1000);
      },
      (err: string) => {
        if (err.includes("email already in use.")) {
          this.registeringUser = false;
          this.registrationSuccess = false;
          this.signUpErrorMsg = "It looks like this email is already in use. Try entering another email."
        }
      }
    );
  }

  private buildForm(): void {
    const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9]*.*$/);
    this.registrationForm = this.fb.group({
      "loginInfo": this.fb.group({
        "email": ["", [
          Validators.required,
          Validators.email
        ]],
        "password": ["", [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(passwordPattern)
        ]],
        "confirmPassword": ["", [
          Validators.required,
        ]]
      }, {validator: PasswordMatchValidator.matchPasswords("password", "confirmPassword")
      }),
      "personalInfo": this.fb.group({
        "firstName": ["", [
          Validators.required
        ]],
        "lastName": ["", [
          Validators.required
        ]],
        "phoneNumber": ["", [
          validPhoneValidator()
        ]]
      }),
      "contactInfo": this.fb.group({
        "street": ["", [

        ]],
        "city": ["Iowa City", [

        ]],
        "state": ["IA", [

        ]],
        "zip": ["52240", [

        ]]
      })
    });

    this.registrationForm.statusChanges.subscribe(
      (data) => {
        this.onValueChanged(data);
      }
    );

    this.registrationForm.get("loginInfo").get("email").valueChanges.pipe(
      debounceTime(900)
    ).subscribe(
      (data) => {
        console.log("value change");
        const emailControl = this.registrationForm.get("loginInfo").get("email");
        if (!this.quotaExceeded) {
          this.registrationService.userExists(emailControl.value).then(
            (taken) => {
              if (taken) {
                emailControl.setErrors({"usernameUnavailable": true});
              }
              else {
                emailControl.setErrors(null);
              }
            },
            (err) => {
              if (err.code === "auth/quota-exceeded") {
                this.quotaExceeded = true;
                console.error(err);
              }
              else if (err.code !== "auth/invalid-email") {
                console.error(err);
              }
              else {
                emailControl.setErrors({"email": false});
              }
            }
          )
        }
      }
    )

    this.filteredStates = this.registrationForm.get("contactInfo").get("state").valueChanges
      .pipe(
        startWith('IA'),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );
  }

  private filterStates(name: string) {
    return this.states.filter(state => {
      return state.toLowerCase().indexOf(name.toLowerCase()) === 0;
    });
  }

  private onValueChanged(data?: any): void {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;
    for (const field in this.formErrors) {
      if (form.get(field) !== null && form.get(field) !== undefined) {
        for (const nestedField in this.formErrors[field]) {
          this.formErrors[field][nestedField] = '';
          const control = form.get(field).get(nestedField);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field][nestedField];
            for (const key in control.errors) {
              if (control.errors[key] !== null) {
                this.formErrors[field][nestedField] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  }

}
