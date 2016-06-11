export interface EasyFormData {
    questions: Question[]
    settings: Settings
    classes: Classes
}

export interface Question {
    type: 'text' | 'password' | 'number' | 'dropdown' | 'radio' | 'checkbox'
    key: string
    label?: string
    value?: string | number | Array<string>
    order?: number
    emitChanges?: boolean
    options?: Array<{value: string | number, name: string, disabled: boolean}>
    classes?: {
        wrapper?: string 
        label?: string | Array<string>
        question?: string | Array<string>
        error?: string | Array<string>
    }
    validation?: Validation | Array<Validation>
}

export interface Settings {
    submitButton: boolean
    submitButtonText: string
}

export interface Classes {
    form: string | Array<string>
    submit: string | Array<string>
}

export interface Validation {
    type: 'required' | 'minLength' | 'maxLength' | 'patter' | 'custom' | 'match'
    value?: any
    message?: string
}