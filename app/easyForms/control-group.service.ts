import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';
import {isArray} from 'rxjs/util/isArray';

@Injectable()
export class ControlGroupService {
    constructor(
        private fb:FormBuilder
    ) {}

    create(questions) {
        let temp = {};

        questions.forEach(a => {

            temp[a.key] = [a.value || ''];

            if (a.validation) {

                if (isArray(a.validation)) {
                    let validators = [];
                    a.validation.forEach(i => validators.push(setValidator(i)));
                    temp[a.key].push(Validators.compose(validators))
                }

                else temp[a.key].push(setValidator(a.validation))
            }
        });

        return this.fb.group(temp);

        function setValidator(item) {
            switch (item.type) {
                case 'required': return Validators.required;
                case 'minLength': return Validators.minLength(item.content);
                case 'maxLength': return Validators.maxLength(item.content);
                case 'pattern': return Validators.pattern(item.content);
            }
        }
    }
}