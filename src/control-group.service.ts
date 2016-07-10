import {Injectable} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Question, Validation} from './data.interface'
import {CustomValidators} from './custom-validators.class'

@Injectable()
export class ControlGroupService {
    create(questions: Question[]): any {
        let temp = {},
            toReturn = {},
            matches = [];

        questions.forEach(a => {
            let val = a.value || '',
                validators = null;

            if (a.validation) {

                if (Array.isArray(a.validation)) {
                    validators = [];
                    a.validation.forEach(i => validators.push(setValidator(i, a)));
                }

                else validators = setValidator(a.validation)
            }

            temp[a.key] = new FormControl(val, validators);
        });

        toReturn['fbGroup'] = new FormGroup(temp);
    
        // Add matches for watching if required
        if (matches.length) toReturn['matches'] = matches;

        return toReturn;

        function setValidator(item: Validation, original?) {
            switch (item.type) {
                case 'required': return Validators.required;
                case 'minLength': return Validators.minLength(item.value);
                case 'maxLength': return Validators.maxLength(item.value);
                case 'pattern': return Validators.pattern(item.value);
                case 'custom': return item.value;
                case 'match':
                    matches.push({toMatch: item.value, model: original.key});
                    return CustomValidators.match(item.value);
            }
        }
    }
}

