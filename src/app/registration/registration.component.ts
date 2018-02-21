import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { RegistrationService } from './registration.service';
import { PasswordMatchValidator } from "../util/password-match-validator";
import { validPhoneValidator } from '../util/valid-phone.validator';
import { SerializationHelper } from '../util';
import { AuthenticatedUser } from '../models';
import { stateAbbreviations } from "./states.const";
import { BaseAuthService } from '../base-services';
import { UsernameAvaialableValidator } from '../util/username-available.validator';

@Component({
  selector: 'dyb-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  public currentStep = "";

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

  private validationMessages: any = {
    "loginInfo": {
      "email": {
        "required": "Required.",
        "email": "Invalid email address.",
        "usernameUnavailable": "This email is already in use."
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
    },
    "contactInfo": {
      "street": "",
      "city": "",
      "state": "",
      "zip": ""
    }
  }


  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router, private authService: BaseAuthService) { }

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
    const loginInfo = this.registrationForm.get("loginInfo").value;
    delete loginInfo.confirmPassword;
    const personalInfo = this.registrationForm.get("personalInfo").value;
    delete personalInfo.smsOptIn;
    const contactInfo = this.registrationForm.get("contactInfo").value;
    const combined = Object.assign({}, loginInfo, personalInfo, contactInfo);
    const user = SerializationHelper.toInstance(new AuthenticatedUser(), combined);
    this.registrationService.signupUser(user).then(
      (data) => {
        this.router.navigate(["/login"]);
      }
    )
  }

  public updatePhoneValidators(event: {checked: boolean, source: MatCheckbox}): void {
    const phoneControl = this.registrationForm.get("personalInfo").get("phoneNumber");
    if (event.checked) {
      phoneControl.setValidators([Validators.required, validPhoneValidator()]);
      phoneControl.updateValueAndValidity();
    }
    else {
      phoneControl.setValidators([]);
      phoneControl.updateValueAndValidity();
    }
  }

  private buildForm(): void {
    const passwordPattern = new RegExp(/(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9]*/g);
    this.registrationForm = this.fb.group({
      "loginInfo": this.fb.group({
        "email": ["", [
          Validators.required,
          Validators.email
        ],
          UsernameAvaialableValidator.createValidator(this.authService)
        ],
        "password": ["", [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(passwordPattern)
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
        "smsOptIn": [false, [

        ]],
        "phoneNumber": ["", [

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
