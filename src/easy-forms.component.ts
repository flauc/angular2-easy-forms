import {Component, EventEmitter, Input, Output} from '@angular/core'
import {FormGroup} from '@angular/forms';
import {ControlGroupService} from './control-group.service'
import {EasyFormData, Settings} from './data.interface'


@Component({
    selector: 'easy-form',
    template: `
        <form (ngSubmit)="submit()" [formGroup]="comp.form" [ngClass]="comp.data.classes?.form">
            <ef-question *ngFor="let q of comp.data.questions" [info]="{question: q, form: comp.form, settings: comp.settings}" (valueChange)="onQuestionValueChange($event)"></ef-question>
            <div *ngIf="comp.data.settings.submitButton" [ngClass]="comp.data.classes?.submit">
                <button type="submit" [disabled]="!comp.form.valid && comp.settings.extraValidation">{{comp.data.settings.submitButtonText}}</button>
            </div>
        </form>
    `
})
export class EasyFormsComponent {

    // Input
    @Input() set easyFormData(value: EasyFormData) {
        this._data = value;
        this._data.settings = this._setSettings(value.settings);
        this.sortQuestions();

        let cg = this._controlGroup.create(this._data.questions);
        this._form = cg.fbGroup;
        this._matches = cg.matches;
        this.comp = {
            data: this._data,
            form: this._form,
            settings: {
                singleErrorMessage: this._data.settings.singleErrorMessage,
                errorOnDirty: this._data.settings.errorOnDirty,
                showValidation: this._data.settings.showValidation,
                extraValidation: this._data.settings.submitButtonExtraValidation || true
            }
        };
    }

    // Outputs
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onChanges: EventEmitter<any> = new EventEmitter();

    comp: any;

    private _data: EasyFormData;
    private _form: FormGroup;
    private _matches: string[];

    constructor(private _controlGroup: ControlGroupService) {}

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
    
    private _setSettings(settings: Settings) {
        let defaultSettings = {
            submitButton: true,
            submitButtonText: 'Submit',
            submitButtonExtraValidation: null,
            showValidation: true,
            singleErrorMessage: true,
            errorOnDirty: true
        };

        // Add received settings
        if (settings)
            for (let p in defaultSettings)
                defaultSettings[p] = settings.hasOwnProperty(p) ? settings[p] : defaultSettings[p]

        return defaultSettings;
    }
}