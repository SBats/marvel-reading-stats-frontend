import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mrsTimeSpentPipe'
})
export class TimeSpentPipe implements PipeTransform {
  timePerComic: number = 20; // in minutes
  transform(collectionLength: number) {
    return (collectionLength * this.timePerComic / 60).toFixed(2);
  }
}
