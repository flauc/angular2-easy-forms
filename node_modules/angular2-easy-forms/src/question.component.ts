import {Component, EventEmitter} from '@angular/core'
import {ControlGroup} from '@angular/common'
import {Question} from './data.interface'

@Component({
    selector: 'ef-question',
    inputs: ['info'],
    outputs: ['valueChange'],
    template: `
        <div [ngFormModel]="form" [ngClass]="question.classes?.wrapper">
            <label 
                *ngIf="question.label" 
                [ngClass]="question.classes?.label"
                [attr.for]="question.key">
                {{question.label}}
            </label>
            
            <div [ngSwitch]="question.type">
                <select 
                    *ngSwitchWhen="'dropdown'"
                    [ngControl]="question.key"
                    (ngModelChange)="onValueChange($event)"
                    [id]="question.key">
                    [ngClass]="question.classes?.question"
                    <option *ngFor="let o of question.options" [value]="o.value">{{o.name ? o.name : o.value}}</option>
                </select>   
                
                <div *ngSwitchWhen="'checkbox'" [ngClass]="question.classes?.question">
                    <div class="checkbox" *ngFor="let o of question.options">
                        <input 
                            [type]="question.type"
                            [ngControl]="question.key"
                            [name]="question.key"
                            [value]="o.value"
                            [checked]="isSelectActive(o)"
                            (change)="chackboxValueChange()"
                            [disabled]="o.disabled"
                            (click)="setCheckbox(o)">
                        <span>{{o.name ? o.name : o.value}}</span>   
                    </div>
                </div>
                
                <div *ngSwitchWhen="'radio'" [ngClass]="question.classes?.question">
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
                    [ngClass]="question.classes?.question"
                    [id]="question.key"> 
            </div>
            
            <div class="error-block" *ngIf="!isValid" [ngClass]="question.classes?.error">
                <span *ngFor="let e of errors()">{{e}}</span>
            </div>
        </div>

    `
})

export class QuestionComponent {

    set info(value) {
        this.question = value.question;
        this.form = value.form;

        if (this.question.type === 'checkbox') {
            if (!this.question.value) this.question.value = [];
            if (this.question.validation && this.question.validation.find(a => a.type === 'required')) this.checkboxIsRequired = true;
        }
    }
    
    question: Question;
    form: ControlGroup;
    valueChange: EventEmitter = new EventEmitter();

    get isValid() { return this.form.controls[this.question.key].valid; }

    private checkboxIsRequired: boolean = false;

    
    errors() {
        if (Array.isArray(this.question.validation)) {
            let temp = [];

            this.question.validation.forEach(a => {
                if (a.type === 'required' && !a.message) temp.push(`${this.question.label || this.question.key} is required`);
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
        let index = this.question.value.indexOf(option.value);

        if (index !== -1) this.question.value.splice(index, 1);
        else this.question.value.push(option.value);

        this.form.controls[this.question.key].updateValue(this.question.value);
        this.onValueChange(this.question.value)
    }

    chackboxValueChange() {
        if (this.question.value.length === 1) this.question.options.find(a => a.value === this.question.value[0]).disabled = true;
        else this.question.options.forEach(a => a.disabled = false)
    }

    onValueChange(event) { if (this.question.emitChanges !== false) this.valueChange.emit({[this.question.key]: event}) }
    isSelectActive(option) { return this.question.value.find(a => a === option.value) ? true : false }
}