import { Component, OnInit, ViewChild } from '@angular/core';
//import { NgTactFulVideoTagComponent } from 'ng-tactful-lib/public-api';
import { NgTactFulVideoTagComponent } from 'ng-tactful-lib';

@Component({
  selector: 'app-example-video-tag',
  templateUrl: './example-video-tag.component.html',
  styleUrls: ['./example-video-tag.component.scss']
})
export class ExampleVideoTagComponent implements OnInit {
  @ViewChild(NgTactFulVideoTagComponent)
  private videoplayer: NgTactFulVideoTagComponent;
  marks = [{
    timing:'100',
    taggingtexts:[{name:'test'},{name:'data'}] 
  },
  {
    timing:'300',
    taggingtexts:[{name:'test'}] 
  },
  {
    timing:'500',
    taggingtexts:[{name:'test'}] 
  }];
  constructor() { }
  videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  ngOnInit(): void {

   // this.videoplayer.onAddMarkers(this.tags)
  }

  ngAfterViewInit(){
    this.videoplayer.onAddMarkersOnLoad (this.marks)
  }

}
