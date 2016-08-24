import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SelectComponent} from './select.component';
import {EasyFormsComponent} from './easy-forms.component';
import {QuestionComponent} from '../lib/question.component';
import {ControlGroupService} from './control-group.service';

@NgModule({
    imports: [FormsModule],
    providers: [
        ControlGroupService
    ],
    declarations: [
        EasyFormsComponent,
        QuestionComponent
    ],
    exports: [
        EasyFormsComponent
    ]
})
export class EasyFormsModule {}