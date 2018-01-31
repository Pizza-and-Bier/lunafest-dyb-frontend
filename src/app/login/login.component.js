"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, loginService) {
        this.fb = fb;
        this.loginService = loginService;
        this.invalidLogin = false;
        this.formErrors = {
            "username": "",
            "password": ""
        };
        this.validationMessages = {
            "username": {
                "required": "Required."
            },
            "password": {
                "required": "Required."
            }
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginComponent.prototype.attemptLogin = function () {
        var _this = this;
        var credentials = this.loginForm.value;
        this.loginService.attemptLogin(credentials).subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
            _this.invalidLogin = true;
        });
    };
    LoginComponent.prototype.buildForm = function () {
        var _this = this;
        this.loginForm = this.fb.group({
            "username": ["", [
                    forms_1.Validators.required
                ]],
            "password": ["", [
                    forms_1.Validators.required
                ]]
        });
        this.loginForm.statusChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    LoginComponent.prototype.onValueChanged = function (data) {
        var form = this.loginForm;
        for (var field in this.formErrors) {
            if (form.get(field) !== null && form.getError(field) !== undefined) {
                this.formErrors[field] = "";
                var control = form.get(field);
                if (control && control.dirty && control.invalid) {
                    var messages = this.validationMessages[field];
                    for (var key in control.errors) {
                        this.formErrors[field] += messages[key] + " ";
                    }
                }
            }
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
