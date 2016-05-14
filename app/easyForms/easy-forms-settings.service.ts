import {Injectable} from '@angular/core';

@Injectable()
export class EasyFormSettings {
    constructor() {
        this.globalSettings = {
            submitButton: true,
            submitButtonText: 'Submit'
        }
    }

    public globalSettings: any;

    set(settings) {
        this.globalSettings = settings;
    }

}