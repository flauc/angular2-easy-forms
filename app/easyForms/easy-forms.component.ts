import {Component, EventEmitter} from '@angular/core'
import {ControlGroup} from '@angular/common'
import {ControlGroupService} from './control-group.service'
import {QuestionComponent} from './question.component';


@Component({
    selector: 'easy-forms',
    providers: [ControlGroupService],
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
        private _controlGroup: ControlGroupService
    ) {}

    // Input
    data: any;
    // Outputs
    onSubmit: EventEmitter = new EventEmitter();
    onChanges: EventEmitter = new EventEmitter();

    form: ControlGroup;

    private listener: any;

    ngOnInit() {
        this.form = this._controlGroup.create(this.data.questions);
        // Add the settings object if it was not defined
        if (!this.data.settings) this.data.settings = {};

        this.setSettings();
    }

    submit() {
        this.onSubmit.emit(this.form.value)
    }

    onQuestionValueChange(event) {
        this.onChanges.emit(event)
    }

    setSettings() {
        let defaultSettings = {
            submitButton: true,
            submitButtonText: 'Submit'
        };

        // Add default settings
        for (let p in defaultSettings) if (!this.data.settings[p]) this.data.settings[p] = defaultSettings[p];
    }

    ngOnDestroy() {
        if (this.listener) this.listener.unsubscribe();
    }
}