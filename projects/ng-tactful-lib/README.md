[![npm](https://img.shields.io/npm/v/ng-tactful-lib.svg)](https://www.npmjs.com/package//ng-tactful-lib)
[![npm](https://img.shields.io/npm/dt/ng-tactful-lib.svg?label=npm%20downloads)](https://www.npmjs.com/package//ng-tactful-lib)
[![Twitter Follow](https://img.shields.io/twitter/follow/acharyaks90.svg?style=social&label=Follow%20me)](https://twitter.com/acharyaks90)

# NgTactfulLib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.
This library was updated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1



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
In html

'anil kumar' | secondLetterCapital

```
## Uses  example of order by pipe
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderByPipe } from 'ng-tactful-lib'

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    
  ],
  imports: [
    BrowserModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

 in html 

 *ngFor="let i of list | orderBy : 'key':'value'"

```
## Uses  example of VideoJs marking 
 For marking in video we are using VideoJS library and providing Plugin 
 Existing and Out dated pluging  https://github.com/spchuang/videojs-markers so credit to him.

 Converted plugin code to typescript and run in Angular Environment. 
 Now it can be used as component and use it as view child for access methods
 for dyanmic behavior in marking 


![Image description](https://raw.githubusercontent.com/acharyaks90/ng-tactful-library/master/src/assets/video_marking.png)

# Step -1  Include videojs stlyes  in angular projects main style.css 
```css
@import '~video.js/dist/video-js.css';

```
# Step - 2 Importing NgTactfulLibModule library in Angular project

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgTactfulLibModule } from 'ng-tactful-lib';

@NgModule({
  declarations: [
    AppComponent,
    ,
    
  ],
  imports: [
    BrowserModule
    NgTactfulLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Step - 3 In your component use ngtactful-video-tag Component providing download_url

```html
<ngtactful-video-tag  [download_url]="videoUrl"  ></ngtactful-video-tag>
```
# Step - 4 In your component class use ngtactful-video-tag Component as ViewChild

Proving marking array on function  onAddMarkersOnLoad(marks) also can be marked using onAddMarkers(marks)

Every time you need adding marking text as example in input box. first insert in your array then sort it 
then again call onAddMarkers(marks).
Sort function also provided for refrence 
for update either uptate your array and then call again onAddMarkers(marks).
Removing all - just empty your marks array and call onAddMarkers(marks).


```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgTactFulVideoTagComponent } from 'ng-tactful-lib';

@Component({
  selector: 'app-example-video-tag',
  templateUrl: './example-video-tag.component.html',
  styleUrls: ['./example-video-tag.component.scss']
})
export class ExampleVideoTagComponent implements OnInit {
  @ViewChild(NgTactFulVideoTagComponent)
  private videoplayer: NgTactFulVideoTagComponent;
  marker:string;
  marks = [{
    timing:'100',
    markingTexts:[{name:'test'},{name:'data'}] 
  },
  {
    timing:'300',
    markingTexts:[{name:'test'}] 
  },
  {
    timing:'500',
    markingTexts:[{name:'test'}] 
  }];
  constructor() { }

  videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.videoplayer.onAddMarkersOnLoad (this.marks)
  }

  addMarkers(){
    
  let  time = this.videoplayer.gettingTimeAndPausePlayer();

    let tagIndex = this.marks.findIndex(mark => {
      return parseInt(mark.timing) == time;
    });

    if (tagIndex !== -1) {

      this.marks[tagIndex].markingTexts.push({name:this.marker})
      
    } else {
      this.marks.push({timing:time.toString() ,markingTexts:[{name:this.marker}]})
    }

    this.sortMarkers();

    this.videoplayer.onAddMarkers(this.marks);
    this.marker = ''
  }


  

    /**
  * sortMarkers is a function.
  * @description : Sort the tags data according to time
  *
  */
 sortMarkers() {
  this.marks.sort((a, b) => {
    return parseInt(a.timing) - parseInt(b.timing);
  });
}

  

}


```
