"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var flex_layout_1 = require("@angular/flex-layout");
var http_1 = require("@angular/common/http");
var app_component_1 = require("./app.component");
var material_module_1 = require("./material/material.module");
var routing_module_1 = require("./routing/routing.module");
var control_toolbar_component_1 = require("./control-toolbar/control-toolbar.component");
var login_component_1 = require("./login/login.component");
var fake_backend_interceptor_1 = require("./mocks/fake-backend-interceptor");
var login_service_1 = require("./services/login.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                control_toolbar_component_1.ControlToolbarComponent,
                login_component_1.LoginComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                material_module_1.MaterialModule,
                routing_module_1.RoutingModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                flex_layout_1.FlexLayoutModule,
                http_1.HttpClientModule
            ],
            providers: [
                login_service_1.LoginService,
                fake_backend_interceptor_1.fakeBackendProvider
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
