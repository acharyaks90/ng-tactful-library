import { Component, OnInit,ViewEncapsulation, Input } from '@angular/core';
import videojs from 'video.js';
import  {VideoJsMarkerPlugin}  from './video-js-marker-plugin';
import { DatePipe } from '@angular/common';
import { TaggingText } from './tags'

@Component({
  selector: 'ngtactful-video-tag',
  templateUrl: './ng-tactful-video-tag.component.html',
  styleUrls: ['./ng-tactful-video-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[DatePipe]
})
export class NgTactFulVideoTagComponent implements OnInit {

  @Input()  download_url:string ;
  player
  constructor(private datePipe: DatePipe) {
   if (videojs.getPlugin('markers') == undefined){
     videojs.registerPlugin('markers', VideoJsMarkerPlugin);
    }
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.player = videojs('ngtactfulplayer',{
      playbackRates: [ 1, 1.5, 2],
      autoplay: true
    });
    // Click play
    // --> NO ALERT
    // Click pause
    // Initialize plugin using the plugin function on the player instance
    this.player.markers({
      markerStyle: {
        'width':'16px',
        'height': '16px',
        'background-color': '#FFFFFF',
        'border-radius' : '100%',
        'border' : '4px solid #4FA399',
        'top': '-4px'
      },      
        markers: [ ]
  
    });
  }

/**
* onAddMarker is a function.
* @description : Adding Marker in playtime
* 
**/
  onAddMarker() : any{
    this.player.pause();
    let currentTime =  parseInt(this.player.currentTime());
    let markers = this.player.markers().getMarkers();
    if(markers.length>0){
      let mIndex = markers.findIndex(m=>{
        return m.time == currentTime;
      });
      if(mIndex==-1){
        this.player.markers().add( [{time: currentTime, html: `<p>${ this.datePipe.transform(currentTime*1000,'H:mm:ss','UTC')}</p>`}]);
      }
    }else{
      this.player.markers().add( [{time: currentTime,  html: `<p>${ this.datePipe.transform(currentTime*1000,'H:mm:ss','UTC')}</p>`}]);
    }
    
    return currentTime;

  }

  /**
* gettingTimeAndPausePlayer is a function.
* @description : pause and give time
* 
**/

  gettingTimeAndPausePlayer():number{
    this.player.pause();
    return parseInt(this.player.currentTime());
  }


/**
* onAddMarkers is a function.
* @description : Adding Marker in playtime
* 
**/
  onAddMarkers(addingMarkers) : any{
      this.player.markers().removeAll();
      if(addingMarkers && addingMarkers.length){
        addingMarkers.map(mark=>{
           // making function and dynamically adding tags with feature names
          this.player.markers().add( [{time: mark.timing, html: this.makeMarkerHtml(mark.taggingtexts) }]);
        })
      }
 
    }
    

    /**
* onAddMarkersOnLoad is a function.
* @description : Adding Marker in playtime after load data video
* 
**/
  onAddMarkersOnLoad(addingMarkers) : any{
    this.player.on('loadedmetadata',()=>{
      if(addingMarkers && addingMarkers.length){
        addingMarkers.map(mark=>{
           // making function and dynamically adding tags with feature names
          this.player.markers().add( [{time: mark.timing, html: this.makeMarkerHtml(mark.taggingtexts) }]);
        })
      }
    })
    }
   

  

  /**
* removeMarker is a function.
* @description : removing the marker
* @param {time} time in timeline
* @param {index} index of tag
* 
**/
  removeMarker(time,index?){
    if(index){
      let markers = this.player.markers().getMarkers();
      if(markers.length>0){
        let mIndex = markers.findIndex(m=>{
          return m.time == time;
        });
        if(mIndex!==-1){
          this.player.markers().remove([mIndex])
        }
    }
   }else{
    this.player.markers().remove([index]);
   }
   
   
  }

  /**
* playFrom is a function.
* @description : play from time
* @param {time} time in timeline
* 
**/

  playFrom(time){
    this.player.currentTime(parseInt(time));
    this.player.play();
  }

  
  /**
* makeMarkerHtml is a function.
* @description : make html
* @param {feature array} list of features
* @returns string html
**/

 makeMarkerHtml(taggingtexts:TaggingText[]):string{
  let str = '<ul>'

  taggingtexts.map(tag=>{
    str += `<li>${tag.name}</li>`
  })
  
  return str + '</ul>'
 }


  ngOnDestroy(){
    if (this.player) {
      this.player.dispose();
    }
  }

}
