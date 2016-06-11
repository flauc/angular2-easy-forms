import {Component, EventEmitter} from '@angular/core'
import {ControlGroup} from '@angular/common'
import {ControlGroupService} from './control-group.service'
import {QuestionComponent} from './question.component'
import {EasyFormData} from './data.interface'


@Component({
    selector: 'easy-form',
    providers: [ControlGroupService],
    directives: [QuestionComponent],
    inputs: ['easyFormData'],
    outputs: ['onSubmit', 'onChanges'],
    template: `
        <div>
            <form (ngSubmit)="submit()" [ngFormModel]="comp.form" [ngClass]="comp.data.classes?.form">
                <ef-question *ngFor="let q of comp.data.questions" [info]="{question: q, form: comp.form}" (valueChange)="onQuestionValueChange($event)"></ef-question>
                <div *ngIf="comp.data.settings.submitButton" [ngClass]="comp.data.classes?.input">
                    <input type="submit" [disabled]="!comp.form.valid" [value]="comp.data.settings.submitButtonText">
                </div>
            </form>
        </div>
    `
})
export class EasyFormsComponent {
    constructor(
        private _controlGroup: ControlGroupService
    ) {}

    // Input
    set easyFormData(value: EasyFormData) {
        this._data = value;
        this.sortQuestions();
        
        let cg = this._controlGroup.create(this._data.questions);
        
        this._form = cg.fbGroup;
        this._matches = cg.matches;
        this.setSettings();
        this.comp = {data: this._data, form: this._form};
    }
    
    public comp: any;
    
    // Outputs
    onSubmit: EventEmitter = new EventEmitter();
    onChanges: EventEmitter = new EventEmitter();

    private _data: EasyFormData;
    private _form: ControlGroup;
    private _matches: string[];
    

    submit() { this.onSubmit.emit(this._form.value) }

    onQuestionValueChange(event) {
        if (this._matches) {
            let key = Object.keys(event)[0],
                // See if we should check for matches
                mat = this._matches.find(a => a.toMatch === key);

            // Update the cg if we found a matcher
            if (mat) this._form.controls[mat.model].updateValueAndValidity();
        }

        this.onChanges.emit(event)
    }
    sortQuestions() { this._data.questions.sort((a, b) =>  a.order - b.order) }
    
    setSettings() {
        let defaultSettings = {
            submitButton: true,
            submitButtonText: 'Submit'
        };
    
        if (this._data.settings) {
            // Add default settings
            for (let p in defaultSettings)
                if (!this._data.settings[p])
                    this._data.settings[p] = defaultSettings[p];   
        }
        
        else this._data.settings = defaultSettings;
    }
}