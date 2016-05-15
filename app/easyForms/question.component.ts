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
                    <option *ngFor="let o of question.options" [value]="o.value">{{o.name ? o.name : o.value}}</option>
                </select>   
                
                <div *ngSwitchWhen="'checkbox'">
                    <div class="checkbox" *ngFor="let o of question.options">
                        <input 
                            [type]="question.type"
                            [ngControl]="question.key"
                            [name]="question.key"
                            [value]="o.value"
                            [checked]="isSelectActive(o)"
                            (click)="setCheckbox(o)">
                        <span>{{o.name ? o.name : o.value}}</span>   
                    </div>
                </div>
                
                <div *ngSwitchWhen="'radio'">
                    <div class="radio" *ngFor="let o of question.options">
                        <input 
                            [type]="question.type"
                            [ngControl]="question.key"
                            [name]="question.key"
                            [value]="o.value"
                            [checked]="question.value === o.value"
                            (click)="setRadio(o)">
                        <span>{{o.name ? o.name : o.value}}</span>    
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

    ngOnInit() {
        if (this.question.type === 'checkbox' && !this.question.values) this.question.values = [];
    }

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

    setCheckbox(option) {
        let index = this.question.values.indexOf(option.value);

        if (index) this.question.values.splice(index, 1);
        else this.question.values.push(option.value);

        this.onValueChange(this.question.values)
    }

    isSelectActive(option) {
        return this.question.values.find(a => a === option.value) ? true : false;
    }
}