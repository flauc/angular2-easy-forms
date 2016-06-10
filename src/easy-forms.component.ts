import {Component, EventEmitter} from '@angular/core'
import {ControlGroup} from '@angular/common'
import {ControlGroupService} from './control-group.service'
import {QuestionComponent} from './question.component'


@Component({
    selector: 'easy-forms',
    providers: [ControlGroupService],
    directives: [QuestionComponent],
    inputs: ['data'],
    outputs: ['onSubmit', 'onChanges'],
    template: `
        <div>
            <form (ngSubmit)="submit()" [ngFormModel]="form" [ngClass]="data.classes?.form">
                <ef-question *ngFor="let q of data.questions"  [question]="q" [form]="form" (valueChange)="onQuestionValueChange($event)"></ef-question>
                <div *ngIf="data.settings.submitButton" [ngClass]="data.classes?.input">
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

    ngOnInit() {
        this.sortQuestions();
        this.form = this._controlGroup.create(this.data.questions);
        // Add the settings object if it was not defined
        if (!this.data.settings) this.data.settings = {};
        // // Add the classes object if it was not defined
        // if (!this.data.classes) this.data.classes = {};
        
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

        // let defaultClasses = {
        //     form: [],
        //     input: []
        // };

        // Add default settings
        for (let p in defaultSettings)
            if (!this.data.settings[p])
                this.data.settings[p] = defaultSettings[p];
        
        // // Add default classes 
        // for (let p in defaultClasses)
        //     if (!this.data.classes[p])
        //         this.data.classes[p] = defaultClasses[p];
    }

    sortQuestions() {
        this.data.questions.sort((a, b) =>  a.order - b.order);
    }
}