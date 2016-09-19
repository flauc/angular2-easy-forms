import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export declare class ControlGroupService {
    create(questions: Question[]): any;
}

export declare class CustomValidators {
    static match(key: string): (control: any) => {
        'match': {
            'currentValue': any;
            'requiredValue': any;
            'mustMatchField': string;
        };
    };
}

export interface EasyFormData {
    questions: Question[];
    settings: Settings;
    classes: Classes;
}
export interface Question {
    type: 'text' | 'password' | 'number' | 'dropdown' | 'radio' | 'checkbox' | 'textarea';
    key: string;
    label?: string;
    placeholder?: string;
    value?: string | number | Array<string>;
    order?: number;
    emitChanges?: boolean;
    options?: Array<{
        value: string | number;
        name: string;
        disabled: boolean;
    }>;
    classes?: {
        wrapper?: string;
        label?: string | Array<string>;
        question?: string | Array<string>;
        error?: string | Array<string>;
    };
    validation?: Validation | Array<Validation>;
}
export interface Settings {
    submitButton: boolean;
    submitButtonText: string;
    submitButtonExtraValidation: boolean;
    singleErrorMessage: boolean;
    showValidation: boolean;
    errorOnDirty: boolean;
}
export interface Classes {
    form: string | Array<string>;
    submit: string | Array<string>;
}
export interface Validation {
    type: 'required' | 'minLength' | 'maxLength' | 'patter' | 'custom' | 'match';
    value?: any;
    message?: string;
}

export declare class EasyFormsComponent {
    private _controlGroup;
    easyFormData: EasyFormData;
    onSubmit: EventEmitter<any>;
    onChanges: EventEmitter<any>;
    comp: any;
    private _data;
    private _form;
    private _matches;
    constructor(_controlGroup: ControlGroupService);
    submit(): void;
    onQuestionValueChange(event: any): void;
    sortQuestions(): void;
    private _setSettings(settings);
}

export declare class EasyFormsModule {
}

export declare class QuestionComponent {
    toSet: string;
    info: any;
    valueChange: EventEmitter<any>;
    question: Question;
    form: FormGroup;
    private checkboxIsRequired;
    private settings;
    showErrorMsg: boolean;
    errors(): any;
    setRadio(option: any): void;
    setCheckbox(option: any): void;
    chackboxValueChange(): void;
    onValueChange(event: any): void;
    isSelectActive(option: any): boolean;
    private _setError(item, errors);
}
