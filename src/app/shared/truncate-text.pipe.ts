import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true,
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, limit: number = 10): string {
    if (!value) return '';

    const words = value.split(' ');
    if (words.length <= limit) return value;

    return words.slice(0, limit).join(' ') + '...';
  }
}