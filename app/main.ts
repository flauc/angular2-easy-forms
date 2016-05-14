import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {EasyFormSettings} from './easyForms/easy-forms-settings.service';

bootstrap(AppComponent, [
    EasyFormSettings
]);