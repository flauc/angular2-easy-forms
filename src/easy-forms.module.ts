import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EasyFormsComponent} from './easy-forms.component';
import {QuestionComponent} from '../lib/question.component';
import {ControlGroupService} from './control-group.service';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule],
    declarations: [EasyFormsComponent, QuestionComponent],
    providers: [ControlGroupService],
    exports: [EasyFormsComponent]
})
export class EasyFormsModule {}