import {Pipe, PipeTransform} from '@angular/core';
import {Note} from './models/note';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: Note[], category: string = 'new'): unknown {
    if (category === 'all') {
      return value;
    }
    return value.filter((item) => item.status === category);
  }

}
