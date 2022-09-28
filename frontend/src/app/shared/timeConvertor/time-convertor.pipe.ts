import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvertor'
})
export class TimeConvertorPipe implements PipeTransform {

  transform(value: number): string {
    const hours: number = Math.floor(value/3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + 
    (((value % 3600) % 60)).toString().padStart(2, '0');
  }

}
