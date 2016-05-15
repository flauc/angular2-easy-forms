import {Component, EventEmitter} from '@angular/core'
import {ControlGroup} from '@angular/common'

@Component({
    selector: 'ef-question',
    inputs: ['question', 'form'],
    outputs: ['valueChange'],
    template: `
        <div [ngFormModel]="form">
            <label [attr.for]="question.key">{{question.label}}</label>
            
            <div [ngSwitch]="question.type">
                <select 
                    *ngSwitchWhen="'dropdown'"
                    [ngControl]="question.key"
                    (ngModelChange)="onValueChange($event)"
                    [id]="question.key">
                    <option *ngFor="let o of question.options" [value]="o.value">{{o.name}}</option>
                </select>   
                
                <div *ngSwitchWhen="'radio'">
                    <div class="radio" *ngFor="let o of question.options">
                        <input 
                            [type]="question.type"
                            [ngControl]="question.key"
                            [name]="question.key"
                            [value]="o.value"
                            [checked]="question.value === o.value"
                            (click)="setRadio(o)">
                        <span>{{o.name}}</span>    
                    </div>
                </div>
            
                <input 
                    *ngSwitchDefault
                    [ngControl]="question.key"  
                    [type]="question.type"
                    (ngModelChange)="onValueChange($event)"
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
    valueChange: EventEmitter = new EventEmitter();

    get isValid() { return this.form.controls[this.question.key].valid; }

    onValueChange(event) {
        if (this.question.emitChanges !== false) this.valueChange.emit({[this.question.key]: event})
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

    setRadio(option) {
        this.form.controls[this.question.key].updateValue(option.value);
        this.onValueChange(option.value)
    }
}