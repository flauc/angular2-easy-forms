import {Component, Input} from '@angular/core'
import {ControlGroup} from '@angular/common'

@Component({
    selector: 'ef-question',
    inputs: ['question', 'form'],
    template: `
        <div [ngFormModel]="form">
            <label [attr.for]="question.key">{{question.label}}</label>
            
            <div [ngSwitch]="question.type">
                <input 
                    *ngSwitchWhen="'text'"
                    [ngControl]="question.key"  
                    [type]="question.type"
                    (ngModelChange)="test()"
                    [id]="question.key">
            </div>
            
            <div class="error-block" *ngIf="!isValid">
                <span *ngFor="let e of errors()">{{e}}</span>
            </div>
        </div>

    `
})

export class QuestionComponent {
    question: any;
    form: ControlGroup;
    get isValid() { return this.form.controls[this.question.key].valid; }

    test() {
        console.log(this.form.controls[this.question.key]);
        console.log(this.form.controls[this.question.key].getError())
    }
    
    errors() {
        if (Array.isArray(this.question.validation)) {
            let temp = [];

            this.question.validation.forEach(a => {
                if (this.form.controls[this.question.key].hasError(a.type.toLowerCase())) temp.push(a.message);
            });

            return temp;
        }

        else return this.question.validation.message;
    }
}