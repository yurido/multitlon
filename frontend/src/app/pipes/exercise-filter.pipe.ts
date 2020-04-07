import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'exerciseFilter'
})
export class ExerciseFilterPipe implements PipeTransform {
  transform(sid: string): any {
    return environment.EXERCISES.filter(value => value.sid === sid).map(value => value.name);
  }

}
