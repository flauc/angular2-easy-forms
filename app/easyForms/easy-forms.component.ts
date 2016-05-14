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
                <div class="row" *ngIf="settings.submitButton">
                    <input type="submit" [disabled]="!form.valid" [value]="settings.submitButtonText">
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

    settings: any = {};

    private listener: any;

    ngOnInit() {
        this.form = this._controlGroup.create(this.data.questions);
        // Add the settings object if it was not defined
        if (!this.data.settings) this.data.settings = {};
        // Subscribe to the global settings emitter
        this.listener = this._gs.emitter.subscribe(a => this.setSettings());

        this.setSettings();
    }

    submit() {
        this.onSubmit.emit(this.form.value)
    }

    onQuestionValueChange(event) {
        this.onChanges.emit(event)
    }

    setSettings() {
        console.log(this._gs.globalSettings);
        // Add global settings
        for (let p in this._gs.globalSettings) {
            if (!this.data.settings[p]) this.settings[p] = this._gs.globalSettings[p];
            else this.settings[p] = this.data.settings[p]
        }
    }

    ngOnDestroy() {
        if (this.listener) this.listener.unsubscribe();
    }
}