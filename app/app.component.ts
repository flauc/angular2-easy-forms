import {Component} from '@angular/core';
import {EasyFormsComponent} from './easyForms/easy-forms.component';

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
            }
        ]
    };

    onSubmit(event) {
        console.log(event)
    }
}