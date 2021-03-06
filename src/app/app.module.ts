import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleVideoTagComponent } from './example-video-tag/example-video-tag.component';
import { NgTactfulLibModule } from 'ng-tactful-lib';
import { HomeComponent } from './home/home.component';
import { MyComponent } from './my/my.component';
import { StaticComComponent } from './static-com/static-com.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SecondLetterCapitalComponent } from './second-letter-capital/second-letter-capital.component'
@NgModule({
  declarations: [
    AppComponent,
    ExampleVideoTagComponent,
    HomeComponent,
    MyComponent,
    StaticComComponent,
    NotFoundComponent,
    SecondLetterCapitalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgTactfulLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
