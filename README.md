# ng-tactful-library

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Uses  Example for pipe
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



