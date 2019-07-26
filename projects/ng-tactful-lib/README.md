# NgTactfulLib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project ng-tactful-lib` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-tactful-lib`.
> Note: Don't forget to add `--project ng-tactful-lib` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ng-tactful-lib` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-tactful-lib`, go to the dist folder `cd dist/ng-tactful-lib` and run `npm publish`.

## Running unit tests

Run `ng test ng-tactful-lib` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Uses  example of pipe for Capital Second letter
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SecondLetterCapitalPipe } from 'ng-tactful-lib'

@NgModule({
  declarations: [
    AppComponent,
    SecondLetterCapitalPipe,
    
  ],
  imports: [
    BrowserModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
