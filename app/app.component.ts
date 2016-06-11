import {Component} from '@angular/core'
import {bootstrap} from '@angular/platform-browser-dynamic'
import {EasyFormsComponent} from 'easy-forms'

@Component({
    selector: 'app',
    directives: [EasyFormsComponent],
    template: `
        <div class="container">
            <h1>Easy Forms Examples</h1>
    
            <h4>Matching Passwords</h4>
            <easy-form [easyFormData]="formOne" (onSubmit)="onSubmit($event)" (onChanges)="onChanges($event)"></easy-form>
        </div>
    `
})
export class AppComponent {
    constructor() {}
    
    public formOne = {
        classes: {
            'submit': 'submit'
        },
        questions: [
            {
                type: 'password',
                key: 'password',
                label: 'Password',
                classes: {
                    'wrapper': 'half'
                },
                validation: [
                    {type: 'required'},
                    {type: 'minLength', value: 5, message: 'Password must be longer then 5 characters'},
                ]
            },
            {
                type: 'password',
                key: 'passwordConf',
                label: 'Confirm Password',
                classes: {
                    'wrapper': 'half'
                },
                validation: [
                    {type: 'required'},
                    {type: 'match', value: 'password', message: `Password don't match`}
                ]
            },
        ]
    };

    public data = {
        settings: {
            submitButtonText: 'Send',
        },
        classes: {
            form: 'some-class',
            submit: ['class-one', 'class-two']
        },
        questions: [
            {
                type: 'text',
                key: 'firstName',
                value: 'John Doe',
                label: 'First Name',
                validation: [
                    {type: 'required'},
                    {type: 'minLength', value: 5, message: 'Please enter a name longer then 5 characters'},
                    {type: 'pattern', value: '^[a-zA-Z ]+$', message: 'Only letters and spaces are allowed'}
                ]
            },
            {
                type: 'password',
                key: 'password',
                label: 'Password',
                validation: [
                    {type: 'required'},
                    {type: 'custom', value: CustomValidators.startsWithNumber, message: 'Please dont start with a number'}
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
                classes: {
                    'wrapper': 'some-class-for-the-wrapper',
                    'label': 'label-class',
                    'question': ['q-class-one', 'q-class-two'],
                    'error': ['error-one', 'error-two']
                },
                options: [
                    {value: 'male', name: 'Male'},
                    {value: 'female', name: 'Female'}
                ]
            },
            {
                type: 'checkbox',
                key: 'things',
                label: 'Things You Like',
                values: ['pokemon', 'starWars'],
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

class CustomValidators {
    static startsWithNumber(control) {
        if (control.value !== '' && !isNaN(control.value.charAt(0))) return {'startsWithNumber': true};
        return null;
    }
}


bootstrap(AppComponent, []);