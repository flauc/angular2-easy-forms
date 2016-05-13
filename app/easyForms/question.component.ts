import {Component, Input} from '@angular/core'
import {ControlGroup} from '@angular/common'

@Component({
    selector:'ef-question',
    inputs: ['question', 'form'],
    template: `
        <div [ngFormModel]="form">
            <label [attr.for]="question.key">{{question.label}}</label>
            
            <div [ngSwitch]="question.type">
                <input 
                    *ngSwitchWhen="'text'"
                    [ngControl]="question.key"  
                    [type]="question.type"
                    [id]="question.key">
            </div>
            
            <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div>
        </div>

    `
})

export class QuestionComponent {
    question: any;
    form: ControlGroup;

    get isValid() { return this.form.controls[this.question.key].valid; }
}