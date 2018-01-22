import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formErrors: any = {
    "username": "",
    "password": ""
  };

  private validationMessages: any = {
    "username": {
      "required": "Required."
    },
    "password": {
      "required": "Required."
    }
  }

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      "username": ["", [
        Validators.required
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
