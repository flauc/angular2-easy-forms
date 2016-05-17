# Angular 2 Easy Forms
Is a library for simplification of forms in Angular 2. Its ment for quick creation of forms and form validation.

The library is inspired by [angular.io dynamic forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html).

This library is a big work in progress. Any input and/or help is greatly appreciated.

## Documentation 
1. [Setup](#setup)
1. [Questions](#questions)
1. [Validation](#validation)
1. [Events](#events)
1. [Options](#options)

## Setup
You can install the library from npm with the following command: 
```
npm install --save angular2-easy-forms
```

You also need to declare the library in your system.js config. 

```js
```

Import it in the component where you want to use it. 

```typescript
```

They you define a list of questions as well as an options object if required and pass it to the component.
```typescript
```

You can find an example of the setup in the example folder.

## Questions
Each question can have the following properties: 

property | type | required | description 
------------ | ------------- | ------------- | ------------- |
type | text, password, number, dropdown (select), radio or checkbox | true | Defines the type of the question
key | string | true | Defines the key of the control, this is the key of the value that gets emitted [onSubmit](#events) and [onChange](#events) 
label | string | false | The label of the form input
value | string (if question `type: 'checkbox'` then its an array) | false | An initial value for the question
order | int | false | Define a specific order for the questions (if one question has an order property to achieve the required effect)
validation | object | false | Read more about validation [here](#validation)

If you define the type of question to be `radio`, `checkbox` or `dropdown` then you need to define an additional property:

property | type | required | description 
------------ | ------------- | ------------- | ------------- |
options | object array `{value: string, name: string}` | true | Define an array of options for the question

## Validation

## Events
There are two events you can bind to: 
* onSubmit
* onChange

This is how you bind to them: 
```html
<easy-forms [data]="data" (onSubmit)="fuFunction($event)" (onChanges)="barFunction($event)"></easy-forms>
```

### onSubmit
The onSubmit event emits when the submit button is pressed. The emitted object contains all of the forms questions with their corresponding values `obj[key] = value`. 
If the questions type is 'checkbox' the emitted value is an array of all the checked

### OnChange
The onChange event emits when ever a value changes. The following is what gets emitted: `{[key]: value}`.
You can disable a question from triggering the onChange event by setting the `emitChanges` property to `false`.

## Options


