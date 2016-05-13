import {Component, EventEmitter} from '@angular/core';
import {ControlGroup} from '@angular/common';
import {ControlGroupService} from './control-group.service';

@Component({
    selector: 'easy-forms',
    inputs: ['data'],
    outputs: ['onSubmit'],
    template: `
        <div>
            <form (ngSubmit)="submit()" [ngFormModel]="form">
                <div *ngFor="let question of questions" class="form-row">
                    <df-question [question]="question" [form]="form"></df-question>
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

    ngOnInit(){
        this.form = this._controlGroup.create(this.data.questions);
    }

    submit() {
        this.onSubmit.emit(this.form.value)
    }
}