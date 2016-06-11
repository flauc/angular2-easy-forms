import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/common'
import {Question, Validation} from './data.interface'
import {CustomValidators} from './custom-validators.class'

@Injectable()
export class ControlGroupService {
    constructor(
        private fb: FormBuilder
    ) {}

    create(questions: Question[]): FormBuilder {
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

        function setValidator(item: Validation) {
            switch (item.type) {
                case 'required': return Validators.required;
                case 'minLength': return Validators.minLength(item.value);
                case 'maxLength': return Validators.maxLength(item.value);
                case 'pattern': return Validators.pattern(item.value);
                case 'custom': return item.value;
                case 'match': return CustomValidators.match(item.value);
            }
        }
    }
}

