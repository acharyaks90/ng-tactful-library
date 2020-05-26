import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeIn12Hour'
})
export class TimeIn12HourPipe implements PipeTransform {

  transform(value: any, ): string {

    var n1 =value.split(':');
    var hours = n1[0]
    var min = n1[1];
    if (hours < 12) {
        if(hours == '00'){
          hours = 12;
        }
        return hours + ':' + min + ' AM';
    } else {
        hours=hours - 12;
        if(hours == 0){
          hours = 12;
        }
        hours=(hours.length < 10) ? '0'+hours:hours;
        return hours+ ':' + min + ' PM';
    }
  }

}
