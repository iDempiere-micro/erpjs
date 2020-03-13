import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'width',
  pure: true
})
export class StringWidthPipe implements PipeTransform {
  transform(value: any, width: number): any {
    return value ? value.toString().padStart(width - value.length, '_') : value;
  }
}
