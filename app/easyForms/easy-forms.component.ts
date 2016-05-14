import {Component, EventEmitter} from '@angular/core'
import {ControlGroup} from '@angular/common'
import {ControlGroupService} from './control-group.service'
import {QuestionComponent} from './question.component';
import {EasyFormSettings} from './easy-forms-settings.service';

@Component({
    selector: 'easy-forms',
    providers: [ControlGroupService, EasyFormSettings],
    directives: [QuestionComponent],
    inputs: ['data'],
    outputs: ['onSubmit', 'onChanges'],
    template: `
        <div>
            <form (ngSubmit)="submit()" [ngFormModel]="form">
                <div *ngFor="let q of data.questions" class="row">
                    <ef-question [question]="q" [form]="form" (valueChange)="onQuestionValueChange($event)"></ef-question>
                </div>
                <div class="row" *ngIf="data.settings.submitButton">
                    <input type="submit" [disabled]="!form.valid" [value]="data.settings.submitButtonText">
                </div>
            </form>
        </div>
    `
})
export class EasyFormsComponent {
    constructor(
        private _controlGroup: ControlGroupService,
        private _gs: EasyFormSettings
    ) {}

    // Input
    data: any;
    // Outputs
    onSubmit: EventEmitter = new EventEmitter();
    onChanges: EventEmitter = new EventEmitter();

    form: ControlGroup;

    ngOnInit() {
        this.form = this._controlGroup.create(this.data.questions);

        // Add global settings
        for (let p in this._gs.globalSettings) {
            console.log(p);
            if (!this.data.settings[p]) this.data.settings[p] = this._gs.globalSettings[p];
        }

        console.log(this.data);
    }

    submit() {
        this.onSubmit.emit(this.form.value)
    }

    onQuestionValueChange(event) {
        this.onChanges.emit(event)
    }
}