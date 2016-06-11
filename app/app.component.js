System.register(['@angular/core', '@angular/platform-browser-dynamic', 'easy-forms'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_dynamic_1, easy_forms_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (easy_forms_1_1) {
                easy_forms_1 = easy_forms_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.data = {
                        settings: {
                            submitButtonText: 'Send',
                        },
                        questions: [
                            {
                                type: 'text',
                                key: 'firstName',
                                value: 'John Doe',
                                label: 'First Name',
                                validation: [
                                    { type: 'required' },
                                    { type: 'minLength', value: 5, message: 'Please enter a name longer then 5 characters' },
                                    { type: 'pattern', value: '^[a-zA-Z ]+$', message: 'Only letters and spaces are allowed' }
                                ]
                            },
                            {
                                type: 'password',
                                key: 'password',
                                label: 'Password',
                                validation: [
                                    { type: 'required' },
                                    { type: 'custom', value: startsWithNumber, message: 'Please dont start with a number' }
                                ]
                            },
                            {
                                type: 'dropdown',
                                key: 'address',
                                label: 'Address',
                                value: 'osijek',
                                order: 2,
                                options: [
                                    { value: 'osijek', name: 'Osijek' },
                                    { value: 'zagreb', name: 'Zagreb' }
                                ]
                            },
                            {
                                type: 'radio',
                                key: 'gender',
                                label: 'Gender',
                                value: 'male',
                                options: [
                                    { value: 'male', name: 'Male' },
                                    { value: 'female', name: 'Female' }
                                ]
                            },
                            {
                                type: 'checkbox',
                                key: 'things',
                                label: 'Things You Like',
                                values: ['pokemon', 'starWars'],
                                options: [
                                    { value: 'starWars', name: 'Star Wars' },
                                    { value: 'batlefield', name: 'Batlefield' },
                                    { value: 'pokemon', name: 'Pokemon' }
                                ],
                                validation: [
                                    { type: 'required' }
                                ]
                            }
                        ]
                    };
                }
                AppComponent.prototype.onSubmit = function (event) {
                    console.log(event);
                };
                AppComponent.prototype.onChanges = function (event) {
                    console.log(event);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        directives: [easy_forms_1.EasyFormsComponent],
                        template: "\n        <h1>Testing</h1>\n        <easy-forms [data]=\"data\" (onSubmit)=\"onSubmit($event)\" (onChanges)=\"onChanges($event)\"></easy-forms>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            platform_browser_dynamic_1.bootstrap(AppComponent, []);
        }
    }
});
