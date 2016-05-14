import {Component} from '@angular/core';
import {EasyFormsComponent} from './easyForms/easy-forms.component';

function startsWithNumber(control) {

    if (control.value !== '' && !isNaN(control.value.charAt(0))) {
        return {'startsWithNumber': true};
    }

    return null;
}

@Component({
    selector: 'app',
    directives: [EasyFormsComponent],
    template: `
        <h1>Testing</h1>
        <easy-forms [data]="data" (onSubmit)="onSubmit($event)"></easy-forms>
    `
})
export class AppComponent {
    public data = {
        buttonValue: 'Send',
        questions: [
            {
                type: 'text',
                key: 'test',
                value: 'nesto',
                label: 'Proba',
                validation: [
                    {type: 'required'},
                    {type: 'minLength', value: 10, message: 'Please enter a value larger then 10'},
                    {type: 'pattern', value: '^[a-zA-Z ]+$', message: 'You are stupid'}
                ]
            },
            {
                type: 'text',
                key: 'password',
                value: '123',
                label: 'Password',
                validation: [
                    {type: 'required'},
                    {type: 'custom', value: startsWithNumber, message: 'Please dont start with a number'}
                ]
            },
            {
                type: 'text',
                key: 'passwordMatch',
                value: '12345',
                label: 'Password',
                validation: [
                    {type: 'required'},
                    {type: 'match', value: 'password', message: 'Please match with password'}
                ]
            }
        ]
    };

    onSubmit(event) {
        console.log(event)
    }
}