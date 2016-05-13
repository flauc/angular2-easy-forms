import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';

@Injectable()
export class ControlGroupService {
    constructor(
        private fb:FormBuilder
    ) {}

    create(questions) {
        let group = {};

        questions.forEach(question => {
            group[question.key] = question.required ? [question.value || '', Validators.required] : [question.value || ''];
        });

        return this.fb.group(group);
    }
}