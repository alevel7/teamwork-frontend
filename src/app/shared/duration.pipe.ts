import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(date: string): string {
      const today: Date = new Date();
      const inserted: Date = new Date(date + ' UTC');
      const sub = today.getTime() - inserted.getTime();
      const diff: Date = new Date(sub);
      if (!((diff.getUTCFullYear() - 1970) <= 0 )){
          return diff.getUTCFullYear() + ' years ago';
      } else if (!(diff.getUTCMonth() <= 0)) {
          return diff.getUTCMonth() + ' months ago';
      } else if (!((diff.getUTCDate() - 1) <= 0)) {
          return diff.getUTCDate() + ' days ago';
      } else if (!(diff.getUTCHours() <= 0)) {
          return diff.getUTCHours() + ' hours ago';
      } else if (!(diff.getUTCMinutes() <= 0)) {
          return diff.getUTCMinutes() + ' min ago';
      } else if (!(diff.getUTCSeconds() <= 0)) {
          return diff.getUTCSeconds() + ' seconds ago';
      } else {
          return 'just now';
      }
      }
}
