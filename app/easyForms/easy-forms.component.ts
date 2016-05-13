import {Component, EventEmitter} from '@angular/core'
import {ControlGroup} from '@angular/common'
import {ControlGroupService} from './control-group.service'
import {QuestionComponent} from './question.component';

@Component({
    selector: 'easy-forms',
    providers: [ControlGroupService],
    directives: [QuestionComponent],
    inputs: ['data'],
    outputs: ['onSubmit'],
    template: `
        <div>
            <form (ngSubmit)="submit()" [ngFormModel]="form">
                <div *ngFor="let q of data.questions" class="form-row">
                    <ef-question [question]="q" [form]="form"></ef-question>
                </div>
                <div class="form-row">
                    <input type="submit" [disabled]="!form.valid" [value]="data.buttonValue">
                </div>
            </form>
        </div>
    `
})
export class EasyFormsComponent {
    constructor(private _controlGroup: ControlGroupService) {}

    // Input
    data: any;
    // Output
    onSubmit: EventEmitter = new EventEmitter();

    form: ControlGroup;

    ngOnInit() {
        this.form = this._controlGroup.create(this.data.questions);
    }

    submit() {
        this.onSubmit.emit(this.form.value)
    }
}