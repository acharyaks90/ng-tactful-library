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
