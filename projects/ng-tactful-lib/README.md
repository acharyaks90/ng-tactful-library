[![npm](https://img.shields.io/npm/v//ng-tactful-lib.svg)](https://www.npmjs.com/package//ng-tactful-lib)
[![npm](https://img.shields.io/npm/dt//ng-tactful-lib.svg?label=npm%20downloads)](https://www.npmjs.com/package//ng-tactful-lib)
[![Twitter Follow](https://img.shields.io/twitter/follow/acharyaks90.svg?style=social&label=Follow%20me)](https://twitter.com/acharyaks90)

# NgTactfulLib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.


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

## Uses  example of VideoJs marking 

# Include videojs in style.css 
```css
@import '~video.js/dist/video-js.css';

```
 importing NgTactfulLibModule library

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

In your component 
```html
<ngtactful-video-tag  [download_url]="videoUrl"  ></ngtactful-video-tag>
```

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
