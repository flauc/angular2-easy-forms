import {Component} from '@angular/core'
import {EasyFormsComponent} from 'easy-forms'

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
        <easy-form [easyFormData]="data" (onSubmit)="onSubmit($event)" (onChanges)="onChanges($event)"></easy-form>
    `
})
export class AppComponent {
    constructor() {}

    public data = {
        settings: {
            submitButtonText: 'Send',
            errorOnDirty: true
        },
        questions: [
            {
                type: 'text',
                key: 'Prvi',
                label: 'Prvi',
                placeholder: 'perica',
                classes: {
                    'wrapper': 'Test'
                },
                validation: [
                    {type: 'required'}
                ]
            },
            {
                type: 'text',
                key: 'Drugi',
                label: 'Drugi',
                validation: [
                    {type: 'match', value: 'Prvi', message: 'Need to match'},
                    {type: 'required'},
                ]
            },
            {
                type: 'text',
                key: 'firstName',
                value: 'John Doe',
                label: 'First Name',
                validation: [
                    {type: 'required'},
                    {type: 'maxLength', value: 5},
                    {type: 'pattern', value: '[a-zA-Z ]+'}
                ]
            },
            {
                type: 'password',
                key: 'password',
                label: 'Password',
                validation: [
                    {type: 'required'},
                    {type: 'custom', value: startsWithNumber, message: 'Please dont start with a number'}
                ]
            },
            {
                type: 'dropdown',
                key: 'address',
                label: 'Address',
                value: 'osijek',
                order: 2,
                options: [
                    {value: 'osijek', name: 'Osijek'},
                    {value: 'zagreb', name: 'Zagreb'}
                ]
            },
            {
                type: 'radio',
                key: 'gender',
                label: 'Gender',
                value: 'male',
                options: [
                    {value: 'male', name: 'Male'},
                    {value: 'female', name: 'Female'}
                ]
            },
            {
                type: 'checkbox',
                key: 'things',
                label: 'Things You Like',
                value: ['starWars', 'batlefield'],
                options: [
                    {value: 'starWars', name: 'Star Wars'},
                    {value: 'batlefield', name: 'Batlefield'},
                    {value: 'pokemon', name: 'Pokemon'}
                ],
                validation: [
                    {type: 'required'}
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