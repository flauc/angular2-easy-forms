import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class EasyFormSettings {
    constructor() {
        this.globalSettings = {
            submitButton: true,
            submitButtonText: 'Submit'
        }
    }

    globalSettings: any;
    emitter: EventEmitter = new EventEmitter();

    set(settings) {
        for (let p in settings) this.globalSettings[p] = settings[p];
        console.log(this.globalSettings);
        this.emitter.emit(this.globalSettings)
    }
}