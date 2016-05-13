import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';

@Injectable()
export class ControlGroupService {
    constructor(
        private fb: FormBuilder
    ) {}

    create(questions) {
        let temp = {};

        questions.forEach(a => {

            temp[a.key] = [a.value || ''];

            if (a.validation) {

                if (Array.isArray(a.validation)) {
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
                case 'minLength': return Validators.minLength(item.value);
                case 'maxLength': return Validators.maxLength(item.value);
                case 'pattern': return Validators.pattern(item.value);
            }
        }
    }
}