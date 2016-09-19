import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EasyFormsModule} from 'angular2-easy-forms';

@NgModule({
    imports: [
        BrowserModule,
        EasyFormsModule
    ],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
