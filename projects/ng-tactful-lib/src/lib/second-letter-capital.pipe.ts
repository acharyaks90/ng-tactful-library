import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondLetterCapital'
})
export class SecondLetterCapitalPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value) {
      return value;
    }
    return value.replace(/\w\S*/g, str => str.charAt(0) + str.charAt(1).toUpperCase() + str.substr(2).toLowerCase());
  }


}
