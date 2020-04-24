import videojs, { VideoJsPlayer } from 'video.js';

const Plugin = videojs.getPlugin('plugin');

// default setting
const defaultSetting: VideoJsMarkerPluginSettings = {
  markerStyle: {
    width: '7px',
    'border-radius': '30%',
    'background-color': 'red'
  },
  markerTip: {
    display: true,
    text(marker) {
      return 'Break : ' + marker.text;
    },
    time(marker) {
      return marker.time;
    },
    html(marker){
      return  marker.html;
    }
  },
  breakOverlay: {
    display: false,
    displayTime: 3,
    text(marker) {
      return 'Break overlay: ' + marker.overlayText;
    },
    style: {
      width: '100%',
      height: '20%',
      'background-color': 'rgba(0,0,0,0.7)',
      color: 'white',
      'font-size': '17px'
    }
  },
  onMarkerClick(marker) {},
  onMarkerReached(marker, index) {},
  markers: []
};

// create a non-colliding random number
function generateUUID(): string {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable-next-line:no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // tslint:disable-next-line:no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

function getElementBounding(
  element: HTMLElement
): {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
} {
  let elementBounding;
  const defaultBoundingRect = {
    top: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    right: 0
  };

  try {
    elementBounding = element.getBoundingClientRect();
  } catch (e) {
    elementBounding = defaultBoundingRect;
  }

  return elementBounding;
}

const NULL_INDEX = -1;

export class VideoJsMarkerPlugin extends Plugin {
  private setting: VideoJsMarkerPluginSettings;
  private markersMap: { [key: string]: VideoJsMarker } = {};
  private markersList: Array<VideoJsMarker> = [];
  private breakOverlay: HTMLElement = null;
  private markerTip: HTMLElement = null;
  private currentMarkerIndex = NULL_INDEX;
  private overlayIndex = NULL_INDEX;

  constructor(player: VideoJsPlayer, options?: VideoJsMarkerPluginSettings) {
    super(player);
    if (options) {
      this.setting = videojs.mergeOptions(defaultSetting, options);
    }
    this.player.on('loadedmetadata', () => {
      this.initialize();
    });
  }
  initialize(): void {
    if (this.setting.markerTip.display) {
      this.initializeMarkerTip();
    }

    // remove existing markers if already initialized
    this.removeAll();
    this.addMarkers(this.setting.markers);

    if (this.setting.breakOverlay.display) {
      this.initializeOverlay();
    }

    const startOfGameMarkers: VideoJsMarker[] = this.setting.markers.filter(marker => marker.text === 'start' && !marker.disabled);

    if (startOfGameMarkers.length) {
      this.player.currentTime(startOfGameMarkers[0].time);
    }

    this.onTimeUpdate();
    this.player.on('timeupdate', () => this.onTimeUpdate());
    this.player.off('loadedmetadata');
  }
  getMarkers(): Array<VideoJsMarker> {
    return this.markersList;
  }
  onTimeUpdate(): void {
    this.onUpdateMarker();
    this.updateBreakOverlay();
    if (this.setting.onTimeUpdateAfterMarkerUpdate) {
      this.setting.onTimeUpdateAfterMarkerUpdate();
    }
  }
  onUpdateMarker() {
    /*
      check marker reached in between markers
      the logic here is that it triggers a new marker reached event only if the player
      enters a new marker range (e.g. from marker 1 to marker 2).
        Thus, if player is on marker 1 and user clicked on marker 1 again, no new reached event is triggered)
    */
    if (!this.markersList.length) {
      return;
    }

    this.updateMarkers(true);

    const getNextMarkerTime: (index: number) => number = (index: number) => {
      if (index < this.markersList.length - 1) {
        return this.setting.markerTip.time(this.markersList[index + 1]);
      }
      // next marker time of last marker would be end of video time
      return this.player.duration();
    };
    const currentTime = this.player.currentTime();
    let newMarkerIndex = NULL_INDEX;

    if (this.currentMarkerIndex !== NULL_INDEX) {
      // check if staying at same marker
      const nextMarkerTime = getNextMarkerTime(this.currentMarkerIndex);
      if (
        currentTime >=
          this.setting.markerTip.time(
            this.markersList[this.currentMarkerIndex]
          ) &&
        currentTime < nextMarkerTime
      ) {
        return;
      }

      // check for ending (at the end current time equals player duration)
      if (
        this.currentMarkerIndex === this.markersList.length - 1 &&
        currentTime === this.player.duration()
      ) {
        return;
      }
    }

    // check first marker, no marker is selected
    if (currentTime < this.setting.markerTip.time(this.markersList[0])) {
      newMarkerIndex = NULL_INDEX;
    } else {
      // look for new index
      let nextMarkerTime;
      for (let i = 0; i < this.markersList.length; i++) {
        nextMarkerTime = getNextMarkerTime(i);
        if (
          currentTime >= this.setting.markerTip.time(this.markersList[i]) &&
          currentTime < nextMarkerTime
        ) {
          newMarkerIndex = i;
          break;
        }
      }
    }

    // set new marker index
    if (newMarkerIndex !== this.currentMarkerIndex) {
      // trigger event if index is not null
      if (newMarkerIndex !== NULL_INDEX && this.setting.onMarkerReached) {
        this.setting.onMarkerReached(
          this.markersList[newMarkerIndex],
          newMarkerIndex
        );
      }
      this.currentMarkerIndex = newMarkerIndex;
    }
  }
  initializeOverlay(): void {
    this.breakOverlay = videojs.dom.createEl('div', {
      className: 'vjs-break-overlay',
      innerHTML: `<div class='vjs-break-overlay-text'></div>`
    }) as HTMLElement;
    Object.keys(this.setting.breakOverlay.style).forEach(key => {
      if (this.breakOverlay) {
        (this.breakOverlay.style as any)[key] = (this.setting.breakOverlay
          .style as any)[key];
      }
    });
    this.player.el().appendChild(this.breakOverlay);
    this.overlayIndex = NULL_INDEX;
  }
  updateBreakOverlay(): void {
    if (!this.setting.breakOverlay.display || this.currentMarkerIndex < 0) {
      return;
    }

    const currentTime = this.player.currentTime();
    const marker = this.markersList[this.currentMarkerIndex];
    const markerTime = this.setting.markerTip.time(marker);

    if (
      currentTime >= markerTime &&
      currentTime <= markerTime + this.setting.breakOverlay.displayTime
    ) {
      if (this.overlayIndex !== this.currentMarkerIndex) {
        this.overlayIndex = this.currentMarkerIndex;
        if (this.breakOverlay) {
          this.breakOverlay.querySelector(
            '.vjs-break-overlay-text'
          ).innerHTML = this.setting.breakOverlay.text(marker);
        }
      }

      if (this.breakOverlay) {
        this.breakOverlay.style.visibility = 'visible';
      }
    } else {
      this.overlayIndex = NULL_INDEX;
      if (this.breakOverlay) {
        this.breakOverlay.style.visibility = 'hidden';
      }
    }
  }
  setMarkderDivStyle(marker: VideoJsMarker, markerDiv: HTMLElement): void {
    markerDiv.className = `vjs-marker ${marker.class || ''}`;

    Object.keys(this.setting.markerStyle).forEach(key => {
      (markerDiv.style as any)[key] = (this.setting.markerStyle as any)[key];
    });

    // hide out-of-bound markers
    const ratio = marker.time / this.player.duration();
    if (ratio < 0 || ratio > 1) {
      markerDiv.style.display = 'none';
    }

    // set position
    markerDiv.style.left = this.getPosition(marker) + '%';
    if (marker.duration) {
      markerDiv.style.width =
        (marker.duration / this.player.duration()) * 100 + '%';
      markerDiv.style.marginLeft = '0px';
    } else {
      const markerDivBounding = getElementBounding(markerDiv);
      markerDiv.style.marginLeft = -markerDivBounding.width / 2 + 'px';
    }
  }
  updateMarkers(force: boolean): void {
    // update UI for markers whose time changed
    this.markersList.forEach((marker: VideoJsMarker) => {
      const markerDiv = this.player
        .el()
        .querySelector(
          `.vjs-marker[data-marker-key='${marker.key}']`
        ) as HTMLElement;
      const markerTime = this.setting.markerTip.time(marker);

      if (
        force ||
        parseFloat(markerDiv.getAttribute('data-marker-time')) !== markerTime
      ) {
        this.setMarkderDivStyle(marker, markerDiv);
        markerDiv.setAttribute('data-marker-time', String(markerTime));
      }
    });
    this.sortMarkersList();
  }
  registerMarkerTipHandler(markerDiv: HTMLElement): void {
    markerDiv.addEventListener('mouseover', () => {
      const marker = this.markersMap[markerDiv.getAttribute('data-marker-key')];
      if (!!this.markerTip) {
        if (this.setting.markerTip.html) {
          this.markerTip.querySelector(
            '.vjs-tip-inner'
          ).innerHTML = this.setting.markerTip.html(marker);
        } else {
          (this.markerTip.querySelector(
            '.vjs-tip-inner'
          ) as HTMLElement).innerText = this.setting.markerTip.text(marker);
        }
        // margin-left needs to minus the padding length to align correctly with the marker
        this.markerTip.style.left = this.getPosition(marker) + '%';
        const markerTipBounding = getElementBounding(this.markerTip);
        const markerDivBounding = getElementBounding(markerDiv);
        this.markerTip.style.marginLeft =
          -(markerTipBounding.width / 2) + markerDivBounding.width / 4 + 'px';
        this.markerTip.style.visibility = 'visible';
      }
    });

    markerDiv.addEventListener('mouseout', () => {
      if (!!this.markerTip) {
        this.markerTip.style.visibility = 'hidden';
      }
    });
  }
  removeMarkers(indexArray: Array<number>): void {
    // reset overlay
    if (!!this.breakOverlay) {
      this.overlayIndex = NULL_INDEX;
      this.breakOverlay.style.visibility = 'hidden';
    }
    this.currentMarkerIndex = NULL_INDEX;

    const deleteIndexList: Array<number> = [];
    indexArray.forEach((index: number) => {
      const marker = this.markersList[index];
      if (marker) {
        // delete from memory
        delete this.markersMap[marker.key];
        deleteIndexList.push(index);

        // delete from dom
        const el = this.player
          .el()
          .querySelector(`.vjs-marker[data-marker-key='${marker.key}']`);
        if (el) {
          el.parentNode.removeChild(el);
        }
      }
    });

    // clean up markers array
    deleteIndexList.reverse();
    deleteIndexList.forEach((deleteIndex: number) => {
      this.markersList.splice(deleteIndex, 1);
    });

    // sort again
    this.sortMarkersList();
  }
  next(): void {
    // go to the next marker from current timestamp
    const currentTime = this.player.currentTime();
    for (const marker of this.markersList) {
      const markerTime = this.setting.markerTip.time(marker);
      if (markerTime > currentTime) {
        this.player.currentTime(markerTime);
        break;
      }
    }
  }
  prev(): void {
    // go to previous marker
    const currentTime = this.player.currentTime();
    for (let i = this.markersList.length - 1; i >= 0; i--) {
      const markerTime = this.setting.markerTip.time(this.markersList[i]);
      // add a threshold
      if (markerTime + 0.5 < currentTime) {
        this.player.currentTime(markerTime);
        return;
      }
    }
  }
  add(newMarkers: Array<VideoJsMarker>): void {
    // add new markers given an array of index
    this.addMarkers(newMarkers);
  }

  addMarkers(newMarkers: Array<VideoJsMarker>): void {
    newMarkers.forEach((marker: VideoJsMarker) => {
      marker.key = generateUUID();

      this.player
        .el()
        .querySelector('.vjs-progress-holder')
        .appendChild(this.createMarkerDiv(marker));

      // store marker in an internal hash map
      this.markersMap[marker.key] = marker;
      this.markersList.push(marker);
    });

    this.sortMarkersList();
  }

  sortMarkersList(): void {
    // sort the list by time in asc order
    this.markersList.sort((a, b) => {
      return this.setting.markerTip.time(a) - this.setting.markerTip.time(b);
    });
  }

  createMarkerDiv(marker: VideoJsMarker): HTMLElement {
    const markerDiv = videojs.dom.createEl(
      'div',
      {},
      {
        'data-marker-key': marker.key,
        'data-marker-time': this.setting.markerTip.time(marker)
      }
    ) as HTMLElement;

    this.setMarkderDivStyle(marker, markerDiv);

    // bind click event to seek to marker time
    markerDiv.addEventListener('click', (e: Event) => {
      let preventDefault = false;
      if (typeof this.setting.onMarkerClick === 'function') {
        // if return false, prevent default behavior
        preventDefault = this.setting.onMarkerClick(marker) === false;
      }

      if (!preventDefault) {
        const key = (e.target as HTMLElement).getAttribute('data-marker-key');
        this.player.currentTime(
          this.setting.markerTip.time(this.markersMap[key])
        );
      }
    });

    if (this.setting.markerTip.display) {
      this.registerMarkerTipHandler(markerDiv);
    }

    return markerDiv;
  }

  getPosition(marker: VideoJsMarker): number {
    const liveTracker = this.player["liveTracker"];
    const windowOrDuration = liveTracker.isLive()
      ? liveTracker.liveWindow()
      : this.player.duration();
    return (this.setting.markerTip.time(marker) / windowOrDuration) * 100;
  }
  remove(indexArray: Array<number>): void {
    // remove markers given an array of index
    this.removeMarkers(indexArray);
  }
  removeAll(): void {
    const indexArray = [];
    for (let i = 0; i < this.markersList.length; i++) {
      indexArray.push(i);
    }
    this.removeMarkers(indexArray);
  }
  // force - force all markers to be updated, regardless of if they have changed or not.
  updateTime(force: boolean): void {
    // notify the plugin to update the UI for changes in marker times
    this.updateMarkers(force);
  }
  reset(newMarkers: Array<VideoJsMarker>): void {
    // remove all the existing markers and add new ones
    this.removeAll();
    this.addMarkers(newMarkers);
  }
  destroy(): void {
    // unregister the plugins and clean up even handlers
    this.removeAll();
    if (this.breakOverlay) {
      this.breakOverlay.remove();
    }
    if (this.markerTip) {
      this.markerTip.remove();
    }
    this.player.off('timeupdate', this.updateBreakOverlay);
    delete this.player.markers;
  }
  initializeMarkerTip(): void {
    this.markerTip = videojs.dom.createEl('div', {
      className: 'vjs-tip',
      innerHTML: `<div class='vjs-tip-arrow'></div><div class='vjs-tip-inner'></div>`
    }) as HTMLElement;
    this.player
      .el()
      .querySelector('.vjs-progress-holder')
      .appendChild(this.markerTip);
  }
}

//videojs.registerPlugin('markers', VideoJsMarkerPlugin);

declare module 'video.js' {
  export interface VideoJsPlayer {
    markers: (options?: VideoJsMarkerPluginSettings) => VideoJsMarkerPlugin;
  }
  export interface VideoJsPlayerOptions {
    markers?: boolean;
  }
}

export interface VideoJsMarker {
  time: number;
  duration?: number;
  text?: string;
  class?: string;
  overlayText?: string;
  key?: string;
  id?: string;
  disabled?: boolean;
  html?:string;
}

export interface VideoJsMarkerPluginSettings {
  markerStyle?: object;
  markerTip?: {
    display?: boolean;
    html?(marker: VideoJsMarker): string;
    text?(marker: VideoJsMarker): string;
    time?(marker: VideoJsMarker): number;
  };
  breakOverlay?: {
    display: boolean;
    displayTime: number;
    style: object;
    text(marker: VideoJsMarker): string;
  };
  markers?: VideoJsMarker[];
  onMarkerClick?(marker: VideoJsMarker): boolean | void;
  onMarkerReached?(marker: VideoJsMarker, index: number): void;
  onTimeUpdateAfterMarkerUpdate?(): void;
}