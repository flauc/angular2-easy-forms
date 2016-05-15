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
        <easy-forms [data]="data" (onSubmit)="onSubmit($event)" (onChanges)="onChanges($event)"></easy-forms>
        <easy-forms [data]="data2"></easy-forms>
    `
})
export class AppComponent {
    constructor() {}

    public data = {
        settings: {
            submitButtonText: 'Send',
        },
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
            }
        ]
    };

    public data2 = {
        questions: [
            {
                type: 'text',
                key: 'test',
                value: 'nesto',
                label: 'Prob32a',
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
                label: 'Passwo23rd',
                validation: [
                    {type: 'required'},
                    {type: 'custom', value: startsWithNumber, message: 'Please dont start with a number'}
                ]
            }
        ]
    };

    onSubmit(event) {
        console.log(event)
    }

    onChanges(event) {
        console.log(event)
    }
}