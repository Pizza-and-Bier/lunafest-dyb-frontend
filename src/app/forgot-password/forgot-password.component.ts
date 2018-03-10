import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators} from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { debounceTime } from "rxjs/operators/debounceTime";

import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'dyb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordEmail: AbstractControl;

  public checkingEmail: boolean;

  public sendingReset = false;

  public resetSent = false;

  private quotaExceeded = false;

  constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() {
    this.buildForm();
  }

  public reset(): void {
    this.sendingReset = true;
    this.forgotPasswordService.sendResetEmail(this.forgotPasswordEmail.value).then(
      (data) => {
        console.log(data);
        this.resetSent = true;
      },
      (err: string) => {
        console.warn(err);
        if (err.indexOf("there is no user with this email") !== -1) {
          this.forgotPasswordEmail.setErrors({"noUserFound": true});
        }
        else if (err.indexOf("invalid email") !== -1) {
          this.forgotPasswordEmail.setErrors({"email": true});
        }
        this.sendingReset = false;
        this.resetSent = false;
      }
    );
  }

  private buildForm(): void {
    this.forgotPasswordEmail = this.fb.control("", [Validators.required, Validators.email]);
    this.forgotPasswordEmail.valueChanges.pipe(
      debounceTime(900)
    ).subscribe(
      (data) => {
        this.checkingEmail = true;
        console.log("value change");
        if (!this.quotaExceeded) {
          this.forgotPasswordService.userExists(this.forgotPasswordEmail.value).then(
            (taken) => {
              console.log("taken", taken);
              this.checkingEmail = false;
              if (taken) {
                this.forgotPasswordEmail.setErrors(null);
              }
              else {
                this.forgotPasswordEmail.setErrors({"noUserFound": true});
              }
            },
            (err) => {
              this.checkingEmail = false;
              if (err.code === "auth/quota-exceeded") {
                this.quotaExceeded = true;
              }
              else if (err.code !== "auth/invalid-email") {
                this.forgotPasswordEmail.setErrors({"email": true});
              }
              else {
                this.forgotPasswordEmail.setErrors({"email": false});
              }
            }
          )
        }
      }
    )
  }

}
