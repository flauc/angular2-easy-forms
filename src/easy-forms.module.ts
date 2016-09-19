import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EasyFormsComponent} from './easy-forms.component';
import {QuestionComponent} from './question.component';
import {ControlGroupService} from './control-group.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [EasyFormsComponent, QuestionComponent],
    providers: [ControlGroupService],
    exports: [EasyFormsComponent]
})
export class EasyFormsModule {}
