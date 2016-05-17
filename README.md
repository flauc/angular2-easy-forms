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

And import it in the component where you want to use it. 

```typescript
```

You can find an example of the setup in the example folder.

## Questions

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

### OnSubmit

## Options


